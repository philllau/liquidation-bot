import BigNumber from "bignumber.js";
import { Signer } from "ethers";
import { Observable } from "observable-fns";
import { Pair as PairContract, Pair__factory } from "../types";
import { defined } from "../utils";
import { AbstractMonitor } from "./AbstractMonitor";
import { HeightMonitor } from "./HeightMonitor";
import { Pair, Token } from "./models";
import { PairMonitor } from "./PairMonitor";
import { TokenMonitor } from "./TokenMonitor";

export enum LockType {
  Staked,
  Reserve,
  Position,
}

export interface LockedValue {
  tokenAddress: string;
  price: BigNumber;
  amount: BigNumber;
  value: BigNumber;
  lockType: LockType;
}

export interface TotalValue {
  totalLocked: BigNumber;
  values: Array<LockedValue>;
}
export class TotalValueMonitor extends AbstractMonitor<TotalValue> {
  private lendables: Token[] = [];
  private pairs: Pair[] = [];

  async run(): Promise<Observable<TotalValue>> {
    this.context.getChannel(TokenMonitor).then((channel) =>
      channel.subscribe((token) => {
        if (this.lendables.some((t) => t.address === token.address)) return;
        this.lendables.push(token);
      })
    );

    this.context.getChannel(PairMonitor).then((channel) =>
      channel.subscribe((pair) => {
        if (this.pairs.some((p) => p.address === pair.address)) return;
        this.pairs.push(pair);
      })
    );

    this.context
      .getChannel(HeightMonitor)
      .then((channel) => channel.subscribe(this.update.bind(this)));
    return this.channel;
  }

  async update(height: number) {
    return 
    const pairsWithSupply = await Promise.all(
      this.pairs.map(async (p) => ({
        ...p,
        supply: await this.context.sender.call(
          this.pairContract(p.address, this.context.signer),
          "totalSupply"
        ),
      }))
    );

    
    await Promise.all(
      pairsWithSupply.map(async (pair) => {

      const lendableToken = await this.context.db
      .getRepository(Token)
      .get(pair.lendable);
    const tradableToken = await this.context.db
      .getRepository(Token)
      .get(pair.tradable);
    const proxyToken = pair.proxy
      ? await this.context.db.getRepository(Token).get(pair.proxy)
      : undefined;

      const path = [lendableToken, proxyToken, tradableToken]
        .map((t) => t?.symbol)
        .filter(defined)
        .join("/");
        
        console.log(`Supply of ${path}: ${pair.supply} ${tradableToken?.symbol}`)
      }
    ))
    // console.log("update value monitor at", height)
  }

  private pairContract(address: string, signer: Signer): PairContract {
    return new Pair__factory(signer).attach(address);
  }
}
