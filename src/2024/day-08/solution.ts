import { AocPuzzle } from "@/aoc-puzzle";
import { getPositions, GridPosition, isValidPosition } from "@/lib/grid";

const silver = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));
  const antiNodePositions: GridPosition[] = [];

  findAntennaTypes(grid).forEach((antennaType) => {
    const antennas = getPositions(grid, (x) => x === antennaType);
    for (let i = 0; i < antennas.length; i++) {
      for (let j = 0; j < antennas.length; j++) {
        if (i !== j) {
          const p = antiNodePosition(antennas[i], antennas[j], 2);
          if (
            isValidPosition(grid, p) &&
            antiNodePositions.every(
              (pos) => pos.row !== p.row || pos.col !== p.col
            )
          ) {
            antiNodePositions.push(p);
          }
        }
      }
    }
  });
  return antiNodePositions.length;
};

const gold = (input: string): number => {
  const grid = input.split("\n").map((row) => row.split(""));
  const antiNodePositions = getPositions(grid, (x) => x !== ".");

  findAntennaTypes(grid).forEach((antennaType) => {
    const antennas = getPositions(grid, (x) => x === antennaType);
    for (let i = 0; i < antennas.length; i++) {
      for (let j = 0; j < antennas.length; j++) {
        if (i !== j) {
          let pos = antiNodePosition(antennas[i], antennas[j]);
          let steps = 1;
          while (isValidPosition(grid, pos)) {
            {
              if (
                antiNodePositions.every(
                  (p) => pos.row !== p.row || pos.col !== p.col
                )
              ) {
                antiNodePositions.push(pos);
              }
              steps++;
              pos = antiNodePosition(antennas[i], antennas[j], steps);
            }
          }
        }
      }
    }
  });

  return antiNodePositions.length;
};

export const day08 = new AocPuzzle(2024, 8, silver, gold);

const findAntennaTypes = (grid: string[][]): string[] => {
  return [...new Set(grid.flat())].filter((cell) => cell !== ".");
};

const antiNodePosition = (
  a: GridPosition,
  b: GridPosition,
  steps = 1
): GridPosition => {
  const vector = { row: b.row - a.row, col: b.col - a.col };
  return {
    row: a.row + vector.row * steps,
    col: a.col + vector.col * steps,
  };
};
