import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { diff } from "deep-diff";
import { BigNumber, BytesLike, constants, Contract, Signer } from "ethers";
import { map, Observable, Subject, Subscription } from "observable-fns";
import BN from "bignumber.js";
import { bn, toBN } from "./math";
import {
  IERC20Detailed,
  IERC20Detailed__factory,
  Multicall,
  Multicall__factory,
  Pair,
  PairFactory,
  PairFactory__factory,
  Pair__factory,
  PancakeFactory,
  PancakeFactory__factory,
  PancakeRouter01,
  PancakeRouter01__factory,
  ReserveFactory,
  ReserveFactory__factory,
  Router,
  Router__factory,
} from "./types";
import { byteToAddress, mapAll, retry, sleep } from "./utils";

function isMineRoutine(params: ExecutionParams, taskId: number) {
  return taskId % params.dispatchSize === params.dispatchId;
}

export function infRetry<T>(fn: () => Promise<T>): Promise<T> {
  return retry(fn, { n: Infinity, minWait: 250, maxWait: 250 }).promise;
}

export function fewRetry<T>(fn: () => Promise<T>): Promise<T> {
  return retry(fn, { n: 3, minWait: 250, maxWait: 250 }).promise;
}

class TokenInfo {
  public contract: IERC20Detailed;
  public name?: string;
  public symbol?: string;
  public decimals?: number;

  constructor(protected params: ExecutionParams, public address: string) {
    this.contract = IERC20Detailed__factory.connect(
      this.address,
      this.params.provider
    );
    fewRetry(() => this.loadToken());
  }

  async loadToken() {
    [this.name, this.symbol, this.decimals] = await Promise.all([
      this.params.sender!.call(this.contract, "name"),
      this.params.sender!.call(this.contract, "symbol"),
      this.params.sender!.call(this.contract, "decimals"),
    ]);
  }
}

class PairWrapper {
  public contract!: Pair;
  public lastUpdate: number;
  public get address() {
    return this.contract ? this.contract.address : "";
  }

  constructor(
    protected params: ExecutionParams,
    public lendable: string,
    public tradable: string
  ) {
    this.lastUpdate = this.params.startBlock - 1;
  }

  async tryInitialize() {
    if (this.address.length > 0) {
      return true;
    }

    const pairAddress = await infRetry(() =>
      this.params
        .sender!.call(
          this.params.pairFactory,
          "getPair",
          this.lendable,
          this.tradable
        )
        .catch((e) => {
          console.log(
            `Error on getting pair ${this.lendable} ${this.tradable} \nissue: ${e}`
          );
          throw e;
        })
    );

    if (pairAddress === constants.AddressZero) {
      return false;
    }

    this.contract = new Pair__factory(this.params.signer).attach(pairAddress);
    return true;
  }
}

class Position {
  public updateStream?: Subscription<number>;

  private dirty: boolean = true;
  private state?: {
    lendable: string;
    tradable: string;
    trader: string;
    health: BN;
    amount: BN;
    value: BN;
    selfValue: BN;
    principalDebt: BN;
    currentDebt: BN;
    rate: BN;
  };

  public get needUpdate() {
    return this.dirty;
  }

  constructor(
    protected params: ExecutionParams,
    public pair: PairWrapper,
    public trader: string
  ) {}

  appear() {
    this.dirty = true;
  }

  async getPositionState() {
    if (!this.needUpdate) {
      return this.state!;
    }

    const [
      amount,
      value,
      selfValue,
      principalDebt,
      currentDebt,
      rate,
      currentCost,
      liquidationCost,
    ] = await infRetry(() =>
      this.params
        .sender!.call(this.pair.contract, "getPosition", this.trader)
        .catch((e) => {
          console.log(
            `Error on position state ${this.pair.lendable} ${this.pair.tradable} ${this.trader} \nissue: ${e}`
          );
          throw e;
        })
        .then((r) => r.map(toBN))
    );

    const health = currentCost.gt(liquidationCost)
      ? currentCost.sub(liquidationCost).div(currentCost)
      : bn(0);

    const { lendable, tradable } = this.pair;

    this.dirty = false;
    this.state = {
      lendable,
      tradable,
      trader: this.trader,
      health,
      amount,
      value,
      selfValue,
      principalDebt,
      currentDebt,
      rate,
    };

    return this.state;
  }
}

