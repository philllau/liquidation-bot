import { run } from "./monitor"
import { init as sentryInit } from "./sentry"

const { PRIVATE_KEY, SLEEP_TIME, START_BLOCK, SENTRY_DSN } = process.env;

if (!PRIVATE_KEY) throw new Error("Set PRIVATE_KEY to run liquidator bot")

sentryInit(SENTRY_DSN, { chainId: process.env.CHAIN_ID || '56' });

const sleepTime = SLEEP_TIME ? parseInt(SLEEP_TIME, 10) : 250
const startBlock = START_BLOCK ? parseInt(START_BLOCK) : 1

run({
  covalentAPI: "ckey_44edb98eba8941749fba9b9b9eb",
  privateKey: PRIVATE_KEY,
  sleep: parseInt(SLEEP_TIME || "1000"),
  startBlock,
  sleepTime
});
