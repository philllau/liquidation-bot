import { classToPlain } from "class-transformer";
import { ethers } from "ethers";
import { Observable } from "observable-fns";
import { DatastoreRepository } from "../db/repository";
import { AbstractMonitor } from "./AbstractMonitor";
import { HeightMonitor } from "./HeightMonitor";
import { Pair, Token } from "./models";
import { TokenMonitor } from "./TokenMonitor";

export class PairMonitor extends AbstractMonitor<Pair> {
  private repository!: DatastoreRepository<Pair>;
  private unfoundPairs: Array<{ lendable: Token; tradable: Token }> = [];
  private lendables: Token[] = [];
  private tradables: Token[] = [];
  private processing = false;

  async run(): Promise<Observable<Pair>> {
    this.repository = this.context.db.getRepository(Pair);

    (await this.context.getChannel(TokenMonitor)).subscribe((token) =>
      token.lendable ? this.onNewLendable(token) : this.onNewTradable(token)
    );

    (await this.context.getChannel(HeightMonitor)).subscribe(
      this.update.bind(this)
    );

    return this.channel;
  }

  async onNewTradable(tradable: Token) {
    if (this.tradables.some((known) => known.address === tradable.address)) {
      return console.error("Already known tradable?", classToPlain(tradable));
    }
    this.tradables.push(tradable);
    this.lendables
      .filter((lendable) => tradable.address !== lendable.address)
      .forEach((lendable) => this.unfoundPairs.push({ lendable, tradable }));

    this.update();
  }

  onNewLendable(lendable: Token): void {
    if (this.lendables.some((known) => known.address === lendable.address)) {
      return console.error("Already known lendable?", classToPlain(lendable));
    }
    this.lendables.push(lendable);
    this.tradables
      .filter((tradable) => tradable.address !== lendable.address)
      .forEach((tradable) => this.unfoundPairs.push({ lendable, tradable }));

    this.update();
  }

  async update() {
    if (this.processing) {
      return;
    }
    this.processing = true;
    const unfoundPairs = this.unfoundPairs.splice(0, this.unfoundPairs.length);

    const possiblePairParams = await Promise.all(
      unfoundPairs.map(({ lendable, tradable }) =>
        this.context.sender
          .call(
            this.context.pairFactory,
            "getPair",
            lendable.address,
            tradable.address
          )
          .then((address) => ({ lendable, tradable, address }))
      )
    );

    this.unfoundPairs.push(
      ...possiblePairParams
        .map((params, index) => ({ params, index }))
        .filter(({ params }) => params.address === ethers.constants.AddressZero)
        .map(({ index }) => unfoundPairs[index])
    );

    const pairs = await Promise.all(
      possiblePairParams
        .filter(({ address }) => address !== ethers.constants.AddressZero)
        .map(async ({ lendable, tradable, address }) => {
          let instance = await this.repository.get(address);

          if (!instance) {
            console.log(
              `Create new pair pair ${address} ${tradable.symbol}/${lendable.symbol}`
            );
            instance = new Pair();
            instance.address = address;
            instance.lendable = lendable.address;
            instance.tradable = tradable.address;
            instance.updateAt = this.context.startBlock;

            await this.repository.put(instance);
          }
          return instance;
        })
    );

    pairs.forEach(this.channel.next.bind(this.channel));

    this.processing = false;
  }
}
