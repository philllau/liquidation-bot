import { BytesLike, Contract } from "ethers";
import { ExecutionContext } from ".";
import { Multicall, Multicall__factory } from "../types";
import { infRetry } from "../utils";
import { HeightMonitor } from "./HeightMonitor";

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

export class Multisender {
  private contract: Multicall;
  private latestBlock: number = 0;
  private queue: Array<CallRequest> = [];

  constructor(protected params: ExecutionContext, address: string) {
    this.contract = new Multicall__factory(params.signer).attach(address);

    this.params.getChannel(HeightMonitor).then((channel) =>
      channel.subscribe((value) => {

        if (this.latestBlock < value) {
          this.latestBlock = value;
          this.update();
        }
      })
    );
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
