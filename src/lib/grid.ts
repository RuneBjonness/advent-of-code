export type GridPosition = {
  row: number;
  col: number;
};

export type Direction =
  | "right"
  | "left"
  | "down"
  | "up"
  | "rightDown"
  | "leftDown"
  | "rightUp"
  | "leftUp";

export const directions: Direction[] = [
  "right",
  "left",
  "down",
  "up",
  "rightDown",
  "leftDown",
  "rightUp",
  "leftUp",
];

export const rotate90 = (dir: Direction): Direction => {
  switch (dir) {
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
    case "up":
      return "right";
    case "rightDown":
      return "leftDown";
    case "leftDown":
      return "leftUp";
    case "leftUp":
      return "rightUp";
    case "rightUp":
      return "rightDown";
  }
};

export const directionVector = (dir: Direction, length = 1): GridPosition => {
  switch (dir) {
    case "right":
      return { row: 0, col: length };
    case "left":
      return { row: 0, col: -length };
    case "down":
      return { row: length, col: 0 };
    case "up":
      return { row: -length, col: 0 };
    case "rightDown":
      return { row: length, col: length };
    case "leftDown":
      return { row: length, col: -length };
    case "rightUp":
      return { row: -length, col: length };
    case "leftUp":
      return { row: -length, col: -length };
  }
};

export const cell = <T>(grid: T[][], position: GridPosition): T | null => {
  return isValidPosition(grid, position)
    ? grid[position.row][position.col]
    : null;
};

export const cells = <T>(
  grid: T[][],
  pos: GridPosition,
  dir: Direction,
  length: number
): T[] => {
  const positions = Array.from({ length }, (_, i) =>
    shiftPosition(pos, dir, i)
  );
  return positions.map((p) => cell(grid, p)).filter((c) => c !== null);
};

export const isValidPosition = <T>(grid: T[][], pos: GridPosition): boolean => {
  return (
    pos.row >= 0 &&
    pos.row < grid.length &&
    pos.col >= 0 &&
    pos.col < grid[pos.row].length
  );
};

export const shiftPosition = (
  origin: GridPosition,
  direction: Direction,
  steps: number = 1
): GridPosition => {
  const vector = directionVector(direction, steps);
  return { row: origin.row + vector.row, col: origin.col + vector.col };
};
