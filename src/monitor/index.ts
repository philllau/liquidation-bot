import { Observable } from "observable-fns";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Signer, Wallet } from "ethers";
import {
  PairFactory,
  PairFactory__factory,
  PancakeFactory,
  PancakeFactory__factory,
  PancakeRouter01,
  PancakeRouter01__factory,
  ReserveFactory,
  ReserveFactory__factory,
  Router,
} from "../types";
import { DatastoreConnection } from "../db/connection";
import { Multisender } from "./multisender";
import { TokenMonitor } from "./TokenMonitor";
import { connect } from "../db/datastore";
import { HeightMonitor } from "./HeightMonitor";
import { AbstractMonitor } from "./AbstractMonitor";
import { PairMonitor } from "./PairMonitor";
import { PositionMonitor } from "./PositionMonitor";

export type Ctor<T> = new (context: ExecutionContext) => T;

export type InitializeParams = Readonly<{
  dispatchId: number;
  dispatchSize: number;
  provider: JsonRpcProvider;
  providerUrl: string;
  signer: Signer;
  multicall: string;
  router: Router;
  sleep: number;
  startBlock: number;
}>;

const monitors = [
  HeightMonitor,
  TokenMonitor,
  PairMonitor,
  PositionMonitor,
] as const;

type InstanceType<T> = T extends Ctor<infer TInstance> ? TInstance : never;

type ChannelType<T> = T extends Ctor<AbstractMonitor<infer TChannel>>
  ? TChannel
  : never;

export class ExecutionContext implements InitializeParams {
  get dispatchId() {
    return this.params.dispatchId;
  }
  get dispatchSize() {
    return this.params.dispatchSize;
  }
  get provider() {
    return this.params.provider;
  }
  get providerUrl() {
    return this.params.providerUrl;
  }
  get signer() {
    return this.params.signer;
  }
  get multicall() {
    return this.params.multicall;
  }
  get router() {
    return this.params.router;
  }
  get sleep() {
    return this.params.sleep;
  }
  get startBlock() {
    return this.params.startBlock;
  }

  monitors: {
    [key: number]: InstanceType<typeof monitors[typeof key]>;
  } = {};

  channels: {
    [key: number]: Promise<
      Observable<ChannelType<typeof monitors[typeof key]>>
    >;
  } = {};

  db!: DatastoreConnection;
  pairFactory!: PairFactory;
  reserveFactory!: ReserveFactory;
  swapFactory!: PancakeFactory;
  swapRouter!: PancakeRouter01;
  sender!: Multisender;

  constructor(private params: InitializeParams) {}

  async run() {
    this.db = connect(`.snapshot/instance-${this.dispatchId}`);

    this.pairFactory = PairFactory__factory.connect(
      await this.router.pairFactory(),
      this.provider
    ).connect(this.signer);

    this.reserveFactory = ReserveFactory__factory.connect(
      await this.router.reserveFactory(),
      this.provider
    ).connect(this.signer);

    this.swapFactory = PancakeFactory__factory.connect(
      await this.router.swapFactory(),
      this.provider
    ).connect(this.signer);

    this.swapRouter = PancakeRouter01__factory.connect(
      await this.router.swapRouter(),
      this.provider
    ).connect(this.signer);

    this.runMonitor(HeightMonitor);
    this.sender = new Multisender(this, this.multicall);
    this.runMonitor(TokenMonitor);
    this.runMonitor(PairMonitor);
    this.runMonitor(PositionMonitor);
  }

  async runMonitor<T extends typeof monitors[number]>(ctor: T) {
    const index = monitors.findIndex((monitorCtor) => monitorCtor === ctor);
    if (index < 0) {
      throw new Error(`Monitor of ${ctor.name} not found`);
    }

    this.channels[index] = this.getMonitor(ctor).run() as Promise<
      Observable<ChannelType<T>>
    >;
  }

  getMonitor<T extends typeof monitors[number]>(ctor: T): InstanceType<T> {
    const index = monitors.findIndex((monitorCtor) => monitorCtor === ctor);

    if (index < 0) {
      throw new Error(`Monitor of ${ctor.name} not found`);
    }

    if (!this.monitors[index]) {
      this.monitors[index] = new ctor(this);
    }

    return this.monitors[index] as InstanceType<T>;
  }

  getChannel<T extends typeof monitors[number]>(
    ctor: T
  ): Promise<Observable<ChannelType<T>>> {
    const index = monitors.findIndex((monitorCtor) => monitorCtor === ctor);

    if (index < 0) {
      throw new Error(`Monitor of ${ctor.name} not found`);
    }

    const channel = this.channels[index];
    return channel as Promise<Observable<ChannelType<T>>>;
  }

  getNewConnection() {
    const provider = new JsonRpcProvider(this.providerUrl);
    const signer = Wallet.createRandom().connect(provider);

    return signer;
  }
}

export async function run(params: InitializeParams) {
  const context = new ExecutionContext(params);
  await context.run();
}
