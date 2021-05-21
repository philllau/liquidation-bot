import { classToPlain } from "class-transformer";
import { ethers } from "ethers";
import { Observable } from "observable-fns";
import { DatastoreRepository } from "../db/repository";
import { defined } from "../utils";
import { AbstractMonitor } from "./AbstractMonitor";
import { HeightMonitor } from "./HeightMonitor";
import { Pair, Token } from "./models";
import { TokenMonitor } from "./TokenMonitor";

export class PairMonitor extends AbstractMonitor<Pair> {
  private repository!: DatastoreRepository<Pair>;
  private unfoundPairs: Array<{
    lendable: Token;
    tradable: Token;
    proxy?: Token;
  }> = [];
  private lendables: Token[] = [];
  private tradables: Token[] = [];
  private proxies: Token[] = [];
  private processing = false;

  async run(): Promise<Observable<Pair>> {
    this.repository = this.context.db.getRepository(Pair);
    

    (await this.context.getChannel(TokenMonitor)).subscribe(
      (token) => {
        if (token.lendable) this.onNewLendable(token);
        if (token.proxy) this.onNewProxy(token);
        this.onNewTradable(token);
      }
      // token.lendable ? this.onNewLendable(token) : this.onNewTradable(token)
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
      .forEach((lendable) => {
        this.proxies
          .filter(
            (proxy) =>
              proxy.address !== tradable.address &&
              proxy.address !== lendable.address
          )
          .forEach((proxy) =>
            this.unfoundPairs.push({ lendable, proxy, tradable })
          );
        this.unfoundPairs.push({ lendable, tradable });
      });

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

    this.proxies
      .filter((proxy) => proxy.address !== lendable.address)
      .forEach((proxy) =>
        this.tradables
          .filter(
            (tradable) =>
              tradable.address !== proxy.address &&
              tradable.address !== lendable.address
          )
          .forEach((tradable) =>
            this.unfoundPairs.push({ lendable, proxy, tradable })
          )
      );

    this.update();
  }

  onNewProxy(proxy: Token): void {
    if (this.proxies.some((known) => known.address === proxy.address)) {
      return console.error("Already known proxy?", classToPlain(proxy));
    }
    this.proxies.push(proxy);
    this.lendables
      .filter((lendable) => lendable.address !== proxy.address)
      .forEach((lendable) =>
        this.tradables
          .filter(
            (tradable) =>
              tradable.address !== proxy.address &&
              tradable.address !== lendable.address
          )
          .forEach((tradable) =>
            this.unfoundPairs.push({ lendable, proxy, tradable })
          )
      );

    this.update();
  }

  async update() {
    if (this.processing) {
      return;
    }
    this.processing = true;
    const unfoundPairs = this.unfoundPairs.splice(0, this.unfoundPairs.length);

    const possiblePairParams = await Promise.all(
      unfoundPairs.map(({ lendable, tradable, proxy }) =>
        (proxy
          ? this.context.sender.call(
              this.context.pairFactory,
              "getRoutablePair",
              lendable.address,
              proxy.address,
              tradable.address
            )
          : this.context.sender.call(
              this.context.pairFactory,
              "getPair",
              lendable.address,
              tradable.address
            )
        ).then((address) => ({ lendable, tradable, proxy, address }))
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
        .map(async ({ lendable, tradable, proxy, address }) => {
          let instance = await this.repository.get(address);

          const path = [lendable, tradable, proxy]
            .map((t) => t?.address)
            .filter(defined)
            .join("/");

          if (!instance || proxy?.address !== instance.proxy) {
            console.log(`Create new pair pair ${address} ${path}}`);
            instance = new Pair();
            instance.address = address;
            instance.lendable = lendable.address;
            instance.tradable = tradable.address;
            instance.proxy = proxy?.address;
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
