import { AbstractBatch, AbstractIteratorOptions } from "abstract-leveldown";
import { classToPlain, plainToClass } from "class-transformer";
import { LevelUp } from "levelup";
import { DatastoreConnection, DatastoreCtor } from "./connection";
import { DatastoreDocument } from "./document";

type ops<TDoc extends DatastoreDocument<TDoc>, TKey extends keyof TDoc> = {
  $gt: TDoc[TKey];
  $gte: TDoc[TKey];
  $lt: TDoc[TKey];
  $lte: TDoc[TKey];
  $eq: TDoc[TKey];
};

type FieldComparator<
  TDoc extends DatastoreDocument<TDoc>,
  TKey extends keyof TDoc
> = { [key in keyof ops<TDoc, TKey>]?: ops<TDoc, TKey>[key] } | TDoc[TKey];

export class DatastoreRepository<T extends DatastoreDocument<T>> {
  private referenceInstance: T;

  constructor(
    private ctor: DatastoreCtor<T>,
    private connection: DatastoreConnection,
    private db: LevelUp
  ) {
    this.referenceInstance = new ctor();
    console.log({ connection: this.connection });
  }

  private valueToInstance(data: Buffer): T {
    return plainToClass(this.ctor, JSON.parse(data.toString()));
  }

  private instanceToValue(instance: T): Buffer {
    const plain = classToPlain(instance);
    return Buffer.from(JSON.stringify(plain));
  }

  private setIndexesOperations(instance: T): AbstractBatch[] {
    const indexes = instance.getIndexes();
    return indexes.map((index) => {
      return {
        type: "put",
        key: index.getIndexKey(instance),
        value: instance.getKey(),
      };
    });
  }

  private clearIndexesOperations(instance: T): AbstractBatch[] {
    const indexes = instance.getIndexes();
    return indexes.map((index) => {
      return {
        type: "del",
        key: index.getIndexKey(instance),
      };
    });
  }

  get(key: string | Buffer): Promise<T | undefined> {
    if (typeof key === "string") {
      key = this.referenceInstance.getKey(undefined, key);
    }

    return this.db
      .get(key)
      .then(this.valueToInstance.bind(this))
      .catch(() => undefined);
  }

  async put(instance: T): Promise<void> {
    const keyDef = instance.getKeyDefinition();
    const keyValue = instance.getKeyValue(keyDef);
    const key = instance.getKey(keyDef, keyValue);

    const operations: AbstractBatch[] = [
      {
        type: "put",
        key,
        value: this.instanceToValue(instance),
      },
    ];

    const old = await this.get(key);
    if (old) {
      operations.push(...this.clearIndexesOperations(old));
    }

    operations.push(...this.setIndexesOperations(instance));
    this.db.batch(operations);
  }

  find<TKey extends keyof T>(
    key: TKey,
    rule: FieldComparator<T, TKey>
  ): Promise<T[]> {
    const index = this.referenceInstance.getIndex(key);
    if (!index) {
      throw new Error(`Index ${key} not found in ${this.ctor.name}`);
    }

    return new Promise((resolve, reject) => {
      const keys: string[] = [];

      const options: AbstractIteratorOptions = {
        keys: true,
        values: true,
      };

      if (typeof rule === "object") {
        if ("$gt" in rule && rule.$gt) {
          options.gt = index.getLowerBound(this.referenceInstance);
          options.lt = index.getUpperBound(this.referenceInstance);
          index.setKeyMax(options.gt);
          index.setValue(options.gt, rule.$gt);
        } else if ("$gte" in rule && rule.$gte) {
          options.gte = index.getLowerBound(this.referenceInstance);
          options.lt = index.getUpperBound(this.referenceInstance);
          index.setValue(options.gte, rule.$gte);
        } else if ("$lt" in rule && rule.$lt) {
          options.gte = index.getLowerBound(this.referenceInstance);
          options.lt = index.getUpperBound(this.referenceInstance);
          index.setKeyMin(options.lt);
          index.setValue(options.le, rule.$lt);
        } else if ("$lte" in rule && rule.$lte) {
          options.gt = index.getLowerBound(this.referenceInstance);
          options.lte = index.getUpperBound(this.referenceInstance);
          index.setValue(options.le, rule.$lte);
        } else if ("$eq" in rule && rule.$eq) {
          options.gte = index.getLowerBound(this.referenceInstance);
          options.lte = index.getUpperBound(this.referenceInstance);

          const value = index.valueToBuffer(rule.$eq);
          index.setValueBuffer(options.gte, value);
          index.setValueBuffer(options.lte, value);
        } else {
          options.gte = index.getLowerBound(this.referenceInstance);
          options.lte = index.getUpperBound(this.referenceInstance);
          const value = rule as T[TKey];
          index.setValue(options.gte, value);
          index.setValue(options.lte, value);
        }
      } else {
        options.gte = index.getLowerBound(this.referenceInstance);
        options.lte = index.getUpperBound(this.referenceInstance);

        const value = rule as T[TKey];
        index.setValue(options.gte, value);
        index.setValue(options.lte, value);
      }

      this.db
        .createReadStream(options)
        .on("data", (answer) => {
          keys.push(answer.value);
        })
        .on("error", (error) => {
          reject(error);
        })
        .on("close", () => {})
        .on("end", () => {
          Promise.all(keys.map(this.get.bind(this)))
            .then((items) =>
              items.filter(
                (possibleItem): possibleItem is T =>
                  typeof possibleItem !== "undefined"
              )
            )
            .then(resolve)
            .catch(reject);
        });
    });
  }
}
