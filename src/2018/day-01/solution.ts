import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return input.split("\n").reduce((acc, v) => acc + Number(v), 0);
};

const gold = (input: string): number => {
  const changes = input.split("\n").map((v) => Number(v));
  const seen = new Set<number>([0]);
  let frequency = 0;

  while (true) {
    for (const change of changes) {
      frequency += change;
      if (seen.has(frequency)) {
        return frequency;
      }
      seen.add(frequency);
    }
  }
};

export const day01 = new AocPuzzle(2018, 1, silver, gold);
