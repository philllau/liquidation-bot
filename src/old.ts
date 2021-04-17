import BigNumber from "bignumber.js";
import * as ethers from "ethers";
import limit from "p-limit";
import * as contracts from "./types";
import { ChainId, Fetcher, Token, TokenAmount, WETH, id } from "wowswap-sdk";
import "./math";
import { bn, WAD } from "./math";
import { byteToAddress, flatten, mapAll, sleep } from "./utils";
import wowswap from "./wowswap.json";

import { JsonRpcProvider} from "@ethersproject/providers"

import { Observable, Subject } from "observable-fns"

const channels : Partial<{
  height: Observable<number>,
  provider: Observable<JsonRpcProvider>,
  chainId: Observable<number>,
  lendables: Observable<string[]>
  tradables: Observable<string[]>
}> = {}

const ctx = {
  provider: new ethers.providers.JsonRpcProvider("http://localhost:8545"),
  router: "0x60750a8CeF3Bd3658d910c3b11a051B363fC6668",
  swapFactory: "0x9517b3A930A7F529C59cD5D842CbD7e5719916c5",
  swapPairCodeHash:
    "0x1b67f076571ef46f58318c4ed9611ecc3080909f200fc4a310918b6f0595f4dd",
  latestBlock: 0,
  chainId: 57 as ChainId,
  tokens: [] as Array<Token>,
};

const getSwapPair = (lendable: Token, tradable: Token) =>
  Fetcher.fetchPairData(lendable, tradable, ctx.provider);

const findToken = (address: string) => {
  if (WETH[ctx.chainId].address.toLowerCase() === address.toLowerCase()) {
    return WETH[ctx.chainId];
  }

  return ctx.tokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
};

const getRouter = () =>
  contracts.Router__factory.connect(ctx.router, ctx.provider);

const getReserveFactory = async (router?: contracts.Router) =>
  contracts.ReserveFactory__factory.connect(
    await (router || getRouter()).reserveFactory(),
    ctx.provider
  );

const getSwapRouter = async (router?: contracts.Router) =>
  contracts.PancakeRouter01__factory.connect(
    await (router || getRouter()).swapRouter(),
    ctx.provider
  );

const getPairFactory = async (router?: contracts.Router) =>
  contracts.PairFactory__factory.connect(
    await (router || getRouter()).pairFactory(),
    ctx.provider
  );
const getLendales = async (reserveFactory?: contracts.ReserveFactory) =>
  (reserveFactory || (await getReserveFactory()))
    .getAllLendables()
    .then(mapAll(byteToAddress))
    .then(mapAll(findToken))
    .then((tokens) => tokens.filter((token) => !!token) as Token[]);

const getTradables = async (pairFactory?: contracts.PairFactory) =>
  (pairFactory || (await getPairFactory()))
    .getAllTradables()
    .then(mapAll(byteToAddress))
    .then(mapAll(findToken))
    .then((tokens) => tokens.filter((token) => !!token) as Token[]);

const getPair = async (
  lendable: string,
  tradable: string,
  pairFactory?: contracts.PairFactory
) =>
  contracts.Pair__factory.connect(
    await (pairFactory || (await getPairFactory())).getPair(lendable, tradable),
    ctx.provider
  );

function printAllFields<TObject extends {}>(
  object: TObject
): Record<keyof TObject, string> {
  return Object.keys(object).reduce(
    (dict, key) => (((dict as any)[key] = print((object as any)[key])), dict),
    {} as Record<keyof TObject, string>
  );
}

function print(possibleNumber: any): string {
  return possibleNumber instanceof BigNumber
    ? possibleNumber.toFixed()
    : possibleNumber.toString();
}

async function loop() {
  const current = await ctx.provider.getBlockNumber();

  if (current !== ctx.latestBlock) {
    const router = getRouter();
    const swapRouter = await getSwapRouter(router);
    swapRouter;
    const pairFactory = await getPairFactory(router);
    const lendables = await getLendales();
    const tradables = await getTradables(pairFactory);

    const pairs = flatten(
      tradables.map((tradable) =>
        lendables.map((lendable) => ({
          tradable,
          lendable,
        }))
      )
    );

    const pool = limit(10);

    const swaps = await Promise.all(
      pairs.map(({ lendable, tradable }) =>
        pool(() =>
          getPair(lendable.address, tradable.address, pairFactory).then(
            (pair) => ({
              pair,
              lendable,
              tradable,
            })
          )
        )
      )
    );

    const uniswaps = await Promise.all(
      swaps.map(({ lendable, tradable }) =>
        pool(async () => ({
          lendable,
          tradable,
          pair: await getSwapPair(lendable, tradable),
        }))
      )
    );

    console.log(
      uniswaps.map(
        ({ lendable, tradable, pair }) =>
          `1 ${tradable.symbol} is ${pair
            .getOutputAmount(new TokenAmount(tradable, bn(1).mul(WAD).str()))[0]
            .toSignificant(6)} ${lendable.symbol}`
      )
    );

    console.log(
      uniswaps.map(
        ({ lendable, tradable, pair }) =>
          `1 ${lendable.symbol} is ${pair
            .getOutputAmount(new TokenAmount(lendable, bn(1).mul(WAD).str()))[0]
            .toSignificant(6)} ${tradable.symbol}`
      )
    );

    const positions = flatten(
      await Promise.all(
        swaps.map(({ pair, lendable, tradable }) =>
          pool(() =>
            pair
              .queryFilter(
                pair.filters.ChangedPosition(null, null, null, null, null),
                ctx.latestBlock,
                current
              )
              .then((events) =>
                events.map((event) => {
                  const amount = bn(event.args.amount.toString());
                  const loan = bn(event.args.loan.toString());
                  const curCost = bn(event.args.cost.toString());
                  const liqCost = bn(
                    event.args.liquidationCost.toString()
                  );
                  const health = curCost.gt(liqCost)
                    ? curCost.sub(liqCost).div(curCost).mul(100)
                    : bn(0);
                  return {
                    pair: pair.address,
                    lendable,
                    tradable,
                    trader: event.args.trader,
                    amount,
                    loan,
                    cost: curCost,
                    liquidationCost: liqCost,
                    health,
                  };
                })
              )
          )
        )
      )
    );

    console.log(positions.map(printAllFields));

    ctx.latestBlock = current;
  }

  await sleep(2500);
  loop();
}

async function run() {
  // initial setup
  id.setId(ctx.chainId);

  ctx.tokens = wowswap.tokens
    .filter((definition) => definition.chainId === ctx.chainId)
    .map(
      (definition) =>
        new Token(
          ctx.chainId,
          definition.address,
          definition.decimals,
          definition.symbol,
          definition.name
        )
    );

  loop();
}
run();
