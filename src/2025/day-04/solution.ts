import { AocPuzzle } from "@/aoc-puzzle";
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

const gold = (input: string): number => {
  return both(input)[1];
};

const both = (input: string): [number, number] => {
  const grid = ValueGrid.fromInput<number>(
    input,
    (val) => (val === "@" ? 0 : -1),
    "\n",
    "",
    -1,
  );

  let toRemove: number[] = [];

  for (let row = 1; row < grid.numRows - 1; row++) {
    for (let col = 1; col < grid.numCols - 1; col++) {
      const idx = row * grid.numCols + col;
      if (grid.cells[idx] === 0) {
        let adjacentCount = 0;
        for (const delta of adjacentAndDiagonalDeltas) {
          if (grid.cells[idx + delta.row * grid.numCols + delta.col] >= 0) {
            adjacentCount++;
          }
        }
        if (adjacentCount < 4) {
          toRemove.push(idx);
        }
        grid.cells[idx] = adjacentCount;
      }
    }
  }

  const silverCount = toRemove.length;
  let goldCount = 0;

  while (toRemove.length > 0) {
    const idx = toRemove.pop();
    if (grid.cells[idx] < 0) {
      continue;
    }
    goldCount++;
    grid.cells[idx] = -1;

    for (const delta of adjacentAndDiagonalDeltas) {
      const neighborIdx = idx + delta.row * grid.numCols + delta.col;
      grid.cells[neighborIdx]--;
      if (grid.cells[neighborIdx] >= 0 && grid.cells[neighborIdx] < 4) {
        toRemove.push(neighborIdx);
      }
    }
  }

  return [silverCount, goldCount];
};

export const day04 = new AocPuzzle(2025, 4, silver, gold, both);
