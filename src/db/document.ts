import "reflect-metadata";
import { DatastoreCtor } from "./connection";
import { AbstractIndex, RangeIndex, UniqueIndex } from "./indexes";

export enum DatastoreMeta {
  Indexes = "datastore:indexes",
  Key = "datastore:key",
}

export enum IndexTypes {
  Unique = "UNIQUE",
  Index = "Index",
}

const IndexCtors = {
  [IndexTypes.Index]: RangeIndex,
  [IndexTypes.Unique]: UniqueIndex,
};

export type KeyDefinition = {
  size: number;
  key: string;
  transform: (v: any) => Buffer;
};

export type CommonDefinition = {
  key: string;
  type: IndexTypes;
  size: number;
  getter: (value: any) => Buffer;
};

export type IndexDefinition = {
  key: string;
  type: IndexTypes;
  size: number;
  ctor: DatastoreCtor<any>,
  getter: (value: any) => Buffer;
};

const defaultGetter = (value: any) => {
  const buf = Buffer.alloc(32, 0);
  if (typeof value === "number") {
    buf.writeFloatBE(value, 32 - 4);
  } else {
    const tmp = Buffer.from(value.toString());
    tmp.copy(
      buf,
      Math.max(0, buf.length - tmp.length),
      0,
      Math.min(tmp.length, 32)
    );
  }
  return buf;
};

const defaultKeyTransform = (size: number) => (value: any) => {
  const buf = Buffer.alloc(size, 0);
  if (typeof value === "number") {
    buf.writeFloatBE(value, size - 4);
  } else {
    const tmp = Buffer.from(value.toString());
    tmp.copy(
      buf,
      Math.max(0, buf.length - tmp.length),
      0,
      Math.min(tmp.length, size)
    );
  }
  return buf;
};

export const Key = (props?: Partial<KeyDefinition>): PropertyDecorator => (
  target,
  propertyKey
) => {
  const size = props?.size || 64;
  const key = propertyKey.toString();
  const transform = props?.transform || defaultKeyTransform(size);
  const keyDefinition: KeyDefinition = {
    size,
    key,
    transform,
  };

  Reflect.defineMetadata(DatastoreMeta.Key, keyDefinition, target);
};

export const Unique = (
  props?: Partial<Omit<CommonDefinition, "key">>
): PropertyDecorator => (target, propertyKey) =>
  GenericIndex(
    {
      ctor: target.constructor as any,
      getter: defaultGetter,
      size: 32,
      key: propertyKey.toString(),
      ...props,
      type: IndexTypes.Unique,
    },
    target
  );

export const Index = (
  props?: Partial<Omit<CommonDefinition, "key">>
): PropertyDecorator => (target, propertyKey) => {
  GenericIndex(
    {
      ctor: target.constructor as any,
      getter: defaultGetter,
      size: 32,
      key: propertyKey.toString(),
      ...props,
      type: IndexTypes.Index,
    },
    target
  );
};

const GenericIndex = (props: IndexDefinition, target: Object) => {
  const definedIndexes: AbstractIndex<any, any>[] =
    Reflect.getMetadata(DatastoreMeta.Indexes, target) || [];

  let index: AbstractIndex<any, any> = new IndexCtors[props.type](
    props.ctor,
    props.size,
    props.key,
    props.getter
  );

  Reflect.defineMetadata(
    DatastoreMeta.Indexes,
    definedIndexes.concat([index]),
    target
  );
};

export abstract class DatastoreDocument<
  TSelf extends DatastoreDocument<TSelf>
> {
  public getKeyDefinition(): KeyDefinition {
    return Reflect.getMetadata(DatastoreMeta.Key, this);
  }

  public getKeyValue(def?: KeyDefinition): any {
    def = def || this.getKeyDefinition();
    return (this as any)[def.key];
  }

  public getKey(def?: KeyDefinition, value?: any): Buffer {
    def = def || this.getKeyDefinition();
    value = value || this.getKeyValue(def);

    return def.transform(value);
  }

  public getIndexes(): AbstractIndex<TSelf, keyof TSelf>[] {
    return Reflect.getMetadata(DatastoreMeta.Indexes, this);
  }

  public getIndex<TKey extends keyof TSelf>(
    key: TKey
  ): AbstractIndex<TSelf, TKey> | undefined {
    return this.getIndexes().find(
      (index: any): index is AbstractIndex<TSelf, TKey> => index.key === key
    ) as any;
  }
}