interface CallRequest {
  onResult: (response: string) => void;
  call: Call;
}
interface Call {
  target: string;
  callData: BytesLike;
}

type CallResult<
  TContract extends Contract,
  TMethod extends keyof TContract["functions"]
> = ReturnType<TContract["functions"][TMethod]> extends Promise<infer R>
  ? R extends Array<infer EL>
    ? EL
    : R
  : never;

class Multisender {
  private contract: Multicall;
  private latestBlock: number = 0;
  private queue: Array<CallRequest> = [];

  constructor(protected params: ExecutionParams, protected address: string) {
    this.contract = new Multicall__factory(params.signer).attach(this.address);

    this.params.channels.height!.subscribe((newHeight) => {
      if (this.latestBlock < newHeight) {
        this.latestBlock = newHeight;
        this.update();
      }
    });
  }

  async call<
    T extends Contract,
    TMethod extends keyof T["functions"],
    TResult extends CallResult<T, TMethod>
  >(
    contract: T,
    methodName: TMethod,
    ...args: Parameters<T["functions"][TMethod]>
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      this.queue.push({
        call: {
          target: contract.address,
          callData: contract.interface.encodeFunctionData(
            methodName as string,
            args
          ),
        },
        onResult: (result: string) => {
          try {
            const typedResult = contract.interface.decodeFunctionResult(
              methodName as string,
              result
            ) as TResult;

            resolve(
              Array.isArray(typedResult) && typedResult.length === 1
                ? typedResult[0]
                : typedResult
            );
          } catch (e) {
            reject(new Error("Failed decode: " + result));
          }
        },
      });
    });
  }

  async update() {
    while (this.queue.length) {
      const requests = this.queue.splice(0, 100);

      const result = await infRetry(() =>
        this.contract.callStatic.aggregate(requests.map((r) => r.call))
      );

      // TODO: Error

      requests.forEach((request, index) =>
        request.onResult(result.returnData[index])
      );

      this.latestBlock = result.blockNumber.toNumber();
    }
  }
}

type InitializeParams = {
  dispatchId: number;
  dispatchSize: number;
  provider: JsonRpcProvider;
  signer: Signer;
  multicall: string;
  router: Router;
  sleep: number;
  startBlock: number;
};

type ExecutionParams = InitializeParams & {
  sender?: Multisender;
  reserveFactory: ReserveFactory;
  pairFactory: PairFactory;
  swapRouter: PancakeRouter01;
  swapFactory: PancakeFactory;
  tokens: Record<string, TokenInfo>;
  channels: Partial<{
    height: Observable<number>;
    chainId: Observable<number>;
    lendables: Observable<string[]>;
    tradables: Observable<string[]>;
    pairs: Observable<PairWrapper>;
    positions: Observable<Position>;
  }>;
};

async function createHeightChannel(params: ExecutionParams) {
  let channel = new Subject<number>();

  let latest = 0;
  const updateHeight = (height: number) => {
    if (latest < height) {
      channel.next(height);
      latest = height;
    }
  };

  await infRetry(() => params.provider.getBlockNumber().then(updateHeight));
  params.provider.on("block", updateHeight);

  return channel;
}

async function createLendablesChannel(params: ExecutionParams) {
  let channel = new Subject<string[]>();
  let latest: string[] = [];

  params.channels
    .height!.pipe(
      map(
        async () =>
          await params
            .sender!.call(params.reserveFactory, "getAllLendables")
            .then(mapAll(byteToAddress))
      )
    )
    .subscribe((values) => {
      if (values && diff(latest, values)) {
        latest = values;
        channel.next(values);
      }
    });

  return channel;
}

