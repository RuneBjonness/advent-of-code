import { Direction, directionVector } from "./direction";

export type GridPosition = {
  row: number;
  col: number;
};

export const shiftPosition = (
  origin: GridPosition,
  direction: Direction,
  steps: number = 1
): GridPosition => {
  const vector = directionVector(direction, steps);
  return { row: origin.row + vector.row, col: origin.col + vector.col };
};

export const distance = (a: GridPosition, b: GridPosition): number => {
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
};
