/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PriceGuardFactory } from "../PriceGuardFactory";

export class PriceGuardFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<PriceGuardFactory> {
    return super.deploy(overrides || {}) as Promise<PriceGuardFactory>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PriceGuardFactory {
    return super.attach(address) as PriceGuardFactory;
  }
  connect(signer: Signer): PriceGuardFactory__factory {
    return super.connect(signer) as PriceGuardFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceGuardFactory {
    return new Contract(address, _abi, signerOrProvider) as PriceGuardFactory;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
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
    inputs: [
      {
        internalType: "bytes32",
        name: "identity",
        type: "bytes32",
      },
    ],
    name: "getFeed",
    outputs: [
      {
        internalType: "contract IPriceFeed",
        name: "feed",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum FeedType",
        name: "guardType",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "getFeedIdentity",
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
            internalType: "enum FeedType",
            name: "feedType",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "ctorData",
            type: "bytes",
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
        internalType: "enum FeedType",
        name: "guardType",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "getOrCreateFeed",
    outputs: [
      {
        internalType: "contract IPriceFeed",
        name: "feed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
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
            internalType: "enum FeedType",
            name: "feedType",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "ctorData",
            type: "bytes",
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
    inputs: [],
    name: "initialize",
    outputs: [],
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
    name: "knownFeed",
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
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506129a6806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620000e25760003560e01c80638da5cb5b1162000099578063f2fde38b116200006f578063f2fde38b14620001ba578063f433ac2814620001d1578063f94ae2e614620001e8578063f997fb2314620001ff57620000e2565b80638da5cb5b146200018f578063b7e424831462000199578063dde43cba14620001b057620000e2565b8063228c8e3414620000e7578063280aebcf146200011657806336ab4520146200013c5780635e50f0451462000153578063715018a614620001795780638129fc1c1462000185575b600080fd5b620000fe620000f836600462000ec7565b62000216565b6040516200010d91906200116c565b60405180910390f35b6200012d6200012736600462000ec7565b62000234565b6040516200010d919062001158565b620000fe6200014d36600462000ec7565b62000250565b6200016a6200016436600462000ee0565b6200026e565b6040516200010d919062001177565b62000183620002a3565b005b6200018362000368565b6200012d62000430565b6200016a620001aa36600462000f32565b62000440565b6200016a62000512565b62000183620001cb36600462000e97565b62000517565b6200012d620001e236600462000ec7565b62000635565b6200012d620001f936600462000ee0565b62000651565b6200012d6200021036600462000f32565b620007a8565b600090815261016660205260409020546001600160a01b0316151590565b600090815261016760205260409020546001600160a01b031690565b600090815261016760205260409020546001600160a01b0316151590565b600082826040516020016200028592919062001122565b60405160208183030381529060405280519060200120905092915050565b620002ad620009a3565b6001600160a01b0316620002c062000430565b6001600160a01b0316146200031c576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610134546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a361013480546001600160a01b0319169055565b600054610100900460ff168062000384575062000384620009a7565b8062000393575060005460ff16155b620003d05760405162461bcd60e51b815260040180806020018281038252602e8152602001806200291b602e913960400191505060405180910390fd5b600054610100900460ff16158015620003fc576000805460ff1961ff0019909116610100171660011790555b62000406620009ba565b6200041062000a62565b6200041a62000b0a565b80156200042d576000805461ff00191690555b50565b610134546001600160a01b031690565b6000805b8251811015620004db57816200048b8483815181106200046057fe5b6020026020010151600001518584815181106200047957fe5b6020026020010151602001516200026e565b8483815181106200049857fe5b602002602001015160400151604051602001620004b893929190620010ae565b60408051601f198184030181529190528051602090910120915060010162000444565b50808484604051602001620004f393929190620010c9565b6040516020818303038152906040528051906020012090509392505050565b602281565b62000521620009a3565b6001600160a01b03166200053462000430565b6001600160a01b03161462000590576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116620005d75760405162461bcd60e51b8152600401808060200182810382526026815260200180620028f56026913960400191505060405180910390fd5b610134546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a361013480546001600160a01b0319166001600160a01b0392909216919091179055565b600090815261016660205260409020546001600160a01b031690565b6000806200066084846200026e565b90506200066d8162000250565b620007955760008460038111156200068157fe5b14156200070d576000620006d9620006be60405180602001620006a49062000dc8565b601f1982820381018352601f909101166040528662000c0b565b7050726963654775617264466163746f727960781b62000c3a565b60008381526101676020526040902080546001600160a01b0319166001600160a01b03929092169190911790555062000795565b60018460038111156200071c57fe5b14156200073f576000620006d9620006be60405180602001620006a49062000dd6565b604080518082018252601d81527f50726f76696465642066656564207479706520697320756e6b6e6f776e0000006020820152905162461bcd60e51b81526200078c919060040162001180565b60405180910390fd5b620007a08162000234565b949350505050565b600080620007b885858562000440565b9050620007c58162000216565b6200098f576060835167ffffffffffffffff81118015620007e557600080fd5b506040519080825280602002602001820160405280156200082357816020015b6200080f62000de4565b815260200190600190039081620008055790505b50905060005b8451811015620008c75760405180604001604052806200087a8784815181106200084f57fe5b6020026020010151600001518885815181106200086857fe5b60200260200101516020015162000651565b6001600160a01b031681526020018683815181106200089557fe5b6020026020010151604001511515815250828281518110620008b357fe5b602090810291909101015260010162000829565b506000604051620008d89062000dfb565b604051809103906000f080158015620008f5573d6000803e3d6000fd5b5060405163c012841d60e01b81529091506001600160a01b0382169063c012841d906200092b908a908a908790600401620011b5565b600060405180830381600087803b1580156200094657600080fd5b505af11580156200095b573d6000803e3d6000fd5b50505060008481526101666020526040902080546001600160a01b0319166001600160a01b03939093169290921790915550505b6200099a8162000635565b95945050505050565b3390565b6000620009b43062000ca9565b15905090565b600054610100900460ff1680620009d65750620009d6620009a7565b80620009e5575060005460ff16155b62000a225760405162461bcd60e51b815260040180806020018281038252602e8152602001806200291b602e913960400191505060405180910390fd5b600054610100900460ff161580156200041a576000805460ff1961ff00199091166101001716600117905580156200042d576000805461ff001916905550565b600054610100900460ff168062000a7e575062000a7e620009a7565b8062000a8d575060005460ff16155b62000aca5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200291b602e913960400191505060405180910390fd5b600054610100900460ff1615801562000af6576000805460ff1961ff0019909116610100171660011790555b62000b00620009ba565b6200041a62000cb3565b600054610100900460ff168062000b26575062000b26620009a7565b8062000b35575060005460ff16155b62000b725760405162461bcd60e51b815260040180806020018281038252602e8152602001806200291b602e913960400191505060405180910390fd5b600054610100900460ff1615801562000b9e576000805460ff1961ff0019909116610100171660011790555b60335462000bab62000db7565b1162000be95760405162461bcd60e51b8152600401808060200182810382526028815260200180620029496028913960400191505060405180910390fd5b62000bf362000db7565b60335580156200042d576000805461ff001916905550565b6060828260405160200162000c22929190620010ef565b60405160208183030381529060405290505b92915050565b60008060ff60f81b3084868051906020012060405160200162000c61949392919062001075565b6040516020818303038152906040528051906020012090508060001c915062000c8a8262000dbc565b1562000c97575062000c34565b828451602086016000f5949350505050565b803b15155b919050565b600054610100900460ff168062000ccf575062000ccf620009a7565b8062000cde575060005460ff16155b62000d1b5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200291b602e913960400191505060405180910390fd5b600054610100900460ff1615801562000d47576000805460ff1961ff0019909116610100171660011790555b600062000d53620009a3565b61013480546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35080156200042d576000805461ff001916905550565b602290565b3b63ffffffff16151590565b61044e806200128083390190565b61062080620016ce83390190565b604080518082019091526000808252602082015290565b610c078062001cee83390190565b600082601f83011262000e1a578081fd5b813567ffffffffffffffff81111562000e2f57fe5b62000e44601f8201601f191660200162001227565b915080825283602082850101111562000e5c57600080fd5b8060208401602084013760009082016020015292915050565b80356004811062000cae57600080fd5b803560ff8116811462000cae57600080fd5b60006020828403121562000ea9578081fd5b81356001600160a01b038116811462000ec0578182fd5b9392505050565b60006020828403121562000ed9578081fd5b5035919050565b6000806040838503121562000ef3578081fd5b62000efe8362000e75565b9150602083013567ffffffffffffffff81111562000f1a578182fd5b62000f288582860162000e09565b9150509250929050565b60008060006060848603121562000f47578081fd5b62000f528462000e85565b925062000f626020850162000e85565b9150604084013567ffffffffffffffff8082111562000f7f578283fd5b818601915086601f83011262000f93578283fd5b81358181111562000fa057fe5b62000fb060208083020162001227565b818152602080820191908501865b848110156200106457813587016060818e03601f1901121562000fdf578889fd5b60405160608101818110898211171562000ff557fe5b604052620010066020830162000e75565b81526040820135888111156200101a578a8bfd5b6200102b8f60208386010162000e09565b6020830152506060820135915081151582146200104657898afd5b60408101919091528452602093840193919091019060010162000fbe565b505080955050505050509250925092565b6001600160f81b031994909416845260609290921b6bffffffffffffffffffffffff191660018401526015830152603582015260550190565b9283526020830191909152151560f81b604082015260410190565b9283526001600160f81b031960f892831b81166020850152911b16602182015260220190565b60008351620011038184602088016200124c565b835190830190620011198183602088016200124c565b01949350505050565b6000600484106200112f57fe5b8360f81b825282516200114a8160018501602087016200124c565b919091016001019392505050565b6001600160a01b0391909116815260200190565b901515815260200190565b90815260200190565b6000602082528251806020840152620011a18160408501602087016200124c565b601f01601f19169190910160400192915050565b60006060820160ff86168352602060ff86168185015260406060818601528286518085526080870191508388019450855b818110156200121857855180516001600160a01b031684528501511515858401529484019491830191600101620011e6565b50909998505050505050505050565b60405181810167ffffffffffffffff811182821017156200124457fe5b604052919050565b60005b83811015620012695781810151838201526020016200124f565b8381111562001279576000848401525b5050505056fe608060405234801561001057600080fd5b5060405161044e38038061044e8339818101604052606081101561003357600080fd5b5080516020820151604090920151600092909255600180546001600160a01b0390921661010002610100600160a81b031993151560ff1990931692909217929092161790556103c7806100876000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806311106ee214610046578063dde43cba1461007d578063e245b5af14610085575b600080fd5b61006b6004803603604081101561005c57600080fd5b508035906020013515156100a4565b60408051918252519081900360200190f35b61006b6100c4565b61006b6004803603602081101561009b57600080fd5b503515156100c9565b6000806100b0836100c9565b90506100bc8482610174565b949350505050565b602281565b60008060018054906101000a90046001600160a01b03166001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b15801561011857600080fd5b505afa15801561012c573d6000803e3d6000fd5b505050506040513d60a081101561014257600080fd5b5060200151905061015281610269565b91508261016e5761016b670de0b6b3a76400008361028f565b91505b50919050565b6000821580610181575081155b1561018e57506000610263565b816706f05b59d3b2000019816101a057fe5b04831115604051806040016040528060038152602001624d4d4f60e81b815250906102495760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561020e5781810151838201526020016101f6565b50505050905090810190601f16801561023b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050670de0b6b3a76400006706f05b59d3b2000082840201045b92915050565b60015460009060ff1661028757600054828161028157fe5b04610263565b506000540290565b60408051808201909152600381526226a22d60e91b6020820152600090826102f85760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561020e5781810151838201526020016101f6565b506040805180820190915260038152624d4d4f60e81b60208201526002830490670de0b6b3a76400008219048511156103725760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561020e5781810151838201526020016101f6565b508281670de0b6b3a76400008602018161038857fe5b0494935050505056fea2646970667358221220f76b6fbb4515f7258cfd8d2b90d257c0b230127937ec7b6e9c97181dae6a976f64736f6c63430007040033608060405234801561001057600080fd5b506040516106203803806106208339818101604052608081101561003357600080fd5b81516020830180516040519294929383019291908464010000000082111561005a57600080fd5b90830190602082018581111561006f57600080fd5b825164010000000081118282018810171561008957600080fd5b82525081516020918201929091019080838360005b838110156100b657818101518382015260200161009e565b50505050905090810190601f1680156100e35780820380516001836020036101000a031916815260200191505b5060409081526020828101519290910151600080546001600160a01b0319166001600160a01b0389161790558551929450925061012591600191860190610145565b506002919091556003805460ff1916911515919091179055506101e69050565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261017b57600085556101c1565b82601f1061019457805160ff19168380011785556101c1565b828001600101855582156101c1579182015b828111156101c15782518255916020019190600101906101a6565b506101cd9291506101d1565b5090565b5b808211156101cd57600081556001016101d2565b61042b806101f56000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806311106ee21461003b578063e245b5af14610072575b600080fd5b6100606004803603604081101561005157600080fd5b50803590602001351515610091565b60408051918252519081900360200190f35b6100606004803603602081101561008857600080fd5b503515156100b1565b60008061009d836100b1565b90506100a984826101d8565b949350505050565b600080546040516304b01c2560e51b8152602060048201908152600180546002600019828416156101000201909116046024840181905285946001600160a01b03169363960384a09391829160440190849080156101505780601f1061012557610100808354040283529160200191610150565b820191906000526020600020905b81548152906001019060200180831161013357829003601f168201915b505092505050604080518083038186803b15801561016d57600080fd5b505afa158015610181573d6000803e3d6000fd5b505050506040513d604081101561019757600080fd5b505190506101b66fffffffffffffffffffffffffffffffff82166102cd565b9150826101d2576101cf670de0b6b3a7640000836102f3565b91505b50919050565b60008215806101e5575081155b156101f2575060006102c7565b816706f05b59d3b20000198161020457fe5b04831115604051806040016040528060038152602001624d4d4f60e81b815250906102ad5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561027257818101518382015260200161025a565b50505050905090810190601f16801561029f5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050670de0b6b3a76400006706f05b59d3b2000082840201045b92915050565b60035460009060ff166102eb5760025482816102e557fe5b046102c7565b506002540290565b60408051808201909152600381526226a22d60e91b60208201526000908261035c5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561027257818101518382015260200161025a565b506040805180820190915260038152624d4d4f60e81b60208201526002830490670de0b6b3a76400008219048511156103d65760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561027257818101518382015260200161025a565b508281670de0b6b3a7640000860201816103ec57fe5b0494935050505056fea264697066735822122016d5ea3725953414c062656aee5e88aa91e6252e4e118d3e669e6a22ab0da3c464736f6c63430007040033608060405234801561001057600080fd5b50610be7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063c012841d1161005b578063c012841d146100f4578063c6414eee14610109578063c78643f41461011c578063dde43cba1461012457610088565b80635c1952171461008d5780636140461c146100b657806398d5fdca146100cb578063b70a37f5146100d3575b600080fd5b6100a061009b36600461098b565b61012c565b6040516100ad9190610b17565b60405180910390f35b6100be610168565b6040516100ad9190610b30565b6100a0610176565b6100e66100e136600461098b565b610185565b6040516100ad929190610aa9565b6101076101023660046109dc565b6101ba565b005b6100a06101173660046109bb565b610382565b6100be6103f0565b6100a06103f9565b6034546000906101629061014f9061014a90859060ff1660126103fe565b610466565b603454601290610100900460ff166103fe565b92915050565b603454610100900460ff1681565b6000610180610547565b905090565b6033818154811061019557600080fd5b6000918252602090912001546001600160a01b0381169150600160a01b900460ff1682565b600054610100900460ff16806101d357506101d3610575565b806101e1575060005460ff16155b61021c5760405162461bcd60e51b815260040180806020018281038252602e815260200180610b63602e913960400191505060405180910390fd5b600054610100900460ff16158015610247576000805460ff1961ff0019909116610100171660011790555b61024f610586565b60005b82518110156103475760006001600160a01b031683828151811061027257fe5b6020026020010151600001516001600160a01b03161415604051806040016040528060138152602001724665656420697320416464726573735a65726f60681b815250906102dc5760405162461bcd60e51b81526004016102d39190610ac4565b60405180910390fd5b5060338382815181106102eb57fe5b60209081029190910181015182546001818101855560009485529383902082519101805492909301511515600160a01b0260ff60a01b196001600160a01b039092166001600160a01b0319909316929092171617905501610252565b506034805460ff8581166101000261ff001991881660ff199093169290921716179055801561037c576000805461ff00191690555b50505050565b603454600090819061039a90859060ff1660126103fe565b905060006103aa61014f83610466565b905060008482106103c4576103bf8286610628565b6103ce565b6103ce8583610628565b90506103e6826103e08361271061066a565b906106c3565b9695505050505050565b60345460ff1681565b602281565b8260ff80831690841610156104315761042a61042060ff848116908616610628565b8290600a0a61066a565b905061045f565b8160ff168360ff16111561045f5761045c61045260ff858116908516610628565b8290600a0a6106c3565b90505b9392505050565b8060005b603354811015610541576033818154811061048157fe5b600091825260209091200154603380546001600160a01b03909216916311106ee2918591859081106104af57fe5b60009182526020909120015460405160e084901b6001600160e01b03191681526104e79291600160a01b900460ff1690600401610b20565b60206040518083038186803b1580156104ff57600080fd5b505afa158015610513573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053791906109a3565b915060010161046a565b50919050565b60008061055b670de0b6b3a7640000610466565b905061056f81670de0b6b3a7640000610705565b91505090565b600061058030610844565b15905090565b600054610100900460ff168061059f575061059f610575565b806105ad575060005460ff16155b6105e85760405162461bcd60e51b815260040180806020018281038252602e815260200180610b63602e913960400191505060405180910390fd5b600054610100900460ff16158015610613576000805460ff1961ff0019909116610100171660011790555b8015610625576000805461ff00191690555b50565b600061045f83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061084e565b60008261067957506000610162565b8282028284828161068657fe5b041461045f5760405162461bcd60e51b8152600401808060200182810382526021815260200180610b916021913960400191505060405180910390fd5b600061045f83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506108a8565b60408051808201909152600381526226a22d60e91b6020820152600090826107ab5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610770578181015183820152602001610758565b50505050905090810190601f16801561079d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506040805180820190915260038152624d4d4f60e81b60208201526002830490670de0b6b3a76400008219048511156108255760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b508281670de0b6b3a76400008602018161083b57fe5b04949350505050565b803b15155b919050565b600081848411156108a05760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b505050900390565b600081836108f75760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b50600083858161090357fe5b0495945050505050565b60006040828403121561091e578081fd5b6040516040810181811067ffffffffffffffff8211171561093b57fe5b60405290508082356001600160a01b038116811461095857600080fd5b81526020830135801515811461096d57600080fd5b6020919091015292915050565b803560ff8116811461084957600080fd5b60006020828403121561099c578081fd5b5035919050565b6000602082840312156109b4578081fd5b5051919050565b600080604083850312156109cd578081fd5b50508035926020909101359150565b6000806000606084860312156109f0578081fd5b6109f98461097a565b92506020610a0881860161097a565b925060408086013567ffffffffffffffff80821115610a25578485fd5b818801915088601f830112610a38578485fd5b813581811115610a4457fe5b610a518586830201610b3e565b8181528581019250838601858302850187018c1015610a6e578788fd5b8794505b82851015610a9857610a848c8261090d565b845260019490940193928601928501610a72565b508096505050505050509250925092565b6001600160a01b039290921682521515602082015260400190565b6000602080835283518082850152825b81811015610af057858101830151858201604001528201610ad4565b81811115610b015783604083870101525b50601f01601f1916929092016040019392505050565b90815260200190565b9182521515602082015260400190565b60ff91909116815260200190565b60405181810167ffffffffffffffff81118282101715610b5a57fe5b60405291905056fe496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a2646970667358221220d79d511e18909b9c56623758118d605c2968821b65cfceccecd382f20fcf333164736f6c634300070400334f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656456657273696f6e65643a207265766973696f6e20697320746f6f206c6f7720746f20757064617465a26469706673582212205b549bfc8c5d3bdd97850eb56233b5f032b963094f30e57d70552e8a878fc40a64736f6c63430007040033";
