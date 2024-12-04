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

export const cell = <T>(grid: T[][], position: GridPosition): T => {
  return grid[position.row][position.col];
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
  return positions
    .filter((p) => isValidPosition(grid, p))
    .map((p) => cell(grid, p));
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
