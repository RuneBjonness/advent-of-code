import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const grid = input.split("\n").map((x) => x.split(""));
  let splitCount = 0;

  for (let row = 1; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const prev = grid[row - 1][col];
      if (prev === "|" || prev === "S") {
        if (grid[row][col] === ".") {
          grid[row][col] = "|";
        } else if (grid[row][col] === "^") {
          grid[row][col - 1] = "|";
          grid[row][col + 1] = "|";
          splitCount++;
        }
      }
    }
  }
  return splitCount;
};

const gold = (input: string): number => {
  const grid: number[][] = input.split("\n").map((x) =>
    x.split("").map((val) => {
      if (val === ".") {
        return 0;
      } else if (val === "S") {
        return 1;
      } else {
        return -1;
      }
    })
  );

  for (let row = 1; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const prev = grid[row - 1][col];
      if (prev > 0) {
        if (grid[row][col] >= 0) {
          grid[row][col] += prev;
        } else {
          grid[row][col - 1] += prev;
          grid[row][col + 1] += prev;
        }
      }
    }
  }

  return grid.at(-1).reduce((a, b) => a + b, 0);
};

export const day07 = new AocPuzzle(2025, 7, silver, gold);
