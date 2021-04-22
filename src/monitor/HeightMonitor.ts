import { Observable } from "observable-fns";
import { infRetry } from "../utils";
import { AbstractMonitor } from "./AbstractMonitor";

export class HeightMonitor extends AbstractMonitor<number> {
  public latest : number = 0;

  private onHeight(height: number) {
    if (this.latest < height) {
      this.channel.next(height);
      this.latest = height;
    }
  }

  async run(): Promise<Observable<number>> {
    this.latest = this.context.startBlock;
    await infRetry(() => this.context.provider.getBlockNumber().then(this.onHeight.bind(this)));
    this.context.provider.on("block", this.onHeight.bind(this));

    return this.channel;
  }
}
