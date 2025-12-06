import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const [rangeSection, idSection] = input.split("\n\n");

  const ranges = rangeSection
    .split("\n")
    .map((ranges) => ranges.split("-").map(Number) as Range);
  const ids = idSection.split("\n").map(Number);

  return ids.filter((id) => isFresh(id, ranges)).length;
};

const gold = (input: string): number => {
  const rangeSection = input.split("\n\n").at(0);

  const ranges = rangeSection
    .split("\n")
    .map((ranges) => ranges.split("-").map(Number) as Range);

  ranges.sort((a, b) => a[0] - b[0]);

  let count = 0;
  let lastMax = -1;

  for (const [min, max] of ranges) {
    if (min > lastMax) {
      count += max - min + 1;
      lastMax = max;
    } else if (max > lastMax) {
      count += max - lastMax;
      lastMax = max;
    }
  }

  return count;
};

export const day05 = new AocPuzzle(2025, 5, silver, gold);

type Range = [number, number];

const isFresh = (id: number, ranges: Range[]): boolean => {
  for (const [min, max] of ranges) {
    if (id >= min && id <= max) {
      return true;
    }
  }
  return false;
};
