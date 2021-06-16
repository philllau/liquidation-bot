import { ethers } from "ethers";
import { Observable } from "observable-fns";
import { DatastoreRepository } from "../db/repository";
import { amount, bn, oneEther, oneRay, toBN } from "../math";
import { Pair__factory } from "../types";
import { defined, infRetry, sleep } from "../utils";
import { AbstractMonitor } from "./AbstractMonitor";
import { HeightMonitor } from "./HeightMonitor";
import { Pair, Position, Token } from "./models";

// const BATCH_SIZE = 500;

export class PositionMonitor extends AbstractMonitor<Position> {
  private repository!: DatastoreRepository<Position>;
  private pairRepository!: DatastoreRepository<Pair>;

  // private connections: Record<string, Signer> = {};
  private lastHeight = 0;

  async run(): Promise<Observable<Position>> {
    this.repository = this.context.db.getRepository(Position);
    this.pairRepository = this.context.db.getRepository(Pair);

    (await this.context.getChannel(HeightMonitor)).subscribe((height) => {
      this.lastHeight = height;
    });

    this.updateHolders(this.lastHeight);
    this.updatePositions();
    return this.channel;
  }

  async liquidateUnhealty() {
    let unhealty = await this.repository.find("health", { $eq: amount(0) });
    unhealty = unhealty.filter((p) => p.amount.gt(amount(0)));

    unhealty = await Promise.all(unhealty.map((p) => this.updatePosition(p)));

    let nonce = await this.context.provider.getTransactionCount(
      this.context.signer.address
    );

    await Promise.all(
      unhealty
        .filter((p) => p.amount.gt(amount(0)))
        .map(async (p) => {
          const lendableToken = await this.context.db
            .getRepository(Token)
            .get(p.lendable);
          const tradableToken = await this.context.db
            .getRepository(Token)
            .get(p.tradable);
          const proxyToken = p.proxy
            ? await this.context.db.getRepository(Token).get(p.proxy)
            : undefined;

          const path = [lendableToken, proxyToken, tradableToken]
            .map((t) => t?.symbol)
            .filter(defined)
            .join("/");

          let amount = p.amount
            .decimalPlaces(tradableToken?.decimals!)
            .dividedBy(bn(10).pow(tradableToken!.decimals));

          console.log(
            `Liquidate position: ${path} ${p.trader} - ${amount.toString()} ${
              tradableToken?.symbol
            }`
          );

          return new Pair__factory(this.context.signer)
            .attach(p.pair)
            .liquidatePosition(p.trader, this.context.signer.address, {
              nonce: nonce++,
            })
            .then((tx) => tx.wait())
            .catch((e) => {
              console.error(`Failed liquidate position of ${path} ${p.trader}`);
              // console.error(e);
            });
        })
    );
  }

  private async updatePositions() {
    const height = this.lastHeight;
    console.log("update positions at height", height);

    const positionToUpdate = await this.repository.find("updateAt", {
      $lt: height,
    });
    await Promise.all(
      positionToUpdate.map((position) => this.updatePosition(position))
    ).catch(() => console.error(`Failed update position run`));

    await this.liquidateUnhealty().catch(() =>
      console.error(`Failed liquidation run`)
    );

    while (height === this.lastHeight) {
      await sleep(this.context.sleep);
    }

    this.updatePositions();
  }

  private async updateHolders(height: number) {
    console.log("update holders at height", height);

    const pairs = await this.pairRepository.find("updateAt", { $lt: height });
    for (let pair of pairs) {
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

      const from = Math.max(pair.updateAt, this.context.startBlock);
      const to = Math.min(height, from + 3000);
      console.log(`Getting holders of ${path} (${from} to ${to})`);

      const contract = new Pair__factory(this.context.signer).attach(
        pair.address
      );
      const transfers = contract.filters.Transfer(null, null, null);

      try {
        const transferEvents = await contract.queryFilter(transfers, from, to);

        const holders = transferEvents.reduce((map, ev) => {
          [ev.args.to, ev.args.from]
            .filter(
              (address) =>
                address !== pair.address &&
                address !== ethers.constants.AddressZero
            )
            .forEach((address) => map.push({ address }));

          return map;
        }, [] as Array<{ address: string }>);

        pair.updateAt = to;
        await this.pairRepository.put(pair);

        const known = await this.repository.find("pair", pair.address);
        const unknown = holders.filter(
          (h) => !known.some((k) => k.trader === h.address)
        );

        await Promise.all(
          unknown.map(({ address }) => {
            const position = new Position();
            position.lendable = pair.lendable;
            position.tradable = pair.tradable;
            position.proxy = pair.proxy;
            position.pair = pair.address;
            position.trader = address;
            position.amount = bn(0);
            position.value = bn(0);
            position.selfValue = bn(0);
            position.principalDebt = bn(0);
            position.currentDebt = bn(0);
            position.rate = bn(0);
            position.currentCost = bn(0);
            position.liquidationCost = bn(0);
            position.updateAt = 0;
            position.appearAt = height;

            return this.repository.put(position);
          })
        );
      } catch (e) {
        console.error(e);
      }
    }

    while (height === this.lastHeight) {
      await sleep(this.context.sleep);
    }

    this.updateHolders(this.lastHeight);
  }

  async updatePosition(position: Position) {
    if (position.amount.eq(bn(0)) && position.appearAt < position.updateAt) {
      // Already fresh and empty position
      return position;
    }

    const contract = this.context.router;

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

    const inputs = [position.trader, position.lendable];

    if (position.proxy) {
      inputs.push(position.proxy);
    }

    inputs.push(position.tradable);

    const method = position.proxy ? "getProxyPosition" : "getPosition";

    const [
      amount,
      value,
      selfValue,
      principalDebt,
      currentDebt,
      rate,
      currentCost,
      liquidationCost,
      updateAt,
    ] = await infRetry(() =>
      this.context
        .sender!.callWithBlock(contract, method, ...(inputs as any))
        .then(({ result, blockHeight }) => {
          return [...result.map(toBN), toBN(blockHeight)];
        })
        .catch((e) => {
          console.log(
            `Error on position state ${path} ${position.trader} \nissue: ${e}`
          );
          throw e;
        })
    );

    position.amount = amount;
    position.value = value;
    position.selfValue = selfValue;
    position.principalDebt = principalDebt;
    position.currentDebt = currentDebt;
    position.rate = rate;
    position.currentCost = currentCost;
    position.liquidationCost = liquidationCost;
    position.updateAt = updateAt.toNumber();

    console.log(
      `Update position:  ${path} ${position.trader} (heath: ${position.health
        .decimalPlaces(27)
        .dividedBy(oneRay)}, value: ${position.value
        .decimalPlaces(18)
        .dividedBy(oneEther)})`
    );

    await this.repository.put(position).catch((e) => {
      console.error(position);
      throw e;
    });

    return position;
  }
}
