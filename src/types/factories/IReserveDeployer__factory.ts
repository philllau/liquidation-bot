/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IReserveDeployer } from "../IReserveDeployer";

export class IReserveDeployer__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IReserveDeployer {
    return new Contract(address, _abi, signerOrProvider) as IReserveDeployer;
  }
}

const _abi = [
  {
    inputs: [],
    name: "getReserveImplementation",
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
];