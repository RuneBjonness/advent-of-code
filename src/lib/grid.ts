import {
  adjacentAndDiagonalDeltas,
  adjacentDeltas,
  Direction,
} from "./direction";
import { GridPosition, shiftPosition } from "./grid-position";

export type GridCell<T = string> = {
  value: T;
  adjacentCells?: GridCell<T>[];
} & GridPosition;

export class Grid<T = string> {
  readonly cells: GridCell<T>[];
  readonly numCols: number;
  readonly numRows: number;

  constructor(rows: number, cols: number, initialValue: T);
  constructor(array: T[], cols: number);
  constructor(rowsOrArray: T[] | number, cols: number, initialValue?: T) {
    if (Array.isArray(rowsOrArray)) {
      this.numRows = rowsOrArray.length / cols;
      this.numCols = cols;
      this.cells = rowsOrArray.map((value, index) => ({
        value: value,
        row: Math.floor(index / this.numCols),
        col: index % this.numCols,
      }));
    } else {
      this.numRows = rowsOrArray;
      this.numCols = cols;
      this.cells = Array.from({ length: rowsOrArray * cols }, (_, index) => ({
        value: initialValue,
        row: Math.floor(index / cols),
        col: index % cols,
      }));
    }
  }

  static fromInput<T>(
    input: string,
    valueMapper: (val: string) => T,
    rowDelimiter: string = "\n",
    colDelimiter: string = ""
  ): Grid<T> {
    const cols = input.indexOf(rowDelimiter);
    const values = input
      .replaceAll(rowDelimiter, "")
      .split(colDelimiter)
      .map(valueMapper);
    return new Grid<T>(values, cols);
  }

  static fromInputWithNoMapping(
    input: string,
    rowDelimiter: string = "\n",
    colDelimiter: string = ""
  ): Grid<string> {
    const cols = input.indexOf(rowDelimiter);
    const values = input.replaceAll(rowDelimiter, "").split(colDelimiter);
    return new Grid<string>(values, cols);
  }

  getCell(pos: GridPosition): GridCell<T> | null {
    if (
      pos.row < 0 ||
      pos.row >= this.numRows ||
      pos.col < 0 ||
      pos.col >= this.numCols
    ) {
      return null;
    }
    return this.cells[pos.row * this.numCols + pos.col];
  }

  getCellUnsafe(pos: GridPosition): GridCell<T> {
    return this.cells[pos.row * this.numCols + pos.col];
  }

  getAdjacentCells(
    pos: GridPosition,
    includeDiagonals: boolean = false
  ): GridCell<T>[] {
    const cell = this.getCellUnsafe(pos);
    if (cell.adjacentCells) {
      return cell.adjacentCells;
    }

    const deltas = includeDiagonals
      ? adjacentAndDiagonalDeltas
      : adjacentDeltas;

    const adjacentCells = deltas
      .map((delta) =>
        this.getCell({ row: pos.row + delta.row, col: pos.col + delta.col })
      )
      .filter((cell): cell is GridCell<T> => cell !== null);

    cell.adjacentCells = adjacentCells;
    return adjacentCells;
  }

  print(valueMapper: (val: T) => string = (val) => String(val)): void {
    for (let row = 0; row < this.numRows; row++) {
      let rowStr = "";
      for (let col = 0; col < this.numCols; col++) {
        const cell = this.getCell({ row, col });
        rowStr += cell ? valueMapper(cell.value) : " ";
      }
      console.log(rowStr);
    }
  }
}

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
