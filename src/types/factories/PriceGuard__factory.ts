/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PriceGuard } from "../PriceGuard";

export class PriceGuard__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<PriceGuard> {
    return super.deploy(overrides || {}) as Promise<PriceGuard>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PriceGuard {
    return super.attach(address) as PriceGuard;
  }
  connect(signer: Signer): PriceGuard__factory {
    return super.connect(signer) as PriceGuard__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceGuard {
    return new Contract(address, _abi, signerOrProvider) as PriceGuard;
  }
}

const _abi = [
  {
    inputs: [],
    name: "REVISION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "destDecimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "getThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "struct FeedStep[]",
        name: "feeds",
        type: "tuple[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "m_feeds",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "srcDecimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610be7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063c012841d1161005b578063c012841d146100f4578063c6414eee14610109578063c78643f41461011c578063dde43cba1461012457610088565b80635c1952171461008d5780636140461c146100b657806398d5fdca146100cb578063b70a37f5146100d3575b600080fd5b6100a061009b36600461098b565b61012c565b6040516100ad9190610b17565b60405180910390f35b6100be610168565b6040516100ad9190610b30565b6100a0610176565b6100e66100e136600461098b565b610185565b6040516100ad929190610aa9565b6101076101023660046109dc565b6101ba565b005b6100a06101173660046109bb565b610382565b6100be6103f0565b6100a06103f9565b6034546000906101629061014f9061014a90859060ff1660126103fe565b610466565b603454601290610100900460ff166103fe565b92915050565b603454610100900460ff1681565b6000610180610547565b905090565b6033818154811061019557600080fd5b6000918252602090912001546001600160a01b0381169150600160a01b900460ff1682565b600054610100900460ff16806101d357506101d3610575565b806101e1575060005460ff16155b61021c5760405162461bcd60e51b815260040180806020018281038252602e815260200180610b63602e913960400191505060405180910390fd5b600054610100900460ff16158015610247576000805460ff1961ff0019909116610100171660011790555b61024f610586565b60005b82518110156103475760006001600160a01b031683828151811061027257fe5b6020026020010151600001516001600160a01b03161415604051806040016040528060138152602001724665656420697320416464726573735a65726f60681b815250906102dc5760405162461bcd60e51b81526004016102d39190610ac4565b60405180910390fd5b5060338382815181106102eb57fe5b60209081029190910181015182546001818101855560009485529383902082519101805492909301511515600160a01b0260ff60a01b196001600160a01b039092166001600160a01b0319909316929092171617905501610252565b506034805460ff8581166101000261ff001991881660ff199093169290921716179055801561037c576000805461ff00191690555b50505050565b603454600090819061039a90859060ff1660126103fe565b905060006103aa61014f83610466565b905060008482106103c4576103bf8286610628565b6103ce565b6103ce8583610628565b90506103e6826103e08361271061066a565b906106c3565b9695505050505050565b60345460ff1681565b602281565b8260ff80831690841610156104315761042a61042060ff848116908616610628565b8290600a0a61066a565b905061045f565b8160ff168360ff16111561045f5761045c61045260ff858116908516610628565b8290600a0a6106c3565b90505b9392505050565b8060005b603354811015610541576033818154811061048157fe5b600091825260209091200154603380546001600160a01b03909216916311106ee2918591859081106104af57fe5b60009182526020909120015460405160e084901b6001600160e01b03191681526104e79291600160a01b900460ff1690600401610b20565b60206040518083038186803b1580156104ff57600080fd5b505afa158015610513573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053791906109a3565b915060010161046a565b50919050565b60008061055b670de0b6b3a7640000610466565b905061056f81670de0b6b3a7640000610705565b91505090565b600061058030610844565b15905090565b600054610100900460ff168061059f575061059f610575565b806105ad575060005460ff16155b6105e85760405162461bcd60e51b815260040180806020018281038252602e815260200180610b63602e913960400191505060405180910390fd5b600054610100900460ff16158015610613576000805460ff1961ff0019909116610100171660011790555b8015610625576000805461ff00191690555b50565b600061045f83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061084e565b60008261067957506000610162565b8282028284828161068657fe5b041461045f5760405162461bcd60e51b8152600401808060200182810382526021815260200180610b916021913960400191505060405180910390fd5b600061045f83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506108a8565b60408051808201909152600381526226a22d60e91b6020820152600090826107ab5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610770578181015183820152602001610758565b50505050905090810190601f16801561079d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506040805180820190915260038152624d4d4f60e81b60208201526002830490670de0b6b3a76400008219048511156108255760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b508281670de0b6b3a76400008602018161083b57fe5b04949350505050565b803b15155b919050565b600081848411156108a05760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b505050900390565b600081836108f75760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b50600083858161090357fe5b0495945050505050565b60006040828403121561091e578081fd5b6040516040810181811067ffffffffffffffff8211171561093b57fe5b60405290508082356001600160a01b038116811461095857600080fd5b81526020830135801515811461096d57600080fd5b6020919091015292915050565b803560ff8116811461084957600080fd5b60006020828403121561099c578081fd5b5035919050565b6000602082840312156109b4578081fd5b5051919050565b600080604083850312156109cd578081fd5b50508035926020909101359150565b6000806000606084860312156109f0578081fd5b6109f98461097a565b92506020610a0881860161097a565b925060408086013567ffffffffffffffff80821115610a25578485fd5b818801915088601f830112610a38578485fd5b813581811115610a4457fe5b610a518586830201610b3e565b8181528581019250838601858302850187018c1015610a6e578788fd5b8794505b82851015610a9857610a848c8261090d565b845260019490940193928601928501610a72565b508096505050505050509250925092565b6001600160a01b039290921682521515602082015260400190565b6000602080835283518082850152825b81811015610af057858101830151858201604001528201610ad4565b81811115610b015783604083870101525b50601f01601f1916929092016040019392505050565b90815260200190565b9182521515602082015260400190565b60ff91909116815260200190565b60405181810167ffffffffffffffff81118282101715610b5a57fe5b60405291905056fe496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a2646970667358221220d79d511e18909b9c56623758118d605c2968821b65cfceccecd382f20fcf333164736f6c63430007040033";
