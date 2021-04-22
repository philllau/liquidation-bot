import { BigNumber, ethers, Signer } from "ethers";
import { Observable } from "observable-fns";
import { DatastoreRepository } from "../db/repository";
import { amount, bn, oneEther, oneRay, toBN } from "../math";
import { Pair as PairContract, Pair__factory } from "../types";
import { infRetry, sleep } from "../utils";
import { AbstractMonitor } from "./AbstractMonitor";
import { HeightMonitor } from "./HeightMonitor";
import { Pair, Position, Token } from "./models";

const BATCH_SIZE = 500;

export class PositionMonitor extends AbstractMonitor<Position> {
  private repository!: DatastoreRepository<Position>;
  private pairRepository!: DatastoreRepository<Pair>;

  private connections: Record<string, Signer> = {};
  private lastHeight = 0;

  async run(): Promise<Observable<Position>> {
    this.repository = this.context.db.getRepository(Position);
    this.pairRepository = this.context.db.getRepository(Pair);

    (await this.context.getChannel(HeightMonitor)).subscribe((height) => {
      this.lastHeight = height;
      this.liquidateUnhealty();
    });

    this.onChainUpdate();
    return this.channel;
  }
  private async liquidateUnhealty() {
    let unhealty = await this.repository.find("health", { $eq: amount(0) });
    unhealty = unhealty.filter((p) => p.amount.gt(amount(0)));

    unhealty = await Promise.all(unhealty.map((p) => this.updatePosition(p)));

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

          console.log(
            `Liquidate position: ${lendableToken?.symbol}/${
              tradableToken?.symbol
            } ${p.trader} - ${p.amount
              .decimalPlaces(tradableToken?.decimals!)
              .dividedBy(bn(10).pow(tradableToken!.decimals))} ${
              tradableToken?.symbol
            }`
          );
          return this.context.router
            .liquidatePosition(p.lendable, p.tradable, p.trader)
            .then((tx) => tx.wait(3));
        })
    );
  }

  private onTransfer(
    height: number,
    pair: Pair,
    transfer: {
      args: { from: string; to: string; value: BigNumber };
    }
  ) {
    return Promise.all(
      [transfer.args.from, transfer.args.to].map(async (address) => {
        if (
          address === pair.address ||
          address === ethers.constants.AddressZero
        )
          return;

        let position = await this.repository.get(
          Position.toId(pair.address, address)
        );
        if (!position) {
          position = new Position();

          position.lendable = pair.lendable;
          position.tradable = pair.tradable;
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

          const lendableToken = await this.context.db
            .getRepository(Token)
            .get(pair.lendable);
          const tradableToken = await this.context.db
            .getRepository(Token)
            .get(pair.tradable);

          console.log(
            `New position in ${lendableToken?.symbol}/${tradableToken?.symbol} for ${address} (at block ${height})`
          );
        }

        position.appearAt = height;
        this.repository.put(position);
      })
    );
  }

  private async onChainUpdate() {
    const height = this.lastHeight;
    console.log("update at height", height);

    const positionToUpdate = await this.repository.find("updateAt", {
      $lt: height,
    });
    await Promise.all(
      positionToUpdate.map((position) => this.updatePosition(position))
    );

    const pairs = await this.pairRepository.find("updateAt", { $lt: height });

    await Promise.all(
      pairs.map(async (pair) => {
        // for (let pair of pairs) {
        if (!this.connections[pair.address]) {
          this.connections[pair.address] = this.context.getNewConnection();
        }

        const from = pair.updateAt;
        const to = Math.min(height, from + BATCH_SIZE);
        const contract = this.pairContract(
          pair.address,
          this.connections[pair.address]
        );
        const transfers = contract.filters.Transfer(null, null, null);

        const lendableToken = await this.context.db
          .getRepository(Token)
          .get(pair.lendable);
        const tradableToken = await this.context.db
          .getRepository(Token)
          .get(pair.tradable);
        try {
          const transferEvents = await contract.queryFilter(
            transfers,
            from,
            to
          );

          transferEvents.forEach((ev) =>
            this.onTransfer(ev.blockNumber, pair, ev)
          );

          pair.updateAt = to;
          await this.pairRepository.put(pair);
          console.log(
            `Fetched pair ${lendableToken?.symbol}/${tradableToken?.symbol} from ${from} to ${to}`
          );
        } catch (e) {
          console.log(
            `Failed pair ${lendableToken?.symbol}/${tradableToken?.symbol} from ${from} to ${to} (${e.body})`
          );
        }
      })
    );
    if (pairs.length === 0) await sleep(this.context.sleep);
    this.onChainUpdate();
  }

  async updatePosition(position: Position) {
    if (position.amount.eq(bn(0)) && position.appearAt < position.updateAt) {
      // Already fresh and empty position
      return position;
    }

    const contract = this.pairContract(position.pair, this.context.signer);

    const lendableToken = await this.context.db
      .getRepository(Token)
      .get(position.lendable);
    const tradableToken = await this.context.db
      .getRepository(Token)
      .get(position.tradable);

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
        .sender!.callWithBlock(contract, "getPosition", position.trader)
        .catch((e) => {
          console.log(
            `Error on position state ${lendableToken?.symbol}/${tradableToken?.symbol} ${position.trader} \nissue: ${e}`
          );
          throw e;
        })
        .then(({ result, blockHeight }) => {
          return [...result.map(toBN), blockHeight.toNumber()];
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
    position.updateAt = updateAt;

    console.log(
      `Update position:  ${lendableToken?.symbol}/${tradableToken?.symbol} ${
        position.trader
      } (heath: ${position.health
        .decimalPlaces(27)
        .dividedBy(oneRay)}, value: ${position.value
        .decimalPlaces(18)
        .dividedBy(oneEther)})\n`
    );

    await this.repository.put(position);

    return position;
  }

  private pairContract(address: string, signer: Signer): PairContract {
    // TODO: Should it be cached?
    return new Pair__factory(signer).attach(address);
  }
}
