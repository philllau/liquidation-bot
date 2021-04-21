import { classToPlain } from "class-transformer";
import { Diff, diff, DiffArray, DiffNew } from "deep-diff";
import { map, Observable } from "observable-fns";
import { IERC20Detailed__factory } from "../types";
import { byteToAddress, mapAll } from "../utils";
import { AbstractMonitor } from "./AbstractMonitor";
import { HeightMonitor } from "./HeightMonitor";
import { Token } from "./models";

export class TokenMonitor extends AbstractMonitor<Token> {
  public lendables: string[] = [];
  public tradables: string[] = [];

  get lendableTokens(): Promise<Token[]> {
    return this.context.db.getRepository(Token).find("lendable", true);
  }

  get tradableTokens(): Promise<Token[]> {
    return this.context.db.getRepository(Token).find("lendable", false);
  }

  async run(): Promise<Observable<Token>> {
    this.context.getChannel(HeightMonitor).then((channel) =>
      channel
        .pipe(
          map(() =>
            this.context.sender
              .call(this.context.reserveFactory, "getAllLendables")
              .then(mapAll(byteToAddress))
          )
        )
        .subscribe((values) => {
          const difference = diff(this.lendables, values);
          if (difference) {
            this.lendables = values;
            this.parseDifference(difference as any, true);
          }
        })
    );

    console.log(await this.lendableTokens.then(token => classToPlain(token)))

    this.context.getChannel(HeightMonitor).then((channel) =>
      channel
        .pipe(
          map(() =>
            this.context.sender
              .call(this.context.pairFactory, "getAllTradables")
              .then(mapAll(byteToAddress))
          )
        )
        .subscribe((values) => {
          const difference = diff(this.tradables, values);
          if (difference) {
            this.tradables = values;
            this.parseDifference(difference as any, false);
          }
        })
    );
    return this.channel;
  }

  private parseDifference(
    difference: Diff<string[], string>[],
    isLendable: boolean
  ) {
    const newTokens: string[] = difference
      .filter((dif): dif is DiffArray<string[], string> => dif.kind === "A")
      .map((difs) => difs.item)
      .filter((dif): dif is DiffNew<string> => dif.kind === "N")
      .map((dif) => dif.rhs);

    Promise.all(
      newTokens.map(async (address) => {
        const repository = this.context.db.getRepository(Token);

        let instance = await repository.get(address);
        if (!instance) {
          console.log(`Loading token at ${address}`);
          instance = new Token();
          instance.lendable = isLendable;
          instance.address = address;

          const contract = IERC20Detailed__factory.connect(
            address,
            this.context.provider
          );

          [
            instance.name,
            instance.symbol,
            instance.decimals,
          ] = await Promise.all([
            this.context.sender!.call(contract, "name"),
            this.context.sender!.call(contract, "symbol"),
            this.context.sender!.call(contract, "decimals"),
          ]);

          await this.context.db.getRepository(Token).put(instance);
        }

        this.channel.next(instance);
      })
    );
  }
}
