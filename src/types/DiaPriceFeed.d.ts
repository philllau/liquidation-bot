/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface DiaPriceFeedInterface extends ethers.utils.Interface {
  functions: {
    "getAmountOut(uint256,bool)": FunctionFragment;
    "getPrice(bool)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getAmountOut",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(functionFragment: "getPrice", values: [boolean]): string;

  decodeFunctionResult(
    functionFragment: "getAmountOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;

  events: {};
}

export class DiaPriceFeed extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: DiaPriceFeedInterface;

  functions: {
    getAmountOut(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;

    "getAmountOut(uint256,bool)"(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;

    getPrice(
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { price: BigNumber }>;

    "getPrice(bool)"(
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { price: BigNumber }>;
  };

  getAmountOut(
    amountIn: BigNumberish,
    sell: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getAmountOut(uint256,bool)"(
    amountIn: BigNumberish,
    sell: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPrice(sell: boolean, overrides?: CallOverrides): Promise<BigNumber>;

  "getPrice(bool)"(
    sell: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    getAmountOut(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAmountOut(uint256,bool)"(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPrice(sell: boolean, overrides?: CallOverrides): Promise<BigNumber>;

    "getPrice(bool)"(
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getAmountOut(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAmountOut(uint256,bool)"(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPrice(sell: boolean, overrides?: CallOverrides): Promise<BigNumber>;

    "getPrice(bool)"(
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAmountOut(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAmountOut(uint256,bool)"(
      amountIn: BigNumberish,
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPrice(
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getPrice(bool)"(
      sell: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}