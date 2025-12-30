import { AocPuzzle } from "@/aoc-puzzle";
import { cell, getPositions } from "@/lib/grid";
import { GridPosition, shiftPosition } from "@/lib/grid-position";

const silver = (input: string): number => {
  const grid = parseInput(input);
  const trailHeads = getPositions(grid, (x) => x.height === 0);

  return trailHeads.reduce((acc, th) => {
    return acc + trailHeadReachableTops(grid, th).length;
  }, 0);
};

const gold = (input: string): number => {
  const grid = parseInput(input);
  const trailHeads = getPositions(grid, (x) => x.height === 0);

  return trailHeads.reduce((acc, th) => {
    return acc + trailHeadRating(grid, th);
  }, 0);
};

export const day10 = new AocPuzzle(2024, 10, silver, gold);

type TopologyCell = {
  height: number;
  rating: number;
  reachableTops: GridPosition[];
};

const parseInput = (input: string): TopologyCell[][] => {
  return input
    .split("\n")
    .map((line) =>
      line
        .split("")
        .map((c) => ({ height: Number(c), rating: 0, reachableTops: [] }))
    );
};

const trailHeadReachableTops = (
  grid: TopologyCell[][],
  pos: GridPosition,
  prevHeight: number = -1
): GridPosition[] => {
  const c = cell(grid, pos);
  if (c === null || c.height !== prevHeight + 1) {
    return [];
  }

  if (c.rating > 0) {
    return c.reachableTops;
  }

  if (c.height === 9) {
    c.reachableTops = [pos];
    c.rating = 1;
    return [pos];
  }
  const reachableTopsFromNeighbours = [
    ...trailHeadReachableTops(grid, shiftPosition(pos, "right"), c.height),
    ...trailHeadReachableTops(grid, shiftPosition(pos, "left"), c.height),
    ...trailHeadReachableTops(grid, shiftPosition(pos, "down"), c.height),
    ...trailHeadReachableTops(grid, shiftPosition(pos, "up"), c.height),
  ];
  for (const p of reachableTopsFromNeighbours) {
    if (!c.reachableTops.some((x) => x.row === p.row && x.col === p.col)) {
      c.reachableTops.push(p);
    }
  }
  c.rating = c.reachableTops.length;
  return c.reachableTops;
};

const trailHeadRating = (
  grid: TopologyCell[][],
  pos: GridPosition,
  prevHeight: number = -1
): number => {
  const c = cell(grid, pos);
  if (c === null || c.height !== prevHeight + 1) {
    return 0;
  }

  if (c.rating > 0) {
    return c.rating;
  }

  if (c.height === 9) {
    c.rating = 1;
    return 1;
  }

  c.rating =
    trailHeadRating(grid, shiftPosition(pos, "right"), c.height) +
    trailHeadRating(grid, shiftPosition(pos, "left"), c.height) +
    trailHeadRating(grid, shiftPosition(pos, "down"), c.height) +
    trailHeadRating(grid, shiftPosition(pos, "up"), c.height);

  return c.rating;
};
