import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return input.split("\n").reduce((acc, seed) => {
    return acc + nthSecret(Number(seed), 2000);
  }, 0);
};

export const gold = (input: string): number => {
  const seeds = input.split("\n").map(Number);

  const sequencesTotals: Record<string, number> = {};
  seeds.map((seed) => sequences(seed, 2000, sequencesTotals));

  let maxTotal = 0;
  for (const seq in sequencesTotals) {
    if (sequencesTotals[seq] > maxTotal) {
      maxTotal = sequencesTotals[seq];
    }
  }
  return maxTotal;
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

export const sequences = (
  initialSecret: number,
  n: number,
  totals: Record<string, number>
): Record<string, number> => {
  let secret = initialSecret;
  let prevPrice = secret % 10;
  const sequences: Record<string, number> = {};
  let currentSequence = "";
  for (let i = 0; i < n; i++) {
    secret = nextSecret(secret);
    const price = secret % 10;
    const delta = price - prevPrice;
    currentSequence += price >= prevPrice ? `+${delta}` : `${delta}`;

    if (i > 3) {
      currentSequence = currentSequence.slice(2);
      if (!sequences[currentSequence]) {
        sequences[currentSequence] = price;
        totals[currentSequence] = (totals[currentSequence] || 0) + price;
      }
    }
    prevPrice = price;
  }
  return sequences;
};
