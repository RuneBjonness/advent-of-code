import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";
import {
  cell,
  Direction,
  getPositions,
  GridPosition,
  shiftPosition,
} from "@/lib/grid";

export const silver = (input: string): number => {
  const maze = parseMaze(input);
  const start = getPositions(maze, (x) => x.type === "S")[0];
  maze[start.row][start.col].fromLeft = 0;

  const positionsToCheck = checkNeighbours(maze, start);
  while (positionsToCheck.length > 0) {
    const pos = positionsToCheck.shift();
    const newPositions = checkNeighbours(maze, pos);
    for (const newPos of newPositions) {
      if (
        !positionsToCheck.some(
          (x) => x.row === newPos.row && x.col === newPos.col
        )
      ) {
        positionsToCheck.push(newPos);
      }
    }
  }

  const end = cell(maze, getPositions(maze, (x) => x.type === "E")[0]);

  return Math.min(end.fromAbove, end.fromBelow, end.fromLeft, end.fromRight);
};

export const gold = (input: string): number => {
  const maze = parseMaze(input);
  const start = getPositions(maze, (x) => x.type === "S")[0];
  maze[start.row][start.col].fromLeft = 0;

  const positionsToCheck = checkNeighbours(maze, start);
  while (positionsToCheck.length > 0) {
    const pos = positionsToCheck.shift();
    const newPositions = checkNeighbours(maze, pos);
    for (const newPos of newPositions) {
      if (
        !positionsToCheck.some(
          (x) => x.row === newPos.row && x.col === newPos.col
        )
      ) {
        positionsToCheck.push(newPos);
      }
    }
  }

  const end = getPositions(maze, (x) => x.type === "E")[0];

  const cellEnd = cell(maze, end);
  const costMin = Math.min(
    cellEnd.fromAbove,
    cellEnd.fromBelow,
    cellEnd.fromLeft,
    cellEnd.fromRight
  );

  maze[end.row][end.col].type = "O";
  if (cellEnd.fromAbove === costMin) {
    positionsToCheck.push(shiftPosition(end, "up"));
  }
  if (cellEnd.fromBelow === costMin) {
    positionsToCheck.push(shiftPosition(end, "down"));
  }
  if (cellEnd.fromLeft === costMin) {
    positionsToCheck.push(shiftPosition(end, "left"));
  }
  if (cellEnd.fromRight === costMin) {
    positionsToCheck.push(shiftPosition(end, "right"));
  }

  while (positionsToCheck.length > 0) {
    const pos = positionsToCheck.shift();
    const newPositions = checkPossibleSourceTiles(maze, pos);
    for (const newPos of newPositions) {
      if (
        !positionsToCheck.some(
          (x) => x.row === newPos.row && x.col === newPos.col
        )
      ) {
        positionsToCheck.push(newPos);
      }
    }
  }

  // printMaze(maze);

  return getPositions(maze, (x) => x.type === "O").length;
};

export const day16 = new AocPuzzle(2024, 16, silver, gold, input);

type MazeCell = {
  type: string;
  fromRight: number;
  fromBelow: number;
  fromLeft: number;
  fromAbove: number;
};

const parseMaze = (input: string): MazeCell[][] => {
  return input.split("\n").map((row) =>
    row.split("").map((x) => ({
      type: x,
      fromRight: Infinity,
      fromBelow: Infinity,
      fromLeft: Infinity,
      fromAbove: Infinity,
    }))
  );
};

