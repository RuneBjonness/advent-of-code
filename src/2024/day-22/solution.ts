import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return input.split("\n").reduce((acc, seed) => {
    return acc + nthSecret(Number(seed), 2000);
  }, 0);
};

export const gold = (input: string): number => {
  const seeds = input.split("\n").map(Number);
  const sequences = validSequences();
  // console.log(sequences.length);

  const buyers = seeds.map((seed) => prices(seed, 2000));

  let mostBananas = 0;
  for (const sequence of sequences) {
    const prices = buyers.map((buyer) =>
      getPriceAtFirstSequence(buyer, sequence)
    );
    const total = prices.reduce((acc, price) => acc + price, 0);

    if (total > mostBananas) {
      mostBananas = total;
      // console.log(sequence, total);
    }
  }
  return mostBananas;
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

const validSequences = (): number[][] => {
  const result: number[][] = [];
  for (let a = -9; a < 10; a++) {
    for (let b = -9; b < 10; b++) {
      for (let c = -9; c < 10; c++) {
        for (let d = -9; d < 10; d++) {
          if (Math.abs(a + b + c + d) < 10) {
            result.push([a, b, c, d]);
          }
        }
      }
    }
  }
  return result;
};

const getPriceAtFirstSequence = (prices: number[][], sequence: number[]) => {
  for (let i = 0; i < prices.length - 4; i++) {
    const [a, b, c, d] = prices.slice(i, i + 4).map((x) => x[0]);
    if (
      a === sequence[0] &&
      b === sequence[1] &&
      c === sequence[2] &&
      d === sequence[3]
    ) {
      return prices[i + 3][1];
    }
  }
  return 0;
};
