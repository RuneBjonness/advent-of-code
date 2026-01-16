import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const [locks, keys] = parseLocksAndKeys(input);

  let count = 0;
  keys.forEach((key) => {
    locks.forEach((lock) => {
      if (overlaps(lock, key)) {
        count++;
      }
    });
  });

  return count;
};

const gold = (_input: string): number => {
  return NaN;
};

export const day25 = new AocPuzzle(2024, 25, silver, gold);

const parseLocksAndKeys = (input: string): [number[][], number[][]] => {
  const locks: number[][] = [];
  const keys: number[][] = [];

  input.split("\n\n").map((group) => {
    const schematics = group.split("\n").map((line) => line.split(""));
    if (schematics[0][0] === "#") {
      locks.push(columnHeights(schematics.slice(1, 6)));
    } else {
      keys.push(columnHeights(schematics.slice(1, 6)));
    }
  });
  return [locks, keys];
};

const columnHeights = (input: string[][]): number[] => {
  const heights = Array(input[0].length).fill(0);

  for (let col = 0; col < input[0].length; col++) {
    heights[col] = input.reduce(
      (acc, row) => acc + (row[col] === "#" ? 1 : 0),
      0,
    );
  }

  return heights;
};

const overlaps = (lock: number[], key: number[]): boolean => {
  return lock.every((height, i) => height + key[i] <= 5);
};
