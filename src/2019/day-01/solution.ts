import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return input
    .split("\n")
    .map((x) => requiredFuel(Number(x)))
    .reduce((a, b) => a + b);
};

const gold = (input: string): number => {
  return input
    .split("\n")
    .map((x) => requiredFuel(Number(x)))
    .map((x) => x + additionalRequiredFuel(x))
    .reduce((a, b) => a + b);
};

export const day01 = new AocPuzzle(2019, 1, silver, gold);

const requiredFuel = (mass: number): number => Math.floor(mass / 3) - 2;

const additionalRequiredFuel = (fuel: number): number => {
  let total = 0;
  while (fuel > 8) {
    fuel = requiredFuel(fuel);
    total += fuel;
  }
  return total;
};
