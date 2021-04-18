import BigNumber from "bignumber.js";
import { BigNumberish } from "ethers";
import * as ethers from "ethers";

export const PERCENTAGE_FACTOR = "100";
export const ONE_HUNDRED_PERCENTAGE_FACTOR = "10000";
export const HALF_PERCENTAGE = "5000";
export const WAD = Math.pow(10, 18).toString();
export const HALF_WAD = new BigNumber(WAD).multipliedBy(0.5).toString();
export const RAY = new BigNumber(10).exponentiatedBy(27).toFixed();
export const HALF_RAY = new BigNumber(RAY).multipliedBy(0.5).toFixed();
export const WAD_RAY_RATIO = Math.pow(10, 9).toString();
export const oneEther = new BigNumber(Math.pow(10, 18));
export const oneRay = new BigNumber(Math.pow(10, 27));
export const MAX_UINT_AMOUNT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const ONE_YEAR = "31536000";
export const ONE_HOUR = "3600";

export const bn = (n: BigNumber.Value, base?: number) => new BigNumber(n, base);
export const ray = (n: BigNumber.Value, base?: number) =>
  bn(RAY).multipliedBy(bn(n, base));
export const percent = (n: BigNumber.Value, base?: number) =>
  bn(PERCENTAGE_FACTOR).multipliedBy(bn(n, base));
export const wad = (n: BigNumber.Value, base?: number) =>
  bn(WAD).multipliedBy(bn(n, base));
export const amount = (n: BigNumber.Value, decimals = 18, base?: number) =>
  bn(10).pow(decimals).multipliedBy(bn(n, base));
export const toBN = (value: BigNumberish) =>
  bn(ethers.BigNumber.from(value).toString());

declare module "bignumber.js" {
  interface BigNumber {
    str: () => string;
    ray: () => BigNumber;
    wad: () => BigNumber;
    halfRay: () => BigNumber;
    halfWad: () => BigNumber;
    halfPercentage: () => BigNumber;
    wadMul: (a: BigNumber) => BigNumber;
    wadDiv: (a: BigNumber) => BigNumber;
    rayMul: (a: BigNumber) => BigNumber;
    rayDiv: (a: BigNumber) => BigNumber;
    percentMul: (a: BigNumber) => BigNumber;
    percentDiv: (a: BigNumber) => BigNumber;
    rayToWad: () => BigNumber;
    wadToRay: () => BigNumber;

    sub: (n: BigNumber.Value) => BigNumber;
    add: (n: BigNumber.Value) => BigNumber;
    mul: (n: BigNumber.Value) => BigNumber;
  }
}

BigNumber.prototype.valueOf = function (): string {
  return this.toFixed();
};

BigNumber.prototype.add = function (n: BigNumber.Value): BigNumber {
  return this.plus(n);
};
BigNumber.prototype.sub = function (n: BigNumber.Value): BigNumber {
  return this.minus(n);
};
BigNumber.prototype.mul = function (n: BigNumber.Value): BigNumber {
  return this.multipliedBy(n);
};

BigNumber.prototype.str = function (): string {
  return this.decimalPlaces(0, BigNumber.ROUND_DOWN).toFixed();
};

BigNumber.prototype.ray = (): BigNumber => {
  return new BigNumber(RAY).decimalPlaces(0);
};
BigNumber.prototype.wad = (): BigNumber => {
  return new BigNumber(WAD).decimalPlaces(0);
};

BigNumber.prototype.halfRay = (): BigNumber => {
  return new BigNumber(HALF_RAY).decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.halfWad = (): BigNumber => {
  return new BigNumber(HALF_WAD).decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.wadMul = function (b: BigNumber): BigNumber {
  return this.halfWad()
    .plus(this.multipliedBy(b))
    .div(WAD)
    .decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.wadDiv = function (a: BigNumber): BigNumber {
  const halfA = a.div(2).decimalPlaces(0, BigNumber.ROUND_DOWN);

  return halfA
    .plus(this.multipliedBy(WAD))
    .div(a)
    .decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.rayMul = function (a: BigNumber): BigNumber {
  return this.halfRay()
    .plus(this.multipliedBy(a))
    .div(RAY)
    .decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.rayDiv = function (a: BigNumber): BigNumber {
  const halfA = a.div(2).decimalPlaces(0, BigNumber.ROUND_DOWN);

  return halfA
    .plus(this.multipliedBy(RAY))
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .div(a)
    .decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.rayToWad = function (): BigNumber {
  const halfRatio = new BigNumber(WAD_RAY_RATIO).div(2);

  return halfRatio
    .plus(this)
    .div(WAD_RAY_RATIO)
    .decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.wadToRay = function (): BigNumber {
  return this.multipliedBy(WAD_RAY_RATIO).decimalPlaces(
    0,
    BigNumber.ROUND_DOWN
  );
};

BigNumber.prototype.halfPercentage = (): BigNumber => {
  return new BigNumber(HALF_PERCENTAGE).decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.percentMul = function (b: BigNumber): BigNumber {
  return this.halfPercentage()
    .plus(this.multipliedBy(b))
    .div(PERCENTAGE_FACTOR)
    .decimalPlaces(0, BigNumber.ROUND_DOWN);
};

BigNumber.prototype.percentDiv = function (a: BigNumber): BigNumber {
  const halfA = a.div(2).decimalPlaces(0, BigNumber.ROUND_DOWN);

  return halfA
    .plus(this.multipliedBy(PERCENTAGE_FACTOR))
    .div(a)
    .decimalPlaces(0, BigNumber.ROUND_DOWN);
};