async function createTradablesChannel(params: ExecutionParams) {
  let channel = new Subject<string[]>();
  let latest: string[] = [];

  params.channels
    .height!.pipe(
      map(async () =>
        infRetry(() =>
          params
            .sender!.call(params.pairFactory, "getAllTradables")
            .then(mapAll(byteToAddress))
        )
      )
    )
    .subscribe((values) => {
      if (diff(latest, values)) {
        latest = values;
        channel.next(values);
      }
    });

  return channel;
}

async function createPairChannel(params: ExecutionParams) {
  const knownLendables: string[] = [];
  const knownTradables: string[] = [];

  const unreadyPairs = new Subject<PairWrapper>();
  const pairs = new Subject<PairWrapper>();

  const onNewLendable = async (lendable: string) => {
    knownLendables.push(lendable);
    knownTradables.forEach((tradable) =>
      unreadyPairs.next(new PairWrapper(params, lendable, tradable))
    );
  };

  const onNewTradable = async (tradable: string) => {
    knownTradables.push(tradable);
    knownLendables.forEach((lendable) =>
      unreadyPairs.next(new PairWrapper(params, lendable, tradable))
    );
  };

  unreadyPairs.subscribe(async (wrapper) => {
    const findContractSubscription = params.channels.height!.subscribe(
      async () => {
        if (await infRetry(() => wrapper.tryInitialize())) {
          findContractSubscription.unsubscribe();

          const routineId = bn(
            wrapper.contract.address.substr(2).toLowerCase(),
            16
          )
            .mod(Number.MAX_SAFE_INTEGER)
            .decimalPlaces(0)
            .toNumber();

          console.log(routineId);

          if (isMineRoutine(params, routineId)) {
            console.log(
              `[${params.dispatchId}] Process pair ${wrapper.address}`
            );
            pairs.next(wrapper);
          } else {
            console.log(`[${params.dispatchId}] Skip pair ${wrapper.address}`);
          }
        }
      }
    );
  });

  params.channels.lendables!.subscribe((lendables) => {
    const updates = diff(knownLendables, lendables);
    updates &&
      updates.forEach((update) => {
        if (update.kind === "A") {
          const action = update.item;
          if (action.kind === "N") {
            onNewLendable((action.rhs as any) as string);
          }
        }
      });
  });

  params.channels.tradables!.subscribe((tradables) => {
    const updates = diff(knownTradables, tradables);
    updates &&
      updates.forEach((update) => {
        if (update.kind === "A") {
          const action = update.item;
          if (action.kind === "N") {
            onNewTradable((action.rhs as any) as string);
          }
        }
      });
  });

  return pairs;
}

async function createPositionsChannel(params: ExecutionParams) {
  const channel = new Subject<Position>();

  const map: Record<string, Record<string, Record<string, Position>>> = {};

  params.channels.pairs!.subscribe(async (pair) => {
    map[pair.lendable] = map[pair.lendable] || {};
    map[pair.lendable][pair.tradable] = map[pair.lendable][pair.tradable] || {};

    const positionMap = map[pair.lendable][pair.tradable];

    let fetchedFrom = pair.lastUpdate;
    const transfers = pair.contract.filters.Transfer(null, null, null);

    const end = await infRetry(() => params.provider.getBlockNumber());
    const BATCH_SIZE = 500;

    const onEvent = (ev: {
      args: { from: string; to: string; value: BigNumber };
    }) =>
      [ev.args.from, ev.args.to].forEach((address) => {
        if (
          address === pair.contract.address ||
          address === constants.AddressZero
        )
          return;

        positionMap[address] =
          positionMap[address] || new Position(params, pair, address);
        channel.next(positionMap[address]);
      });

    for (let from = fetchedFrom; from < end; from += BATCH_SIZE) {
      const transferEvents = await infRetry(() => {
        console.log(
          `Fetching events from ${pair.contract.address} from ${from} to ${
            from + BATCH_SIZE
          } [${end - from} left]`
        );
        return pair.contract
          .queryFilter(transfers, from, Math.min(end, from + BATCH_SIZE))
          .catch((e) => {
            console.error(
              `Failed query events from ${pair.contract.address} at ${from} [${
                end - from
              } left] \n ISSUE: ${e.reason}`
            );
            throw e;
          });
      });

      transferEvents.map(onEvent);
      pair.lastUpdate = Math.min(end, from + BATCH_SIZE);
    }

    pair.contract.on(
      transfers,
      (from, to, value) => (
        console.log(from, to, value), onEvent({ args: { from, to, value } })
      )
    );
  });

  return channel;
}

