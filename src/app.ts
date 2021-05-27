import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { run } from "./monitor"
import { Router__factory } from "./types";


const { PRIVATE_KEY, NODE_ENDPOINT, MULTICALL_ADDRESS, ROUTER_ADDRESS, SLEEP_TIME, START_BLOCK, pm_id, instances } = process.env;

if (!NODE_ENDPOINT) throw new Error("Set NODE_ENDPOINT to run liquidator bot")
if (!MULTICALL_ADDRESS) throw new Error("Set MULTICALL_ADDRESS to run liquidator bot")
if (!ROUTER_ADDRESS) throw new Error("Set ROUTER_ADDRESS to run liquidator bot")
if (!START_BLOCK) throw new Error("Set START_BLOCK to run liquidator bot")

const dispatchSize = instances ? parseInt(instances) : 1;
const dispatchId = pm_id ? parseInt(pm_id) : 0;

const provider = new JsonRpcProvider(NODE_ENDPOINT);
const signer = new Wallet(PRIVATE_KEY!, provider);

const router = new Router__factory()
  .attach(ROUTER_ADDRESS)
  .connect(provider)
  .connect(signer);

run({
  provider,
  providerUrl: NODE_ENDPOINT,
  covalentAPI: "ckey_44edb98eba8941749fba9b9b9eb",
  signer,
  router,
  multicall: MULTICALL_ADDRESS,
  sleep: parseInt(SLEEP_TIME || "1000"),
  startBlock: parseInt(START_BLOCK),
  dispatchId,
  dispatchSize,
});


