import { DayEntry } from "../aoc-day-entry";
import {
  cell,
  Direction,
  GridPosition,
  isValidPosition,
  rotate90,
  shiftPosition,
} from "../tools/grid";
import { input } from "./input";

export const silver = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));
  let pos: GridPosition = { row: 0, col: 0 };
  let dir: Direction = "up";

  pos.row = grid.findIndex((row) => row.includes("^"));
  pos.col = grid[pos.row].indexOf("^");

  while (isValidPosition(grid, pos)) {
    const nextPos = shiftPosition(pos, dir);
    if (cell(grid, nextPos) === "#") {
      dir = rotate90(dir);
    } else {
      grid[pos.row][pos.col] = "X";
      pos = nextPos;
    }
  }

  return grid.flat().filter((c) => c === "X").length;
};

export const gold = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));
  let pos: GridPosition = { row: 0, col: 0 };
  let dir: Direction = "up";

  pos.row = grid.findIndex((row) => row.includes("^"));
  pos.col = grid[pos.row].indexOf("^");

  const originalPos = { ...pos };
  const path: GridPosition[] = [];

  while (isValidPosition(grid, pos)) {
    const nextPos = shiftPosition(pos, dir);
    if (cell(grid, nextPos) === "#") {
      dir = rotate90(dir);
    } else {
      if (
        (pos.col !== originalPos.col || pos.row !== originalPos.row) &&
        !path.some((p) => p.row === pos.row && p.col === pos.col)
      ) {
        path.push({ ...pos });
      }

      pos = nextPos;
    }
  }

  let count = 0;

  for (let i = 0; i < path.length; i++) {
    const testGrid = grid.map((row) => [...row]);
    testGrid[path[i].row][path[i].col] = "#";

    if (isLooping(testGrid, originalPos, "up")) {
      count++;
    }
  }

  return count;
};

const isLooping = (
  grid: string[][],
  position: GridPosition,
  dir: Direction
): boolean => {
  let pos = { ...position };
  let safetyCounter = 7000;
  while (isValidPosition(grid, pos) && safetyCounter > 0) {
    const nextPos = shiftPosition(pos, dir);
    if (cell(grid, nextPos) === "#") {
      dir = rotate90(dir);
      if (cell(grid, shiftPosition(pos, dir))?.includes(dir)) {
        return true;
      }
    } else {
      grid[pos.row][pos.col] += dir;
      pos = nextPos;
    }
    safetyCounter--;
  }

  return safetyCounter <= 0;
};

export const day06: DayEntry = {
  silver: () => silver(input),
  gold: () => gold(input),
};