const checkNeighbours = (
  maze: MazeCell[][],
  pos: GridPosition
): GridPosition[] => {
  const c = cell(maze, pos);
  const positionsToCheck: GridPosition[] = [];

  let n = cell(maze, shiftPosition(pos, "right"));
  if (n.type !== "#") {
    const fromLeft = Math.min(
      c.fromLeft + 1,
      Math.min(c.fromAbove, c.fromBelow) + 1001
    );
    if (fromLeft < n.fromLeft) {
      n.fromLeft = fromLeft;
      positionsToCheck.push(shiftPosition(pos, "right"));
    }
  }
  n = cell(maze, shiftPosition(pos, "down"));
  if (n.type !== "#") {
    const fromAbove = Math.min(
      c.fromAbove + 1,
      Math.min(c.fromLeft, c.fromRight) + 1001
    );
    if (fromAbove < n.fromAbove) {
      n.fromAbove = fromAbove;
      positionsToCheck.push(shiftPosition(pos, "down"));
    }
  }
  n = cell(maze, shiftPosition(pos, "left"));
  if (n.type !== "#") {
    const fromRight = Math.min(
      c.fromRight + 1,
      Math.min(c.fromAbove, c.fromBelow) + 1001
    );
    if (fromRight < n.fromRight) {
      n.fromRight = fromRight;
      positionsToCheck.push(shiftPosition(pos, "left"));
    }
  }
  n = cell(maze, shiftPosition(pos, "up"));
  if (n.type !== "#") {
    const fromBelow = Math.min(
      c.fromBelow + 1,
      Math.min(c.fromLeft, c.fromRight) + 1001
    );
    if (fromBelow < n.fromBelow) {
      n.fromBelow = fromBelow;
      positionsToCheck.push(shiftPosition(pos, "up"));
    }
  }

  return positionsToCheck;
};

const checkPossibleSourceTiles = (
  maze: MazeCell[][],
  pos: GridPosition
): GridPosition[] => {
  const c = cell(maze, pos);
  if (c.type === "S") {
    c.type = "O";
    return [];
  }
  c.type = "O";

  const directionsToCheck = new Set<Direction>();

  const r = cell(maze, shiftPosition(pos, "right"));
  const d = cell(maze, shiftPosition(pos, "down"));
  const l = cell(maze, shiftPosition(pos, "left"));
  const u = cell(maze, shiftPosition(pos, "up"));

  if (r.type === "O") {
    if (d.type !== "#" && d.type !== "O" && r.fromLeft === c.fromBelow + 1001) {
      directionsToCheck.add("down");
    }
    if (u.type !== "#" && u.type !== "O" && r.fromLeft === c.fromAbove + 1001) {
      directionsToCheck.add("up");
    }
    if (l.type !== "#" && l.type !== "O" && r.fromLeft === c.fromLeft + 1) {
      directionsToCheck.add("left");
    }
  }
  if (d.type === "O") {
    if (
      r.type !== "#" &&
      r.type !== "O" &&
      d.fromAbove === c.fromRight + 1001
    ) {
      directionsToCheck.add("right");
    }
    if (l.type !== "#" && l.type !== "O" && d.fromAbove === c.fromLeft + 1001) {
      directionsToCheck.add("left");
    }
    if (u.type !== "#" && u.type !== "O" && d.fromAbove === c.fromAbove + 1) {
      directionsToCheck.add("up");
    }
  }
  if (l.type === "O") {
    if (
      d.type !== "#" &&
      d.type !== "O" &&
      l.fromRight === c.fromBelow + 1001
    ) {
      directionsToCheck.add("down");
    }
    if (
      u.type !== "#" &&
      u.type !== "O" &&
      l.fromRight === c.fromAbove + 1001
    ) {
      directionsToCheck.add("up");
    }
    if (r.type !== "#" && r.type !== "O" && l.fromRight === c.fromRight + 1) {
      directionsToCheck.add("right");
    }
  }
  if (u.type === "O") {
    if (
      r.type !== "#" &&
      r.type !== "O" &&
      u.fromBelow === c.fromRight + 1001
    ) {
      directionsToCheck.add("right");
    }
    if (l.type !== "#" && l.type !== "O" && u.fromBelow === c.fromLeft + 1001) {
      directionsToCheck.add("left");
    }
    if (d.type !== "#" && d.type !== "O" && u.fromBelow === c.fromBelow + 1) {
      directionsToCheck.add("down");
    }
  }
  return [...directionsToCheck].map((d) => shiftPosition(pos, d));
};

const printMaze = (maze: MazeCell[][]) =>
  console.log(maze.map((row) => row.map((x) => x.type).join("")).join("\n"));
