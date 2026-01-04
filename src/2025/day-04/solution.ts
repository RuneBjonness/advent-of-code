import { AocPuzzle } from "@/aoc-puzzle";
import { Grid } from "@/lib/grid";
import { adjacentAndDiagonalDeltas } from "@/lib/direction";
import { ValueGrid } from "@/lib/value-grid";

const silver = (input: string): number => {
  const grid = ValueGrid.fromInputWithNoMapping(input);
  let count = 0;
  for (let row = 0; row < grid.numRows; row++) {
    for (let col = 0; col < grid.numCols; col++) {
      if (grid.getCellUnsafe({ row, col }) === "@") {
        let adjacentCount = 0;
        for (const delta of adjacentAndDiagonalDeltas) {
          const neighbor = { row: row + delta.row, col: col + delta.col };
          if (grid.getCell(neighbor) === "@") {
            adjacentCount++;
            if (adjacentCount >= 4) {
              break;
            }
          }
        }
        if (adjacentCount < 4) {
          count++;
        }
      }
    }
  }
  return count;
};

const gold = (input: string): number => {
  const grid = Grid.fromInput(input, (val) => {
    return { s: val, adjacentOccupied: -1 };
  });
  let count = 0;

  let occupiedCells = grid.cells.filter((c) => c.value.s === "@");
  let occupiedCellsLastPass = occupiedCells.length + 1;

  while (occupiedCells.length < occupiedCellsLastPass) {
    occupiedCellsLastPass = occupiedCells.length;
    for (const cell of occupiedCells) {
      if (cell.value.adjacentOccupied >= 4) {
        continue;
      }
      const adjacentOccupiedCells = grid
        .getAdjacentCells(cell, true)
        .filter((c) => c.value.s === "@");

      if (cell.value.adjacentOccupied < 0) {
        cell.value.adjacentOccupied = adjacentOccupiedCells.length;
      }
      if (cell.value.adjacentOccupied < 4) {
        count++;
        cell.value.s = "x";
        for (const adjacentCell of adjacentOccupiedCells) {
          if (adjacentCell.value.adjacentOccupied > 0) {
            adjacentCell.value.adjacentOccupied--;
          }
        }
      }
    }
    occupiedCells = occupiedCells.filter((c) => c.value.s === "@");
  }
  return count;
};

export const day04 = new AocPuzzle(2025, 4, silver, gold);
