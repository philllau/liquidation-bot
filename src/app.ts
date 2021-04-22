import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { run } from "./monitor"
import { Router__factory } from "./types";


const [, , providerUrl, routerAddress, multicall, sleepMs] = process.argv;
const { PRIVATE_KEY, pm_id, instances } = process.env;

const dispatchSize = instances ? parseInt(instances) : 1;
const dispatchId = pm_id ? parseInt(pm_id) : 0;

console.log({
  providerUrl,
  routerAddress,
  sleepMs,
  PRIVATE_KEY,
  dispatchId,
  dispatchSize,
});

const provider = new JsonRpcProvider(providerUrl);
const signer = new Wallet(PRIVATE_KEY!, provider);

console.log({ signer: signer.address });
const router = new Router__factory()
  .attach(routerAddress)
  .connect(provider)
  .connect(signer);

run({
  provider,
  providerUrl,
  signer,
  router,
  multicall,
  sleep: parseInt(sleepMs || "1000"),
  // startBlock: 6506800,
  startBlock: 6503236,
  dispatchId,
  dispatchSize,
});
// import { Wallet } from "@ethersproject/wallet";
// import "reflect-metadata";
// import { connect } from "./db/datastore";
// import { Position, Token } from "./db/models";
// import { amount, ray } from "./math";

// import data from "./wowswap.json";

// async function run() {
//   const connection = connect(
//     `.snapshots/instance-${Math.random().toString(32).substr(2)}`
//   );

//   const repositoryOfPosition = connection.getRepository(Position);
//   const repositoryOfToken = connection.getRepository(Token);

//   const wallets = Array(10)
//     .fill(0)
//     .map(() => Wallet.createRandom());

//   const matic = {
//     lendables: [
//       "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
//       "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
//       "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
//     ],
//     tradables: [
//       "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
//       "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
//       "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
//       "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
//       "0x831753dd7087cac61ab5644b308642cc1c33dc13",
//       "0x840195888db4d6a99ed9f73fcd3b225bb3cb1a79",
//       "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
//       "0xd85d1e945766fea5eda9103f918bd915fbca63e6",
//       "0x42435f467d33e5c4146a4e8893976ef12bbce762",
//       "0x8a2870fb69a90000d6439b7adfb01d4ba383a415",
//     ],
//   };

//   await Promise.all(
//     wallets
//       .map((random, index) => {
//         const instance = new Position();
//         instance.amount = amount(index * 100);
//         instance.value = amount("2.1");
//         instance.currentDebt = amount("2.0423");
//         instance.principalDebt = amount("1.9");
//         instance.rate = ray("0.00032");
//         instance.selfValue = amount("1.2");
//         instance.trader = random.address;
//         instance.lendable = matic.lendables[index % matic.lendables.length];
//         instance.tradable = matic.tradables[index % matic.tradables.length];
//         instance.pair = "0xea53f634bd4bb113ee55ea679f7825d2a0dfd4a8";
//         instance.updateAt = index * 10000 + ~~(Math.random() * 100);
//         instance.currentCost = amount(Math.random());
//         instance.liquidationCost = amount(Math.random());
//         return instance;
//       })
//       .map(repositoryOfPosition.put.bind(repositoryOfPosition))
//   );

//   const instances = wallets.map((random, index) => {
//     const instance = new Position();
//     instance.amount = amount(index * 100);
//     instance.value = amount("2.1");
//     instance.currentDebt = amount("2.0423");
//     instance.principalDebt = amount("1.9");
//     instance.rate = ray("0.00032");
//     instance.selfValue = amount("1.2");
//     instance.trader = random.address;
//     instance.lendable = matic.lendables[index % matic.lendables.length];
//     instance.tradable = matic.tradables[index % matic.tradables.length];
//     instance.pair = "0xea53f634bd4bb113ee55ea679f7825d2a0dfd4a8";
//     instance.updateAt = index * 10000 + ~~(Math.random() * 100);
//     instance.currentCost = amount(Math.random());
//     instance.liquidationCost = amount(Math.random());
//     return instance;
//   });

//   await Promise.all(
//     instances.map(repositoryOfPosition.put.bind(repositoryOfPosition))
//   );

//   const tokens = data.tokens.filter(w => w.chainId === 56).map(def => {
//     const instance = new Token();
//     instance.address = def.address;
//     instance.decimals = def.decimals;
//     instance.name = def.name;
//     instance.symbol = def.symbol;
//     return instance;
//   })
  
//   await Promise.all(tokens.map(repositoryOfToken.put.bind(repositoryOfToken)))
//   // console.log(await repositoryOfPosition.get(instances[5].id));

//   // console.log(
//   //   await repositoryOfPosition.find("lendable", {
//   //     eq: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
//   //   })
//   // );
//   // console.log(
//   //   await repositoryOfPosition
//   //     .find("amount", { gt: amount(500) })
//   //     .then((found) => found.map((pos) => classToPlain(pos)))
//   // );

//   console.log(
//     await repositoryOfPosition
//       .find("health", {
//         $gte: ray(0),
//       })
//       .then((found) => found.map((pos) => pos.toString()))
//   );

//   console.log("UNHEALTH");

//   console.log(
//     await repositoryOfPosition
//       .find("health", ray(0))
//       .then((found) => found.map((pos) => pos.toString()))
//   );

//   console.log(
//     await repositoryOfToken.find("symbol", "WOW")
//   )
// }

// run();
