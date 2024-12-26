import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return input.split("\n").reduce((acc, seed) => {
    return acc + nthSecret(Number(seed), 2000);
  }, 0);
};

export const gold = (input: string): number => {
  return Number(input) * 2;
};

export const day22 = new AocPuzzle(2024, 22, silver, gold, input);

const mix = (val: number, secret: number) => (val ^ secret) >>> 0;
const prune = (secret: number) => secret % 16777216;
const f1 = (val: number) => prune(mix(val * 64, val));
const f2 = (val: number) => prune(mix(Math.floor(val / 32), val));
const f3 = (val: number) => prune(mix(val * 2048, val));

export const nextSecret = (val: number) => f3(f2(f1(val)));

export const nthSecret = (val: number, n: number) => {
  let secret = val;
  for (let i = 0; i < n; i++) {
    secret = nextSecret(secret);
  }
  return secret;
};

export const prices = (initialSecret: number, n: number) => {
  let secret = initialSecret;
  let prevPrice = secret % 10;
  const prices: number[][] = [];
  for (let i = 0; i < n; i++) {
    secret = nextSecret(secret);
    const price = secret % 10;
    prices.push([price - prevPrice, price]);
    prevPrice = price;
  }
  return prices;
};
