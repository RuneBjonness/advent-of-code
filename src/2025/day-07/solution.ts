import { AocPuzzle } from "@/aoc-puzzle";
import { getRowPositions } from "@/lib/grid";

const silver = (input: string): number => {
  const grid = input.split("\n").map((x) => x.split(""));
  let splitCount = 0;

  for (let row = 1; row < grid.length; row++) {
    for (const pos of getRowPositions(
      grid,
      row - 1,
      (cell) => cell === "|" || cell === "S"
    )) {
      if (grid[row][pos.col] === ".") {
        grid[row][pos.col] = "|";
      } else if (grid[row][pos.col] === "^") {
        grid[row][pos.col - 1] = "|";
        grid[row][pos.col + 1] = "|";
        splitCount++;
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
    for (const pos of getRowPositions(grid, row - 1, (cell) => cell > 0)) {
      if (grid[row][pos.col] >= 0) {
        grid[row][pos.col] += grid[row - 1][pos.col];
      } else if (grid[row][pos.col] === -1) {
        grid[row][pos.col - 1] += grid[row - 1][pos.col];
        grid[row][pos.col + 1] += grid[row - 1][pos.col];
      }
    }
  }

  return grid.at(-1).reduce((a, b) => a + b, 0);
};

export const day07 = new AocPuzzle(2025, 7, silver, gold);
