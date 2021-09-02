import { run } from "./monitor"

const { PRIVATE_KEY, SLEEP_TIME, START_BLOCK } = process.env;

if (!PRIVATE_KEY) throw new Error("Set PRIVATE_KEY to run liquidator bot")

const sleepTime = SLEEP_TIME ? parseInt(SLEEP_TIME, 10) : 250
const startBlock = START_BLOCK ? parseInt(START_BLOCK) : 1

run({
  covalentAPI: "ckey_44edb98eba8941749fba9b9b9eb",
  privateKey: PRIVATE_KEY,
  sleep: parseInt(SLEEP_TIME || "1000"),
  startBlock,
  sleepTime
});
