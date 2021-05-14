import { BigNumber, BytesLike, Contract } from "ethers";
import { ExecutionContext } from ".";
import { Multicall, Multicall__factory } from "../types";
import { infRetry } from "../utils";
import { HeightMonitor } from "./HeightMonitor";

interface CallRequest {
  onResult: (response: string, height: BigNumber) => void;
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

type CallAnswer<
  TContract extends Contract,
  TMethod extends keyof TContract["functions"]
> = {
  result: CallResult<TContract, TMethod>;
  blockHeight: BigNumber;
};

export class Multisender {
  private contract: Multicall;
  private latestBlock: number = 0;
  private queue: Array<CallRequest> = [];
  private processing: boolean = false;

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

  async callWithBlock<
    T extends Contract,
    TMethod extends keyof T["functions"]
  >(
    contract: T,
    methodName: TMethod,
    ...args: Parameters<T["functions"][TMethod]>
  ): Promise<CallAnswer<T, TMethod>> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        call: {
          target: contract.address,
          callData: contract.interface.encodeFunctionData(
            methodName as string,
            args
          ),
        },
        onResult: (encoded: string, blockHeight: BigNumber) => {
          try {
            // hack
            const [success, data] = [
              Buffer.from(encoded.slice(2, 4), "hex"),
              Buffer.from(encoded.slice(4), "hex"),
            ];
            if (success.readUInt8()) {
              const typedResult = contract.interface.decodeFunctionResult(
                methodName as string,
                data
              );

              const result =
                Array.isArray(typedResult) && typedResult.length === 1
                  ? typedResult[0]
                  : typedResult;

              resolve({
                result,
                blockHeight,
              } as any);
            } else {
              reject(new Error(`Unsuccess call: ${contract.constructor.name} ${contract.address} ${methodName}(${args.join(", ")}) –> ${data.toString()}`));
            }
          } catch (e) {
            reject(new Error("Failed decode: " + encoded));
          }
        },
      });
    });
  }

  async call<
    T extends Contract,
    TMethod extends keyof T["functions"]
  >(
    contract: T,
    methodName: TMethod,
    ...args: Parameters<T["functions"][TMethod]>
  ): Promise<CallResult<T, TMethod>> {
    return this.callWithBlock<T, TMethod>(contract, methodName,...args).then(({result}) => result)
  }

  async update() {
    if (this.processing) return;
    this.processing = true;
    while (this.queue.length) {
      const requests = this.queue.splice(0, 100);

      const result = await infRetry(() =>
        this.contract.callStatic
          .aggregate(requests.map((r) => r.call))
          .catch((e) => {
            console.log(e);
            throw e;
          })
      );

      requests.forEach((request, index) =>
        request.onResult(result.returnData[index], result.blockNumber)
      );

      this.latestBlock = result.blockNumber.toNumber();
    }

    this.processing = false;

    setTimeout(this.update.bind(this), 100);
  }
}
