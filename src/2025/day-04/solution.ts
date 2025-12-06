import { AocPuzzle } from "@/aoc-puzzle";
import { directions, cell, shiftPosition } from "@/lib/grid";

const silver = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isAccessible(grid, row, col)) {
        count++;
      }
    }
  }
  return count;
};

const gold = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));

  let count = 0;
  let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (isAccessible(grid, row, col)) {
          count++;
          grid[row][col] = "x";
          hasChanged = true;
        }
      }
    }
  }

  return count;
};

export const day04 = new AocPuzzle(2025, 4, silver, gold);

const isAccessible = (grid: string[][], row: number, col: number): boolean => {
  if (grid[row][col] !== "@") {
    return false;
  }

  let adjacentCount = 0;
  for (const dir of directions) {
    const neighbor = shiftPosition({ row, col }, dir);
    if (cell(grid, neighbor) === "@") {
      adjacentCount++;
      if (adjacentCount >= 4) {
        return false;
      }
    }
  }
  return true;
};
