import { AocPuzzle } from "@/aoc-puzzle";
import { cell } from "@/lib/grid";
import { GridPosition, shiftPosition } from "@/lib/grid-position";
import { Direction } from "@/lib/direction";

const silver = (input: string): number => {
  return getLowestCost(input, 71, 1024);
};

const gold = (input: string): string => {
  return getFirstBreakingPosition(input, 71);
};

export const day18 = new AocPuzzle(2024, 18, silver, gold);

export const getLowestCost = (
  input: string,
  memorySize: number,
  steps: number
): number => {
  const memory = simulateMemory(input, memorySize, steps);
  const cost = calculateCost(memory);
  return cost[memorySize - 1][memorySize - 1];
};

export const getFirstBreakingPosition = (
  input: string,
  memorySize: number
): string => {
  const positions: GridPosition[] = input.split("\n").map((line) => {
    const [col, row] = line.split(",").map(Number);
    return { row, col };
  });
  const memory = Array.from({ length: memorySize }, () =>
    Array.from({ length: memorySize }, () => ".")
  );

  positions.forEach((pos) => {
    memory[pos.row][pos.col] = "#";
  });

  let posIdx = positions.length - 1;

  while (posIdx >= 0) {
    const newPos = positions[posIdx];
    memory[newPos.row][newPos.col] = ".";

    const cost = calculateCost(memory);
    if (cost[memorySize - 1][memorySize - 1] < Infinity) {
      return `${newPos.col},${newPos.row}`;
    }
    posIdx--;
  }
};

const simulateMemory = (
  input: string,
  memorySize: number,
  steps: number
): string[][] => {
  const memory = Array.from({ length: memorySize }, () =>
    Array.from({ length: memorySize }, () => ".")
  );
  const positions: GridPosition[] = input
    .split("\n")
    .slice(0, steps)
    .map((line) => {
      const [col, row] = line.split(",").map(Number);
      return { row, col };
    });

  positions.forEach((pos) => {
    memory[pos.row][pos.col] = "#";
  });

  return memory;
};

const calculateCost = (memory: string[][]): number[][] => {
  const cost = initMemoryPathCosts(memory);
  const positions = checkNeighbours(memory, cost, { row: 0, col: 0 });
  while (positions.length > 0) {
    const pos = positions.pop();
    const newPositions = checkNeighbours(memory, cost, pos);
    newPositions
      .filter(
        (newPos) =>
          !positions.some((p) => p.row === newPos.row && p.col === newPos.col)
      )
      .forEach((newPos) => positions.push(newPos));
  }
  return cost;
};

const initMemoryPathCosts = (memory: string[][]): number[][] => {
  const m = memory.map((row) => row.map(() => Infinity));
  m[0][0] = 0;
  return m;
};

const checkNeighbours = (
  memory: string[][],
  cost: number[][],
  pos: GridPosition
): GridPosition[] => {
  const c = cell(cost, pos) + 1;
  const positions: GridPosition[] = [];

  const dirs: Direction[] = ["up", "down", "left", "right"];
  for (const dir of dirs) {
    const newPos = shiftPosition(pos, dir);
    if (cell(memory, newPos) === "." && cell(cost, newPos) > c) {
      cost[newPos.row][newPos.col] = c;
      positions.push(newPos);
    }
  }
  return positions;
};
