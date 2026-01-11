import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return input.split("").reduce((floor, char) => {
    if (char === "(") {
      return floor + 1;
    } else {
      return floor - 1;
    }
  }, 0);
};

const gold = (input: string): number => {
  let i = 0;
  let floor = 0;
  while (floor >= 0) {
    const char = input[i];
    if (char === "(") {
      floor += 1;
    } else {
      floor -= 1;
    }
    i += 1;
  }
  return i;
};

export const day01 = new AocPuzzle(2015, 1, silver, gold);
