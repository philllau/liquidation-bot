/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { INewPriceGuardFactory } from "../INewPriceGuardFactory";

export class INewPriceGuardFactory__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): INewPriceGuardFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as INewPriceGuardFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "identity",
        type: "bytes32",
      },
    ],
    name: "getGuard",
    outputs: [
      {
        internalType: "contract IPriceGuard",
        name: "guard",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "src",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "dest",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "contract IPriceFeed",
            name: "feed",
            type: "address",
          },
          {
            internalType: "bool",
            name: "sell",
            type: "bool",
          },
        ],
        internalType: "struct GuardPriceStep[]",
        name: "feeds",
        type: "tuple[]",
      },
    ],
    name: "getGuardIdentity",
    outputs: [
      {
        internalType: "bytes32",
        name: "identity",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "src",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "dest",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "contract IPriceFeed",
            name: "feed",
            type: "address",
          },
          {
            internalType: "bool",
            name: "sell",
            type: "bool",
          },
        ],
        internalType: "struct GuardPriceStep[]",
        name: "feeds",
        type: "tuple[]",
      },
    ],
    name: "getOrCreateGuard",
    outputs: [
      {
        internalType: "contract IPriceGuard",
        name: "guard",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "identity",
        type: "bytes32",
      },
    ],
    name: "knownGuard",
    outputs: [
      {
        internalType: "bool",
        name: "known",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];