async function run(params: ExecutionParams) {
  params.channels.height = await createHeightChannel(params);
  params.sender = new Multisender(params, params.multicall);
  params.channels.lendables = await createLendablesChannel(params);
  params.channels.tradables = await createTradablesChannel(params);
  params.channels.pairs = await createPairChannel(params);
  params.channels.positions = await createPositionsChannel(params);

  params.channels.positions!.subscribe(async (position) => {
    position.appear();

    if (position.updateStream) position.updateStream.unsubscribe();

    position.updateStream = params.channels.height!.subscribe(() =>
      updatePosition()
    );

    const updatePosition = async () => {
      const state = await infRetry(() => position.getPositionState());
      if (state.value.gt(0)) {
        if (state.health.eq(0)) {
          console.log(`Trying to liquidate position ${state.value.toFixed()}`);
          try {
            await params.router.liquidatePosition(
              position.pair.lendable,
              position.pair.tradable,
              position.trader
            );
          } catch (e) {
            console.error(e);
          }
        } else {
          // console.log(
          //   `Position ${position.pair.lendable} ${position.pair.tradable} ${
          //     position.trader
          //   } ${state.value.toFixed()} and health is: ${state.health.toFixed()}`
          // );
        }
      } else {
        // console.log(
        //   `Empty position ${position.pair.lendable} ${position.pair.tradable} ${position.trader}`
        // );
        position.updateStream?.unsubscribe();
      }
    };

    updatePosition();
  });

  while (true) {
    await sleep(params.sleep);
  }
}

async function initialize(params: InitializeParams) {
  const pairFactory = PairFactory__factory.connect(
    await router.pairFactory(),
    params.provider
  ).connect(params.signer);

  const reserveFactory = ReserveFactory__factory.connect(
    await router.reserveFactory(),
    params.provider
  ).connect(params.signer);

  const swapFactory = PancakeFactory__factory.connect(
    await router.swapFactory(),
    params.provider
  ).connect(params.signer);

  const swapRouter = PancakeRouter01__factory.connect(
    await router.swapRouter(),
    params.provider
  ).connect(params.signer);

  await run({
    ...params,
    pairFactory,
    reserveFactory,
    swapFactory,
    swapRouter,
    tokens: {},
    channels: {},
  });
}

const [, , providerUrl, routerAddress, multicall, sleepMs] = process.argv;
const { PRIVATE_KEY, pm_id, instances } = process.env;

const dispatchSize = instances ? parseInt(instances) : 1;
const dispatchId = pm_id ? parseInt(pm_id) : 0;

console.log({
  providerUrl,
  routerAddress,
  sleepMs,
  PRIVATE_KEY,
  dispatchId,
  dispatchSize,
});

const provider = new JsonRpcProvider(providerUrl);
const signer = new Wallet(PRIVATE_KEY!, provider);

console.log({ signer: signer.address });
const router = new Router__factory()
  .attach(routerAddress)
  .connect(provider)
  .connect(signer);

initialize({
  provider,
  signer,
  router,
  multicall,
  sleep: parseInt(sleepMs || "1000"),
  startBlock: 6506800,
  dispatchId,
  dispatchSize,
});
