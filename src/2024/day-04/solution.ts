import { AocPuzzle } from "@/aoc-puzzle";
import { directions, cells } from "@/lib/grid";
import { input } from "./input";

export const silver = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "X") {
        count += directions.reduce(
          (acc, dir) =>
            (acc +=
              cells(grid, { row, col }, dir, 4).join("") === "XMAS" ? 1 : 0),
          0
        );
      }
    }
  }
  return count;
};

export const gold = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));

  let count = 0;
  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      if (grid[row][col] === "A") {
        const a = grid[row - 1][col - 1] + grid[row + 1][col + 1];
        const b = grid[row - 1][col + 1] + grid[row + 1][col - 1];

        if ((a === "MS" || a === "SM") && (b === "MS" || b === "SM")) {
          count++;
        }
      }
    }
  }
  return count;
};

export const day04 = new AocPuzzle(2024, 4, silver, gold, input);
