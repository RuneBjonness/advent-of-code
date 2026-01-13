import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const elves = parseElves(input);

  return Math.max(...elves);
};

const gold = (input: string): number => {
  const elves = parseElves(input);
  elves.sort((a, b) => b - a);

  return elves[0] + elves[1] + elves[2];
};

const both = (input: string): [number, number] => {
  const elves = parseElves(input);
  elves.sort((a, b) => b - a);

  return [elves[0], elves[0] + elves[1] + elves[2]];
};

export const day01 = new AocPuzzle(2022, 1, silver, gold, both);

const parseElves = (input: string): number[] => {
  return input
    .split("\n\n")
    .map((block) => block.split("\n").map(Number))
    .map((calories) => calories.reduce((a, b) => a + b, 0));
};
