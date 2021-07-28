/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { NewPriceGuardFactory } from "../NewPriceGuardFactory";

export class NewPriceGuardFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<NewPriceGuardFactory> {
    return super.deploy(overrides || {}) as Promise<NewPriceGuardFactory>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NewPriceGuardFactory {
    return super.attach(address) as NewPriceGuardFactory;
  }
  connect(signer: Signer): NewPriceGuardFactory__factory {
    return super.connect(signer) as NewPriceGuardFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NewPriceGuardFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as NewPriceGuardFactory;
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
  "0x608060405234801561001057600080fd5b5061235d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638da5cb5b116100665780638da5cb5b146100f3578063c97c74e5146100fb578063dde43cba1461011b578063f2fde38b14610123578063f433ac281461013657610093565b8063228c8e341461009857806324df44ff146100c1578063715018a6146100e15780638129fc1c146100eb575b600080fd5b6100ab6100a6366004610ac4565b610149565b6040516100b89190610ccc565b60405180910390f35b6100d46100cf366004610af4565b610166565b6040516100b89190610c49565b6100e9610299565b005b6100e9610357565b6100d4610409565b61010e610109366004610af4565b610418565b6040516100b89190610cd7565b61010e6104b6565b6100e9610131366004610aa1565b6104bb565b6100d4610144366004610ac4565b6105d0565b600080610155836105d0565b6001600160a01b0316141592915050565b600080610174858585610418565b905061017f816105d0565b91506001600160a01b03821661021a57606063c012841d60e01b8686866040516024016101ae93929190610ce0565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905060006101ee83836105ee565b600084815260656020526040902080546001600160a01b0319166001600160a01b038316179055935050505b60226102258361068f565b101561029157816001600160a01b0316633659cfe661024261070d565b6040518263ffffffff1660e01b815260040161025e9190610c49565b600060405180830381600087803b15801561027857600080fd5b505af115801561028c573d6000803e3d6000fd5b505050505b509392505050565b6102a161074d565b6001600160a01b03166102b2610409565b6001600160a01b03161461030d576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b600054610100900460ff16806103705750610370610751565b8061037e575060005460ff16155b6103b95760405162461bcd60e51b815260040180806020018281038252602e8152602001806122fa602e913960400191505060405180910390fd5b600054610100900460ff161580156103e4576000805460ff1961ff0019909116610100171660011790555b6103ec610762565b6103f4610802565b8015610406576000805461ff00191690555b50565b6033546001600160a01b031690565b6000838360405160200161042d929190610c27565b60405160208183030381529060405280519060200120905060005b8251811015610291578183828151811061045e57fe5b60200260200101516000015184838151811061047657fe5b60200260200101516020015160405160200161049493929190610bfa565b60408051601f1981840301815291905280516020909101209150600101610448565b602281565b6104c361074d565b6001600160a01b03166104d4610409565b6001600160a01b03161461052f576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166105745760405162461bcd60e51b81526004018080602001828103825260268152602001806122d46026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b6000818152606560205260409020546001600160a01b03165b919050565b6000826040516105fd90610a15565b8190604051809103906000f590508015801561061d573d6000803e3d6000fd5b509050806001600160a01b031663cf7a1d7761063761070d565b30856040518463ffffffff1660e01b815260040161065793929190610c5d565b600060405180830381600087803b15801561067157600080fd5b505af1158015610685573d6000803e3d6000fd5b5050505092915050565b6000816001600160a01b031663dde43cba6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106ca57600080fd5b505afa9250505080156106fa575060408051601f3d908101601f191682019092526106f791810190610adc565b60015b610706575060016105e9565b90506105e9565b60006107486040518060200161072290610a22565b601f1982820381018352601f9091011660405269141c9a58d951dd585c9960b21b61089f565b905090565b3390565b600061075c3061090a565b15905090565b600054610100900460ff168061077b575061077b610751565b80610789575060005460ff16155b6107c45760405162461bcd60e51b815260040180806020018281038252602e8152602001806122fa602e913960400191505060405180910390fd5b600054610100900460ff161580156103f4576000805460ff1961ff0019909116610100171660011790558015610406576000805461ff001916905550565b600054610100900460ff168061081b575061081b610751565b80610829575060005460ff16155b6108645760405162461bcd60e51b815260040180806020018281038252602e8152602001806122fa602e913960400191505060405180910390fd5b600054610100900460ff1615801561088f576000805460ff1961ff0019909116610100171660011790555b610897610762565b6103f4610910565b60008060ff60f81b308486805190602001206040516020016108c49493929190610bc1565b6040516020818303038152906040528051906020012090508060001c91506108eb82610a09565b156108f65750610904565b828451602086016000f59150505b92915050565b3b151590565b600054610100900460ff16806109295750610929610751565b80610937575060005460ff16155b6109725760405162461bcd60e51b815260040180806020018281038252602e8152602001806122fa602e913960400191505060405180910390fd5b600054610100900460ff1615801561099d576000805460ff1961ff0019909116610100171660011790555b60006109a761074d565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610406576000805461ff001916905550565b3b63ffffffff16151590565b61094380610d8a83390190565b610c07806116cd83390190565b600060408284031215610a40578081fd5b6040516040810181811067ffffffffffffffff82111715610a5d57fe5b6040529050808235610a6e81610d74565b815260208301358015158114610a8357600080fd5b6020919091015292915050565b803560ff811681146105e957600080fd5b600060208284031215610ab2578081fd5b8135610abd81610d74565b9392505050565b600060208284031215610ad5578081fd5b5035919050565b600060208284031215610aed578081fd5b5051919050565b600080600060608486031215610b08578182fd5b610b1184610a90565b92506020610b20818601610a90565b925060408086013567ffffffffffffffff80821115610b3d578485fd5b818801915088601f830112610b50578485fd5b813581811115610b5c57fe5b610b698586830201610d50565b8181528581019250838601858302850187018c1015610b86578788fd5b8794505b82851015610bb057610b9c8c82610a2f565b845260019490940193928601928501610b8a565b508096505050505050509250925092565b6001600160f81b031994909416845260609290921b6bffffffffffffffffffffffff191660018401526015830152603582015260550190565b92835260609190911b6bffffffffffffffffffffffff19166020830152151560f81b603482015260350190565b6001600160f81b031960f893841b811682529190921b16600182015260020190565b6001600160a01b0391909116815260200190565b600060018060a01b0380861683526020818616818501526060604085015284519150816060850152825b82811015610ca357858101820151858201608001528101610c87565b82811115610cb45783608084870101525b5050601f01601f191691909101608001949350505050565b901515815260200190565b90815260200190565b60006060820160ff86168352602060ff86168185015260406060818601528286518085526080870191508388019450855b81811015610d4157855180516001600160a01b031684528501511515858401529484019491830191600101610d11565b50909998505050505050505050565b60405181810167ffffffffffffffff81118282101715610d6c57fe5b604052919050565b6001600160a01b038116811461040657600080fdfe608060405234801561001057600080fd5b50610923806100206000396000f3fe6080604052600436106100745760003560e01c80638f2839701161004e5780638f2839701461017c578063cf7a1d77146101af578063d1f578941461026e578063f851a4401461032457610083565b80633659cfe6146100985780634f1ef286146100cb5780635c60da1b1461014b57610083565b3661008357610081610339565b005b34801561008f57600080fd5b50610081610339565b3480156100a457600080fd5b50610081600480360360208110156100bb57600080fd5b50356001600160a01b0316610353565b610081600480360360408110156100e157600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561010c57600080fd5b82018360208201111561011e57600080fd5b8035906020019184600183028401116401000000008311171561014057600080fd5b50909250905061038d565b34801561015757600080fd5b5061016061043a565b604080516001600160a01b039092168252519081900360200190f35b34801561018857600080fd5b506100816004803603602081101561019f57600080fd5b50356001600160a01b0316610477565b610081600480360360608110156101c557600080fd5b6001600160a01b0382358116926020810135909116918101906060810160408201356401000000008111156101f957600080fd5b82018360208201111561020b57600080fd5b8035906020019184600183028401116401000000008311171561022d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610531945050505050565b6100816004803603604081101561028457600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156102af57600080fd5b8201836020820111156102c157600080fd5b803590602001918460018302840111640100000000831117156102e357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610561945050505050565b34801561033057600080fd5b50610160610641565b61034161066c565b61035161034c610674565b610699565b565b61035b6106bd565b6001600160a01b0316336001600160a01b031614156103825761037d816106e2565b61038a565b61038a610339565b50565b6103956106bd565b6001600160a01b0316336001600160a01b0316141561042d576103b7836106e2565b6000836001600160a01b031683836040518083838082843760405192019450600093509091505080830381855af49150503d8060008114610414576040519150601f19603f3d011682016040523d82523d6000602084013e610419565b606091505b505090508061042757600080fd5b50610435565b610435610339565b505050565b60006104446106bd565b6001600160a01b0316336001600160a01b0316141561046c57610465610674565b9050610474565b610474610339565b90565b61047f6106bd565b6001600160a01b0316336001600160a01b03161415610382576001600160a01b0381166104dd5760405162461bcd60e51b815260040180806020018281038252603681526020018061087d6036913960400191505060405180910390fd5b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6105066106bd565b604080516001600160a01b03928316815291841660208301528051918290030190a161037d81610722565b600061053b610674565b6001600160a01b03161461054e57600080fd5b6105588382610561565b61043582610722565b600061056b610674565b6001600160a01b03161461057e57600080fd5b61058782610746565b80511561063d576000826001600160a01b0316826040518082805190602001908083835b602083106105ca5780518252601f1990920191602091820191016105ab565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d806000811461062a576040519150601f19603f3d011682016040523d82523d6000602084013e61062f565b606091505b505090508061043557600080fd5b5050565b600061064b6106bd565b6001600160a01b0316336001600160a01b0316141561046c576104656106bd565b6103516107ae565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b3660008037600080366000845af43d6000803e8080156106b8573d6000f35b3d6000fd5b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b6106eb81610746565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610355565b61074f8161080e565b61078a5760405162461bcd60e51b815260040180806020018281038252603b8152602001806108b3603b913960400191505060405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b6107b66106bd565b6001600160a01b0316336001600160a01b031614156108065760405162461bcd60e51b815260040180806020018281038252603281526020018061084b6032913960400191505060405180910390fd5b610351610351565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081811480159061084257508115155b94935050505056fe43616e6e6f742063616c6c2066616c6c6261636b2066756e6374696f6e2066726f6d207468652070726f78792061646d696e43616e6e6f74206368616e6765207468652061646d696e206f6620612070726f787920746f20746865207a65726f206164647265737343616e6e6f742073657420612070726f787920696d706c656d656e746174696f6e20746f2061206e6f6e2d636f6e74726163742061646472657373a2646970667358221220bde8e9c96b8d3ffcd547b02f95c6dc560f1a05011a8dd6c847e5a9a2cff37c7364736f6c63430007040033608060405234801561001057600080fd5b50610be7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063c012841d1161005b578063c012841d146100f4578063c6414eee14610109578063c78643f41461011c578063dde43cba1461012457610088565b80635c1952171461008d5780636140461c146100b657806398d5fdca146100cb578063b70a37f5146100d3575b600080fd5b6100a061009b36600461098b565b61012c565b6040516100ad9190610b17565b60405180910390f35b6100be610168565b6040516100ad9190610b30565b6100a0610176565b6100e66100e136600461098b565b610185565b6040516100ad929190610aa9565b6101076101023660046109dc565b6101ba565b005b6100a06101173660046109bb565b610382565b6100be6103f0565b6100a06103f9565b6034546000906101629061014f9061014a90859060ff1660126103fe565b610466565b603454601290610100900460ff166103fe565b92915050565b603454610100900460ff1681565b6000610180610547565b905090565b6033818154811061019557600080fd5b6000918252602090912001546001600160a01b0381169150600160a01b900460ff1682565b600054610100900460ff16806101d357506101d3610575565b806101e1575060005460ff16155b61021c5760405162461bcd60e51b815260040180806020018281038252602e815260200180610b63602e913960400191505060405180910390fd5b600054610100900460ff16158015610247576000805460ff1961ff0019909116610100171660011790555b61024f610586565b60005b82518110156103475760006001600160a01b031683828151811061027257fe5b6020026020010151600001516001600160a01b03161415604051806040016040528060138152602001724665656420697320416464726573735a65726f60681b815250906102dc5760405162461bcd60e51b81526004016102d39190610ac4565b60405180910390fd5b5060338382815181106102eb57fe5b60209081029190910181015182546001818101855560009485529383902082519101805492909301511515600160a01b0260ff60a01b196001600160a01b039092166001600160a01b0319909316929092171617905501610252565b506034805460ff8581166101000261ff001991881660ff199093169290921716179055801561037c576000805461ff00191690555b50505050565b603454600090819061039a90859060ff1660126103fe565b905060006103aa61014f83610466565b905060008482106103c4576103bf8286610628565b6103ce565b6103ce8583610628565b90506103e6826103e08361271061066a565b906106c3565b9695505050505050565b60345460ff1681565b602281565b8260ff80831690841610156104315761042a61042060ff848116908616610628565b8290600a0a61066a565b905061045f565b8160ff168360ff16111561045f5761045c61045260ff858116908516610628565b8290600a0a6106c3565b90505b9392505050565b8060005b603354811015610541576033818154811061048157fe5b600091825260209091200154603380546001600160a01b03909216916311106ee2918591859081106104af57fe5b60009182526020909120015460405160e084901b6001600160e01b03191681526104e79291600160a01b900460ff1690600401610b20565b60206040518083038186803b1580156104ff57600080fd5b505afa158015610513573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053791906109a3565b915060010161046a565b50919050565b60008061055b670de0b6b3a7640000610466565b905061056f81670de0b6b3a7640000610705565b91505090565b600061058030610844565b15905090565b600054610100900460ff168061059f575061059f610575565b806105ad575060005460ff16155b6105e85760405162461bcd60e51b815260040180806020018281038252602e815260200180610b63602e913960400191505060405180910390fd5b600054610100900460ff16158015610613576000805460ff1961ff0019909116610100171660011790555b8015610625576000805461ff00191690555b50565b600061045f83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061084e565b60008261067957506000610162565b8282028284828161068657fe5b041461045f5760405162461bcd60e51b8152600401808060200182810382526021815260200180610b916021913960400191505060405180910390fd5b600061045f83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506108a8565b60408051808201909152600381526226a22d60e91b6020820152600090826107ab5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610770578181015183820152602001610758565b50505050905090810190601f16801561079d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506040805180820190915260038152624d4d4f60e81b60208201526002830490670de0b6b3a76400008219048511156108255760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b508281670de0b6b3a76400008602018161083b57fe5b04949350505050565b803b15155b919050565b600081848411156108a05760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b505050900390565b600081836108f75760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610770578181015183820152602001610758565b50600083858161090357fe5b0495945050505050565b60006040828403121561091e578081fd5b6040516040810181811067ffffffffffffffff8211171561093b57fe5b60405290508082356001600160a01b038116811461095857600080fd5b81526020830135801515811461096d57600080fd5b6020919091015292915050565b803560ff8116811461084957600080fd5b60006020828403121561099c578081fd5b5035919050565b6000602082840312156109b4578081fd5b5051919050565b600080604083850312156109cd578081fd5b50508035926020909101359150565b6000806000606084860312156109f0578081fd5b6109f98461097a565b92506020610a0881860161097a565b925060408086013567ffffffffffffffff80821115610a25578485fd5b818801915088601f830112610a38578485fd5b813581811115610a4457fe5b610a518586830201610b3e565b8181528581019250838601858302850187018c1015610a6e578788fd5b8794505b82851015610a9857610a848c8261090d565b845260019490940193928601928501610a72565b508096505050505050509250925092565b6001600160a01b039290921682521515602082015260400190565b6000602080835283518082850152825b81811015610af057858101830151858201604001528201610ad4565b81811115610b015783604083870101525b50601f01601f1916929092016040019392505050565b90815260200190565b9182521515602082015260400190565b60ff91909116815260200190565b60405181810167ffffffffffffffff81118282101715610b5a57fe5b60405291905056fe496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a2646970667358221220d79d511e18909b9c56623758118d605c2968821b65cfceccecd382f20fcf333164736f6c634300070400334f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564a2646970667358221220545ce68863cdd7a9e22bb31cc3fcf66ef14bea37e7afce1bb16bf7a0f6adc44564736f6c63430007040033";
