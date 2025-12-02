import { AocPuzzle } from "@/aoc-puzzle";
import {
  cell,
  Direction,
  GridPosition,
  isValidPosition,
  rotate90,
  shiftPosition,
} from "@/lib/grid";

const silver = (input: string): number => {
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

const gold = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));
  let pos: GridPosition = { row: 0, col: 0 };
  let dir: Direction = "up";

  pos.row = grid.findIndex((row) => row.includes("^"));
  pos.col = grid[pos.row].indexOf("^");

  const originalPos = { ...pos };
  const path: PathStep[] = [];

  while (isValidPosition(grid, pos)) {
    const nextPos = shiftPosition(pos, dir);
    if (cell(grid, nextPos) === "#") {
      dir = rotate90(dir);
    } else {
      path.push({
        pos: { ...pos },
        dir,
        possibleBlockLocation:
          (pos.col !== originalPos.col || pos.row !== originalPos.row) &&
          !path.some((p) => p.pos.row === pos.row && p.pos.col === pos.col),
      });
      pos = nextPos;
    }
  }

  let count = 0;
  for (let i = 0; i < path.length; i++) {
    if (path[i].possibleBlockLocation) {
      const testGrid = grid.map((row) => [...row]);
      testGrid[path[i - 1].pos.row][path[i - 1].pos.col] = ".";
      testGrid[path[i].pos.row][path[i].pos.col] = "#";

      if (isLooping(testGrid, path[i - 1].pos, path[i - 1].dir)) {
        count++;
      }
    }
    grid[path[i].pos.row][path[i].pos.col] += path[i].dir;
  }

  return count;
};

export const day06 = new AocPuzzle(2024, 6, silver, gold);

type PathStep = {
  pos: GridPosition;
  dir: Direction;
  possibleBlockLocation: boolean;
};

const isLooping = (
  grid: string[][],
  position: GridPosition,
  dir: Direction
): boolean => {
  let pos = { ...position };
  while (isValidPosition(grid, pos)) {
    if (cell(grid, pos)?.includes(dir)) {
      return true;
    }

    const nextPos = shiftPosition(pos, dir);

    if (cell(grid, nextPos) === "#") {
      dir = rotate90(dir);
    } else {
      grid[pos.row][pos.col] += dir;
      pos = nextPos;
    }
  }
  return false;
};
