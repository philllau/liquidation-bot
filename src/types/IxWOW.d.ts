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

interface IxWOWInterface extends ethers.utils.Interface {
  functions: {
    "addStakeable(address,uint256)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "calcAmountOut(address,uint256,uint16)": FunctionFragment;
    "convertToWOW(address,uint256)": FunctionFragment;
    "getStake(address,address)": FunctionFragment;
    "removeAllowance(address)": FunctionFragment;
    "setStakingPeriodMultipliers(uint16[],uint112[])": FunctionFragment;
    "stake(address,address,uint16)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "unstake(address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addStakeable",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "calcAmountOut",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "convertToWOW",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getStake",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeAllowance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setStakingPeriodMultipliers",
    values: [BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "addStakeable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calcAmountOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "convertToWOW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getStake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStakingPeriodMultipliers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export class IxWOW extends Contract {
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

  interface: IxWOWInterface;

  functions: {
    addStakeable(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "addStakeable(address,uint256)"(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calcAmountOut(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calcAmountOut(address,uint256,uint16)"(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    convertToWOW(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "convertToWOW(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getStake(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber] & {
          amount: BigNumber;
          timeout: BigNumber;
          minted: BigNumber;
        }
      ]
    >;

    "getStake(address,address)"(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber] & {
          amount: BigNumber;
          timeout: BigNumber;
          minted: BigNumber;
        }
      ]
    >;

    removeAllowance(
      holder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "removeAllowance(address)"(
      holder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setStakingPeriodMultipliers(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setStakingPeriodMultipliers(uint16[],uint112[])"(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    stake(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "stake(address,address,uint16)"(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    "totalSupply()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    unstake(
      investor: string,
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "unstake(address,address)"(
      investor: string,
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  addStakeable(
    stakeable: string,
    multiplier: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "addStakeable(address,uint256)"(
    stakeable: string,
    multiplier: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "allowance(address,address)"(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "approve(address,uint256)"(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  "balanceOf(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calcAmountOut(
    token: string,
    amountIn: BigNumberish,
    period: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calcAmountOut(address,uint256,uint16)"(
    token: string,
    amountIn: BigNumberish,
    period: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  convertToWOW(
    token: string,
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "convertToWOW(address,uint256)"(
    token: string,
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getStake(
    investor: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      amount: BigNumber;
      timeout: BigNumber;
      minted: BigNumber;
    }
  >;

  "getStake(address,address)"(
    investor: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      amount: BigNumber;
      timeout: BigNumber;
      minted: BigNumber;
    }
  >;

  removeAllowance(
    holder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "removeAllowance(address)"(
    holder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setStakingPeriodMultipliers(
    periods: BigNumberish[],
    multipliers: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setStakingPeriodMultipliers(uint16[],uint112[])"(
    periods: BigNumberish[],
    multipliers: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  stake(
    investor: string,
    token: string,
    period: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "stake(address,address,uint16)"(
    investor: string,
    token: string,
    period: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transfer(address,uint256)"(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferFrom(address,address,uint256)"(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  unstake(
    investor: string,
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "unstake(address,address)"(
    investor: string,
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    addStakeable(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "addStakeable(address,uint256)"(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcAmountOut(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calcAmountOut(address,uint256,uint16)"(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    convertToWOW(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "convertToWOW(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStake(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        timeout: BigNumber;
        minted: BigNumber;
      }
    >;

    "getStake(address,address)"(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        timeout: BigNumber;
        minted: BigNumber;
      }
    >;

    removeAllowance(holder: string, overrides?: CallOverrides): Promise<void>;

    "removeAllowance(address)"(
      holder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setStakingPeriodMultipliers(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "setStakingPeriodMultipliers(uint16[],uint112[])"(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    stake(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "stake(address,address,uint16)"(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    unstake(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "unstake(address,address)"(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Approval(
      owner: string | null,
      spender: string | null,
      value: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    Transfer(
      from: string | null,
      to: string | null,
      value: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;
  };

  estimateGas: {
    addStakeable(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "addStakeable(address,uint256)"(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcAmountOut(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calcAmountOut(address,uint256,uint16)"(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    convertToWOW(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "convertToWOW(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStake(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getStake(address,address)"(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeAllowance(holder: string, overrides?: Overrides): Promise<BigNumber>;

    "removeAllowance(address)"(
      holder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setStakingPeriodMultipliers(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setStakingPeriodMultipliers(uint16[],uint112[])"(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    stake(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "stake(address,address,uint16)"(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    unstake(
      investor: string,
      token: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "unstake(address,address)"(
      investor: string,
      token: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addStakeable(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "addStakeable(address,uint256)"(
      stakeable: string,
      multiplier: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calcAmountOut(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calcAmountOut(address,uint256,uint16)"(
      token: string,
      amountIn: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    convertToWOW(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "convertToWOW(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStake(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getStake(address,address)"(
      investor: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeAllowance(
      holder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "removeAllowance(address)"(
      holder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setStakingPeriodMultipliers(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setStakingPeriodMultipliers(uint16[],uint112[])"(
      periods: BigNumberish[],
      multipliers: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    stake(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "stake(address,address,uint16)"(
      investor: string,
      token: string,
      period: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalSupply()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    unstake(
      investor: string,
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "unstake(address,address)"(
      investor: string,
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}