import { DayEntry } from "../aoc-day-entry";
import { input } from "./input";

export const silver = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      count += countAllDirections(grid, row, col);
    }
  }
  return count;
};

export const gold = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));

  let count = 0;
  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      count += isXmasCenter(grid, row, col) ? 1 : 0;
    }
  }
  return count;
};

const checkRight = (grid: string[][], row: number, col: number): boolean => {
  if (col + 3 >= grid[row].length) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row][col + 1] === "M" &&
    grid[row][col + 2] === "A" &&
    grid[row][col + 3] === "S"
  );
};
const checkLeft = (grid: string[][], row: number, col: number): boolean => {
  if (col - 3 < 0) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row][col - 1] === "M" &&
    grid[row][col - 2] === "A" &&
    grid[row][col - 3] === "S"
  );
};

const checkDown = (grid: string[][], row: number, col: number): boolean => {
  if (row + 3 >= grid.length) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row + 1][col] === "M" &&
    grid[row + 2][col] === "A" &&
    grid[row + 3][col] === "S"
  );
};

const checkUp = (grid: string[][], row: number, col: number): boolean => {
  if (row - 3 < 0) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row - 1][col] === "M" &&
    grid[row - 2][col] === "A" &&
    grid[row - 3][col] === "S"
  );
};

const checkDiagonalRightDown = (
  grid: string[][],
  row: number,
  col: number
): boolean => {
  if (row + 3 >= grid.length || col + 3 >= grid[row].length) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row + 1][col + 1] === "M" &&
    grid[row + 2][col + 2] === "A" &&
    grid[row + 3][col + 3] === "S"
  );
};

const checkDiagonalLeftDown = (
  grid: string[][],
  row: number,
  col: number
): boolean => {
  if (row + 3 >= grid.length || col - 3 < 0) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row + 1][col - 1] === "M" &&
    grid[row + 2][col - 2] === "A" &&
    grid[row + 3][col - 3] === "S"
  );
};

const checkDiagonalRightUp = (
  grid: string[][],
  row: number,
  col: number
): boolean => {
  if (row - 3 < 0 || col + 3 >= grid[row].length) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row - 1][col + 1] === "M" &&
    grid[row - 2][col + 2] === "A" &&
    grid[row - 3][col + 3] === "S"
  );
};

const checkDiagonalLeftUp = (
  grid: string[][],
  row: number,
  col: number
): boolean => {
  if (row - 3 < 0 || col - 3 < 0) {
    return false;
  }
  return (
    grid[row][col] === "X" &&
    grid[row - 1][col - 1] === "M" &&
    grid[row - 2][col - 2] === "A" &&
    grid[row - 3][col - 3] === "S"
  );
};

const countAllDirections = (
  grid: string[][],
  row: number,
  col: number
): number => {
  if (grid[row][col] !== "X") {
    return 0;
  }
  const directions = [
    checkRight,
    checkLeft,
    checkDown,
    checkUp,
    checkDiagonalRightDown,
    checkDiagonalLeftDown,
    checkDiagonalRightUp,
    checkDiagonalLeftUp,
  ];
  return directions.reduce(
    (acc, check) => (check(grid, row, col) ? acc + 1 : acc),
    0
  );
};

const isXmasCenter = (grid: string[][], row: number, col: number): boolean => {
  if (
    grid[row][col] !== "A" ||
    col + 1 >= grid[row].length ||
    row + 1 >= grid.length ||
    col - 1 < 0 ||
    row - 1 < 0
  ) {
    return false;
  }

  const a = grid[row - 1][col - 1] + grid[row + 1][col + 1];
  const b = grid[row - 1][col + 1] + grid[row + 1][col - 1];

  return (a === "MS" || a === "SM") && (b === "MS" || b === "SM");
};

export const day04: DayEntry = {
  silver: () => silver(input),
  gold: () => gold(input),
};
