import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const program = input.split(",").map((x) => Number(x));

  program[1] = 12;
  program[2] = 2;

  return runIntcode(program)[0];
};

export const gold = (input: string): number => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const program = input.split(",").map((x) => Number(x));
      program[1] = i;
      program[2] = j;
      if (runIntcode(program)[0] === 19690720) {
        return 100 * i + j;
      }
    }
  }
  return 0;
};

export const day02 = new AocPuzzle(2019, 2, silver, gold, input);

export const runIntcode = (p: number[]) => {
  let i = 0;

  while (p[i] !== 99) {
    if (p[i] == 1) {
      p[p[i + 3]] = p[p[i + 1]] + p[p[i + 2]];
    } else if (p[i] == 2) {
      p[p[i + 3]] = p[p[i + 1]] * p[p[i + 2]];
    }
    i += 4;
  }

  return p;
};
