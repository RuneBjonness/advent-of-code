import { AocPuzzle } from "@/aoc-puzzle";
import { triangular } from "@/lib/math";

const silver = (input: string): number => {
  const crabs = input.split(",").map(Number);
  const positions = [...new Set(crabs)].sort((a, b) => a - b);

  let upIdx = positions[0];
  let nextCostUp = crabs.filter((x) => x === upIdx).length;

  let downIdx = positions[positions.length - 1];
  let nextCostDown = crabs.filter((x) => x === downIdx).length;

  let totalCost = 0;

  while (upIdx < downIdx) {
    if (nextCostUp < nextCostDown) {
      upIdx++;
      totalCost += nextCostUp;
      nextCostUp += crabs.filter((x) => x === upIdx).length;
    } else {
      downIdx--;
      totalCost += nextCostDown;
      nextCostDown += crabs.filter((x) => x === downIdx).length;
    }
  }

  return totalCost;
};

const gold = (input: string): number => {
  const crabs = input.split(",").map(Number);
  const positions = [...new Set(crabs)].sort((a, b) => a - b);

  let leastCost = Number.POSITIVE_INFINITY;
  for (let i = positions[0]; i < positions[positions.length - 1]; i++) {
    let cost = 0;
    positions.forEach(
      (p) =>
        (cost +=
          crabs.filter((x) => x === p).length * triangular(Math.abs(i - p))),
    );
    if (cost < leastCost) {
      leastCost = cost;
    }
  }

  return leastCost;
};

export const day07 = new AocPuzzle(2021, 7, silver, gold);
