import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let sum = 0;
  let value = input.charAt(0);
  input += value;

  for (let i = 1; i < input.length; i++) {
    const nextValue = input.charAt(i);
    if (nextValue === value) {
      sum += Number(value);
    }
    value = nextValue;
  }
  return sum;
};

const gold = (input: string): number => {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const j = (i + input.length / 2) % input.length;
    if (input.charAt(i) === input.charAt(j)) {
      sum += Number(input.charAt(i));
    }
  }
  return sum;
};

export const day01 = new AocPuzzle(2017, 1, silver, gold);
