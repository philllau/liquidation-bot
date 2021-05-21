import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { run } from "./monitor"
import { Router__factory } from "./types";


const [, , providerUrl, routerAddress, multicall, sleepMs] = process.argv;
const { PRIVATE_KEY, pm_id, instances } = process.env;

const dispatchSize = instances ? parseInt(instances) : 1;
const dispatchId = pm_id ? parseInt(pm_id) : 0;

const provider = new JsonRpcProvider(providerUrl);
const signer = new Wallet(PRIVATE_KEY!, provider);

const router = new Router__factory()
  .attach(routerAddress)
  .connect(provider)
  .connect(signer);

run({
  provider,
  providerUrl,
  covalentAPI: "ckey_44edb98eba8941749fba9b9b9eb",
  signer,
  router,
  multicall,
  sleep: parseInt(sleepMs || "1000"),
  startBlock: 6503236,
  dispatchId,
  dispatchSize,
});


