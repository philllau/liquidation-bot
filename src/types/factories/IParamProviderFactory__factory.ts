/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IParamProviderFactory } from "../IParamProviderFactory";

export class IParamProviderFactory__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IParamProviderFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IParamProviderFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    name: "createPairParamProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendable",
        type: "address",
      },
    ],
    name: "createReserveParamProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendable",
        type: "address",
      },
      {
        internalType: "address",
        name: "tradable",
        type: "address",
      },
    ],
    name: "getPairParamProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendable",
        type: "address",
      },
    ],
    name: "getReserveParamProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendable",
        type: "address",
      },
      {
        internalType: "address",
        name: "proxyLendable",
        type: "address",
      },
      {
        internalType: "address",
        name: "tradable",
        type: "address",
      },
    ],
    name: "getRoutablePairParamProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "swapRouter",
        type: "address",
      },
    ],
    name: "setSwapRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    name: "upgradePairParamProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendable",
        type: "address",
      },
    ],
    name: "upgradeReserveParamProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];