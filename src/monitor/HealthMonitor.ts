import { Observable } from 'observable-fns'
import { DatastoreRepository } from '../db/repository'
import { defined, sleep } from '../utils'
import { AbstractMonitor } from './AbstractMonitor'
import { Pair, Position, Token } from './models'
import { amount, bn, toBN } from '../math'
import { HeightMonitor } from './HeightMonitor'
import { protocol } from '@wowswap/evm-sdk'
import { addBreadcrumb } from '../sentry';

export class HealthMonitor extends AbstractMonitor<boolean> {
  private positions!: DatastoreRepository<Position>
  private pairs!: DatastoreRepository<Pair>
  private tokens!: DatastoreRepository<Token>
  private lastHeight = 0

  async run(): Promise<Observable<boolean>> {
    this.positions = this.context.db.getRepository(Position)
    this.pairs = this.context.db.getRepository(Pair)
    this.tokens = this.context.db.getRepository(Token)
    ;(await this.context.getChannel(HeightMonitor)).subscribe((height) => {
      this.lastHeight = height
    })

    this.checkPairs()
    this.checkPositions()
    return this.channel
  }

  private async checkPairs() {
    // Temporarily disabled
    // return;

    const height = this.lastHeight
    await sleep(this.context.sleep)

    let pairs = await this.pairs.all()
    let positions = await this.positions.all()
    // {
    //   const lendableToken = await this.context.db
    //     .getRepository(Token)
    //     .get(p.lendable);
    //   const tradableToken = await this.context.db
    //     .getRepository(Token)
    //     .get(p.tradable);
    //   const proxyToken = p.proxy
    //     ? await this.context.db.getRepository(Token).get(p.proxy)
    //     : undefined;

    //   const path = [lendableToken, proxyToken, tradableToken]
    //     .map((t) => t?.symbol)
    //     .filter(defined)
    //     .join("/");

    const pairsWithTokens = await Promise.all(
      pairs.map(async (pair) => ({
        ...pair,
        lendable: await this.tokens.get(pair.lendable),
        tradable: await this.tokens.get(pair.tradable),
        proxy: pair.proxy ? await this.tokens.get(pair.proxy) : undefined,
      })),
    )

    const pairsWithPaths = await Promise.all(
      pairsWithTokens.map((pair) => ({
        ...pair,
        path: [pair.lendable?.symbol, pair.proxy?.symbol, pair.tradable?.symbol]
          .filter(defined)
          .join('/'),
      })),
    )

    let pairsWithTotals = await Promise.all(
      pairsWithPaths.map(async (pair) => ({
        ...pair,
        total: await this.context.ctx.core.useCall(
          this.context.ctx.core.useContract(protocol.Pair__factory, pair.address),
          'totalSupply'
        ).then(toBN),
      })),
    )

    let pairsWithPositions = await Promise.all(
      pairsWithTotals.map(async (pair) => ({
        ...pair,
        positions: positions.filter((p) => p.pair === pair.address),
      })),
    )

    const pairWithPositionsTotal = await Promise.all(
      pairsWithPositions.map(async (pair) => ({
        ...pair,
        positionTotal: pair.positions.reduce(
          (total, position) => total.add(position.amount),
          bn(0),
        ),
      })),
    )

    pairWithPositionsTotal.forEach((pair) =>
      addBreadcrumb(
        'pair',
        pair.address,
        `${pair.short ? 'SHORT' : 'LONG'} ${pair.path} totalSupply: ${pair.total.human(
          pair.lendable?.decimals,
        )} totalPositions: ${pair.positionTotal.human(
          pair.lendable?.decimals,
        )}`,
      ),
    )

    while (height === this.lastHeight) {
      await sleep(this.context.sleep)
    }

    await this.checkPairs()
  }

  private async checkPositions() {
    const height = this.lastHeight
    await sleep(this.context.sleep)

    let positions = await this.positions.all()
    positions = positions.filter((p) => p.amount.gt(amount(0)))

    let expired_positions = positions.filter(
      (p) => p.lastUpdatedAt! < Date.now() - 180_000,
    ) // Positions updated earlier than 3 minutes ago
    let not_updated_positions = positions.filter(
      (p) => p.lastUpdatedAt === undefined,
    ) // Positions that were never updated

    console.log(
      `HealthMonitor: positions count: expired ${expired_positions.length}, never updated ${not_updated_positions.length}`,
    )
    let formatted = await Promise.all(
      expired_positions
        .concat(not_updated_positions)
        .map((p) => this.formatPosition(p)),
    )
    formatted.forEach((pos) => console.log(`HealthMonitor: ${pos}`))

    while (height === this.lastHeight) {
      await sleep(this.context.sleep)
    }

    await this.checkPositions()
  }

  private async formatPosition(position: Position) {
    const lendableToken = await this.context.db
      .getRepository(Token)
      .get(position.lendable)
    const tradableToken = await this.context.db
      .getRepository(Token)
      .get(position.tradable)
    const proxyToken = position.proxy
      ? await this.context.db.getRepository(Token).get(position.proxy)
      : undefined

    const path = [lendableToken, proxyToken, tradableToken]
      .map((t) => t?.symbol)
      .filter(defined)
      .join('/')

    return `${
      position.lastUpdatedAt === undefined ? 'never updated' : 'expired'
    } position ${path} ${position.trader}`
  }
}
