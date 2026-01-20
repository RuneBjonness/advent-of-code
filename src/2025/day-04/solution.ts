import { AocPuzzle } from "@/aoc-puzzle";
import { Grid, GridCell } from "@/lib/grid";
import { adjacentAndDiagonalDeltas } from "@/lib/direction";
import { ValueGrid } from "@/lib/value-grid";

const silver = (input: string): number => {
  const grid = ValueGrid.fromInputWithNoMapping(input);
  let count = 0;
  for (let row = 0; row < grid.numRows; row++) {
    for (let col = 0; col < grid.numCols; col++) {
      if (grid.cells[row * grid.numCols + col] === "@") {
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

type CellValue = {
  s: string;
  adjacentOccupied: number;
};

const gold = (input: string): number => {
  return both(input)[1];
};

const both = (input: string): [number, number] => {
  const grid = Grid.fromInput<CellValue>(input, (val) => {
    return { s: val, adjacentOccupied: -1 };
  });

  let toRemove: GridCell<CellValue>[] = [];

  for (const cell of grid.cells.filter((c) => c.value.s === "@")) {
    const adjacentOccupiedCells = grid
      .getAdjacentCells(cell, true)
      .filter((c) => c.value.s === "@");

    cell.value.adjacentOccupied = adjacentOccupiedCells.length;

    if (cell.value.adjacentOccupied < 4) {
      toRemove.push(cell);
    }
  }
  const silverCount = toRemove.length;
  let goldCount = 0;

  while (toRemove.length > 0) {
    const cell = toRemove.pop();
    if (cell.value.s === "x") {
      continue;
    }
    goldCount++;
    cell.value.s = "x";

    for (const adjacentCell of grid.getAdjacentCells(cell, true)) {
      if (adjacentCell.value.s !== "@") {
        continue;
      }
      adjacentCell.value.adjacentOccupied--;
      if (adjacentCell.value.adjacentOccupied < 4) {
        toRemove.push(adjacentCell);
      }
    }
  }

  return [silverCount, goldCount];
};

export const day04 = new AocPuzzle(2025, 4, silver, gold, both);
