import { Direction } from "./direction";
import { GridPosition, shiftPosition } from "./grid-position";

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

export const getPositions = <T>(
  grid: T[][],
  filter: (val: T) => boolean
): GridPosition[] => {
  return grid
    .flatMap((row, rowIndex) =>
      row.map((cell, colIndex) =>
        filter(cell) ? { row: rowIndex, col: colIndex } : null
      )
    )
    .filter((pos) => pos !== null);
};
