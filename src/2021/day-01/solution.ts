import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const numbers = input.split("\n").map(Number);
  return increaseCount(numbers, 1);
};

const gold = (input: string): number => {
  const numbers = input.split("\n").map(Number);
  return increaseCount(numbers, 3);
};

export const day01 = new AocPuzzle(2021, 1, silver, gold);

const increaseCount = (series: number[], chunkSize: number) => {
  let count = 0;
  for (let i = chunkSize; i < series.length; i++) {
    if (series[i] > series[i - chunkSize]) {
      count++;
    }
  }
  return count;
};
