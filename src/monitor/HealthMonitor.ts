import { Observable } from "observable-fns";
import { DatastoreRepository } from "../db/repository";
import { defined, sleep } from "../utils";
import { AbstractMonitor } from "./AbstractMonitor";
import { Pair, Position, Token } from "./models";
import { amount, bn, toBN } from "../math";
import { Pair__factory } from "../types";
import { HeightMonitor } from "./HeightMonitor";

export class HealthMonitor extends AbstractMonitor<boolean> {
  private positions!: DatastoreRepository<Position>;
  private pairs!: DatastoreRepository<Pair>;
  private lastHeight = 0;

  async run(): Promise<Observable<boolean>> {
    this.positions = this.context.db.getRepository(Position);
    this.pairs = this.context.db.getRepository(Pair);

    (await this.context.getChannel(HeightMonitor)).subscribe((height) => {
      this.lastHeight = height;
    });

    this.checkPairs();
    this.checkPositions();
    return this.channel;
  }

  private async checkPairs() {
    // Temporarily disabled
    return;

    const height = this.lastHeight;
    await sleep(this.context.sleep);

    let pairs = await this.pairs.all();
    let positions = await this.positions.all();

    let pair_totals = await Promise.all(pairs.map((pair) => {
      let factory = Pair__factory.connect(pair.address, this.context.provider)
      return this.context.sender!.call(factory, "totalSupply");
    }));

    let broken_pairs = pairs.filter((pair, index) => {
      if (pair_totals[index].eq(0)) { return false }

      let found_positions = positions.filter((position) => pair.address === position.pair)
      let pos_sum = found_positions.map((p) => p.value).reduce((v1, v2) => v1.add(v2), bn(0))

      return !pos_sum.eq(toBN(pair_totals[index]));
    });

    console.log(`Broken pairs: ${broken_pairs.length}`)

    while (height === this.lastHeight) {
      await sleep(this.context.sleep);
    }

    await this.checkPairs();
  }

  private async checkPositions() {
    const height = this.lastHeight;
    await sleep(this.context.sleep);

    let positions = await this.positions.all();
    positions = positions.filter((p) => p.amount.gt(amount(0)));

    let expired_positions = positions.filter((p) => p.lastUpdatedAt! < Date.now() - 180_000) // Positions updated earlier than 3 minutes ago
    let not_updated_positions = positions.filter((p) => p.lastUpdatedAt === undefined) // Positions that were never updated

    console.log(`HealthMonitor: positions count: expired ${expired_positions.length}, never updated ${not_updated_positions.length}`)
    let formatted = await Promise.all(expired_positions.concat(not_updated_positions).map((p) => this.formatPosition(p)))
    formatted.forEach((pos) => console.log(`HealthMonitor: ${pos}`));

    while (height === this.lastHeight) {
      await sleep(this.context.sleep);
    }

    await this.checkPositions();
  }

  private async formatPosition(position: Position) {
    const lendableToken = await this.context.db
      .getRepository(Token)
      .get(position.lendable);
    const tradableToken = await this.context.db
      .getRepository(Token)
      .get(position.tradable);
    const proxyToken = position.proxy
      ? await this.context.db.getRepository(Token).get(position.proxy)
      : undefined;

    const path = [lendableToken, proxyToken, tradableToken]
      .map((t) => t?.symbol)
      .filter(defined)
      .join("/");

    return `${position.lastUpdatedAt === undefined ? 'never updated' : 'expired'} position ${path} ${position.trader}`;
  }
}
