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

type PriceChange = { delta: number; price: number };
type PriceList = {
  changes: PriceChange[];
  deltaString: string;
};

export const prices = (initialSecret: number, n: number): PriceList => {
  let secret = initialSecret;
  let prevPrice = secret % 10;
  const prices: PriceChange[] = [];
  for (let i = 0; i < n; i++) {
    secret = nextSecret(secret);
    const price = secret % 10;
    prices.push({ delta: price - prevPrice, price });
    prevPrice = price;
  }
  return {
    changes: prices,
    deltaString: prices
      .map((p) => (p.delta >= 0 ? `+${p.delta}` : `${p.delta}`))
      .join(""),
  };
};

const validSequences = (): string[] => {
  const result: string[] = [];
  for (let a = -9; a < 10; a++) {
    for (let b = -9; b < 10; b++) {
      if (Math.abs(a + b) >= 10) {
        continue;
      }
      for (let c = -9; c < 10; c++) {
        if (Math.abs(a + b + c) >= 10) {
          continue;
        }
        for (let d = -9; d < 10; d++) {
          if (Math.abs(a + b + c + d) < 10) {
            result.push(
              [a, b, c, d].map((x) => (x >= 0 ? `+${x}` : `${x}`)).join("")
            );
          }
        }
      }
    }
  }
  return result;
};

const getPriceAtFirstSequence = (prices: PriceList, sequence: string) => {
  const idx = prices.deltaString.indexOf(sequence);
  if (idx !== -1) {
    return prices.changes[idx / 2 + 3].price;
  }
  return 0;
};
