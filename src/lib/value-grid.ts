import { adjacentAndDiagonalDeltas, adjacentDeltas } from "./direction";
import { GridPosition } from "./grid-position";

export class ValueGrid<T = string> {
  readonly cells: T[];
  readonly numCols: number;
  readonly numRows: number;

  constructor(rows: number, cols: number, initialValue: T);
  constructor(values: T[], cols: number);
  constructor(rowsOrArray: T[] | number, cols: number, initialValue?: T) {
    if (Array.isArray(rowsOrArray)) {
      this.numRows = rowsOrArray.length / cols;
      this.numCols = cols;
      this.cells = rowsOrArray;
    } else {
      this.numRows = rowsOrArray;
      this.numCols = cols;
      this.cells = Array.from(
        { length: rowsOrArray * cols },
        () => initialValue
      );
    }
  }

  static fromInput<U>(
    input: string,
    valueMapper: (val: string) => U,
    rowDelimiter: string = "\n",
    colDelimiter: string = ""
  ): ValueGrid<U> {
    const cols = input.indexOf("\n");
    const values = input
      .replaceAll(rowDelimiter, "")
      .split(colDelimiter)
      .map(valueMapper);
    return new ValueGrid<U>(values, cols);
  }

  static fromInputWithNoMapping(
    input: string,
    rowDelimiter: string = "\n",
    colDelimiter: string = ""
  ): ValueGrid<string> {
    const cols = input.indexOf("\n");
    const values = input.replaceAll(rowDelimiter, "").split(colDelimiter);
    return new ValueGrid<string>(values, cols);
  }

  getCell(pos: GridPosition): T | null {
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

  getCellUnsafe(pos: GridPosition): T {
    return this.cells[pos.row * this.numCols + pos.col];
  }

  getAdjacentCells(pos: GridPosition, includeDiagonals: boolean = false): T[] {
    const deltas = includeDiagonals
      ? adjacentAndDiagonalDeltas
      : adjacentDeltas;
    return deltas
      .map((delta) =>
        this.getCell({ row: pos.row + delta.row, col: pos.col + delta.col })
      )
      .filter((cell): cell is T => cell !== null);
  }

  print(valueMapper: (val: T) => string = (val) => String(val)): void {
    for (let row = 0; row < this.numRows; row++) {
      let rowStr = "";
      for (let col = 0; col < this.numCols; col++) {
        const cell = this.getCell({ row, col });
        rowStr += cell ? valueMapper(cell) : " ";
      }
      console.log(rowStr);
    }
  }
}
