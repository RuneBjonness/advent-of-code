import { AocPuzzle } from "@/aoc-puzzle";
import { cell, getPositions } from "@/lib/grid";
import { GridPosition, shiftPosition } from "@/lib/grid-position";
import { Direction } from "@/lib/direction";

const silver = (input: string): number => {
  const sections = input.split("\n\n");
  const grid = sections[0].split("\n").map((row) => row.split(""));
  const robotPos = getPositions(grid, (x) => x === "@")[0];
  const moves = sections[1].replace(/\n/g, "").split("");

  for (const move of moves) {
    const dir = parseDirection(move);
    const nextPos = shiftPosition(robotPos, dir);
    let next = cell(grid, nextPos);
    if (next === null || next === "#") {
      continue;
    }

    let firstEmptyPos = { ...nextPos };
    while (next === "O") {
      firstEmptyPos = shiftPosition(firstEmptyPos, dir);
      next = cell(grid, firstEmptyPos);
    }
    if (next !== ".") {
      continue;
    }

    if (
      firstEmptyPos.row !== nextPos.row ||
      firstEmptyPos.col !== nextPos.col
    ) {
      grid[firstEmptyPos.row][firstEmptyPos.col] = "O";
    }

    grid[robotPos.row][robotPos.col] = ".";
    grid[nextPos.row][nextPos.col] = "@";
    robotPos.row = nextPos.row;
    robotPos.col = nextPos.col;
  }

  return getPositions(grid, (x) => x === "O")
    .map(gpsCoordinate)
    .reduce((acc, val) => acc + val, 0);
};

const gold = (input: string): number => {
  const sections = input.split("\n\n");
  const grid = sections[0].split("\n").map((row) =>
    row
      .split("")
      .map((x) => {
        switch (x) {
          case "#":
            return "##";
          case "O":
            return "[]";
          case ".":
            return "..";
          case "@":
            return "@.";
          default:
            return x;
        }
      })
      .flatMap((x) => x.split("")),
  );
  const robotPos = getPositions(grid, (x) => x === "@")[0];
  const moves = sections[1].replace(/\n/g, "").split("");

  for (const move of moves) {
    const dir = parseDirection(move);
    const nextPos = shiftPosition(robotPos, dir);
    let next = cell(grid, nextPos);
    if (next === null || next === "#") {
      continue;
    }

    let successfulMove = false;

    if (next === ".") {
      successfulMove = true;
    } else if (dir === "up" || dir === "down") {
      let row = nextPos.row;
      let boxPositions = getBoxPartPositions(grid, nextPos);
      while (true) {
        let nextRowPositions = boxPositions
          .filter((x) => x.row === row)
          .map((pos) => shiftPosition(pos, dir));
        let nextRowCells = nextRowPositions.map((pos) => cell(grid, pos));
        if (nextRowCells.some((x) => x === "#")) {
          break;
        }
        if (nextRowCells.every((x) => x === ".")) {
          successfulMove = true;
          break;
        }
        nextRowPositions
          .flatMap((pos) => getBoxPartPositions(grid, pos))
          .forEach((pos) => {
            if (
              boxPositions.every((x) => x.row !== pos.row || x.col !== pos.col)
            ) {
              boxPositions.push(pos);
            }
          });
        row += dir === "up" ? -1 : 1;
      }
      if (successfulMove) {
        while (row !== robotPos.row) {
          boxPositions
            .filter((x) => x.row === row)
            .forEach((pos) => {
              const newPos = shiftPosition(pos, dir);
              grid[newPos.row][newPos.col] = grid[pos.row][pos.col];
              grid[pos.row][pos.col] = ".";
            });
          row += dir === "up" ? 1 : -1;
        }
      }
    } else {
      let firstEmptyPos = { ...nextPos };
      while (next === "[" || next === "]") {
        firstEmptyPos = shiftPosition(firstEmptyPos, dir);
        next = cell(grid, firstEmptyPos);
      }
      if (next !== ".") {
        continue;
      }

      if (firstEmptyPos.col !== nextPos.col) {
        let i = firstEmptyPos.col;
        while (i !== nextPos.col) {
          const offset = i < nextPos.col ? 1 : -1;
          grid[firstEmptyPos.row][i] = grid[firstEmptyPos.row][i + offset];
          i += offset;
        }
      }
      successfulMove = true;
    }

    if (successfulMove) {
      grid[robotPos.row][robotPos.col] = ".";
      grid[nextPos.row][nextPos.col] = "@";
      robotPos.row = nextPos.row;
      robotPos.col = nextPos.col;
    }
  }

  return getPositions(grid, (x) => x === "[")
    .map(gpsCoordinate)
    .reduce((acc, val) => acc + val, 0);
};

export const day15 = new AocPuzzle(2024, 15, silver, gold);

const gpsCoordinate = (pos: GridPosition): number => {
  return pos.row * 100 + pos.col;
};

const parseDirection = (dir: string): Direction => {
  switch (dir) {
    case "^":
      return "up";
    case "v":
      return "down";
    case "<":
      return "left";
    case ">":
      return "right";
  }
};

const getBoxPartPositions = (
  grid: string[][],
  pos: GridPosition,
): GridPosition[] => {
  let c = cell(grid, pos);
  if (c === "[") {
    return [pos, shiftPosition(pos, "right")];
  } else if (c === "]") {
    return [shiftPosition(pos, "left"), pos];
  }
  return [];
};
