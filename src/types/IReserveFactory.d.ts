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
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IReserveFactoryInterface extends ethers.utils.Interface {
  functions: {
    "getAllLendables()": FunctionFragment;
    "getOrCreateReserve(address)": FunctionFragment;
    "getOrCreateShortingReserve(address)": FunctionFragment;
    "getReserve(address)": FunctionFragment;
    "isRegisteredLendable(address)": FunctionFragment;
    "registerLendable(address)": FunctionFragment;
    "registerLendables(address[])": FunctionFragment;
    "reserveBytecodeHash()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getAllLendables",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOrCreateReserve",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getOrCreateShortingReserve",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getReserve", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isRegisteredLendable",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerLendable",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerLendables",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "reserveBytecodeHash",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getAllLendables",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrCreateReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrCreateShortingReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getReserve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isRegisteredLendable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerLendable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerLendables",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reserveBytecodeHash",
    data: BytesLike
  ): Result;

  events: {};
}

export class IReserveFactory extends Contract {
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

  interface: IReserveFactoryInterface;

  functions: {
    getAllLendables(overrides?: Overrides): Promise<ContractTransaction>;

    "getAllLendables()"(overrides?: Overrides): Promise<ContractTransaction>;

    getOrCreateReserve(
      lendable: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getOrCreateReserve(address)"(
      lendable: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getOrCreateShortingReserve(
      shortable: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getOrCreateShortingReserve(address)"(
      shortable: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getReserve(lendable: string, overrides?: CallOverrides): Promise<[string]>;

    "getReserve(address)"(
      lendable: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isRegisteredLendable(
      token: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isRegisteredLendable(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerLendable(
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerLendable(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    registerLendables(
      token: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerLendables(address[])"(
      token: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    reserveBytecodeHash(overrides?: CallOverrides): Promise<[string]>;

    "reserveBytecodeHash()"(overrides?: CallOverrides): Promise<[string]>;
  };

  getAllLendables(overrides?: Overrides): Promise<ContractTransaction>;

  "getAllLendables()"(overrides?: Overrides): Promise<ContractTransaction>;

  getOrCreateReserve(
    lendable: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getOrCreateReserve(address)"(
    lendable: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getOrCreateShortingReserve(
    shortable: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getOrCreateShortingReserve(address)"(
    shortable: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getReserve(lendable: string, overrides?: CallOverrides): Promise<string>;

  "getReserve(address)"(
    lendable: string,
    overrides?: CallOverrides
  ): Promise<string>;

  isRegisteredLendable(
    token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isRegisteredLendable(address)"(
    token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerLendable(
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerLendable(address)"(
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  registerLendables(
    token: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerLendables(address[])"(
    token: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  reserveBytecodeHash(overrides?: CallOverrides): Promise<string>;

  "reserveBytecodeHash()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getAllLendables(overrides?: CallOverrides): Promise<string[]>;

    "getAllLendables()"(overrides?: CallOverrides): Promise<string[]>;

    getOrCreateReserve(
      lendable: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getOrCreateReserve(address)"(
      lendable: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getOrCreateShortingReserve(
      shortable: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getOrCreateShortingReserve(address)"(
      shortable: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getReserve(lendable: string, overrides?: CallOverrides): Promise<string>;

    "getReserve(address)"(
      lendable: string,
      overrides?: CallOverrides
    ): Promise<string>;

    isRegisteredLendable(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isRegisteredLendable(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerLendable(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "registerLendable(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerLendables(
      token: string[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    "registerLendables(address[])"(
      token: string[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    reserveBytecodeHash(overrides?: CallOverrides): Promise<string>;

    "reserveBytecodeHash()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getAllLendables(overrides?: Overrides): Promise<BigNumber>;

    "getAllLendables()"(overrides?: Overrides): Promise<BigNumber>;

    getOrCreateReserve(
      lendable: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "getOrCreateReserve(address)"(
      lendable: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getOrCreateShortingReserve(
      shortable: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "getOrCreateShortingReserve(address)"(
      shortable: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getReserve(lendable: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getReserve(address)"(
      lendable: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRegisteredLendable(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isRegisteredLendable(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerLendable(token: string, overrides?: Overrides): Promise<BigNumber>;

    "registerLendable(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    registerLendables(
      token: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "registerLendables(address[])"(
      token: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    reserveBytecodeHash(overrides?: CallOverrides): Promise<BigNumber>;

    "reserveBytecodeHash()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getAllLendables(overrides?: Overrides): Promise<PopulatedTransaction>;

    "getAllLendables()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    getOrCreateReserve(
      lendable: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getOrCreateReserve(address)"(
      lendable: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getOrCreateShortingReserve(
      shortable: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getOrCreateShortingReserve(address)"(
      shortable: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getReserve(
      lendable: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getReserve(address)"(
      lendable: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRegisteredLendable(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isRegisteredLendable(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerLendable(
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerLendable(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    registerLendables(
      token: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerLendables(address[])"(
      token: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    reserveBytecodeHash(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "reserveBytecodeHash()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
