import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const [rangeSection, idSection] = input.split("\n\n");

  const ranges = rangeSection
    .split("\n")
    .map((ranges) => ranges.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);

  const ids = idSection
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

  let rangeIndex = 0;
  let count = 0;
  for (const id of ids) {
    if (id >= ranges[rangeIndex][0] && id <= ranges[rangeIndex][1]) {
      count++;
    } else {
      while (rangeIndex < ranges.length - 1 && id > ranges[rangeIndex][1]) {
        rangeIndex++;
      }
      if (id >= ranges[rangeIndex][0] && id <= ranges[rangeIndex][1]) {
        count++;
      }
    }
  }

  return count;
};

const gold = (input: string): number => {
  const rangeSection = input.split("\n\n").at(0);

  const ranges = rangeSection
    .split("\n")
    .map((ranges) => ranges.split("-").map(Number));

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

const both = (input: string): [number, number] => {
  const [rangeSection, idSection] = input.split("\n\n");

  const ranges = rangeSection
    .split("\n")
    .map((ranges) => ranges.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);

  const ids = idSection
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

  let rangeIndex = 0;
  let silverCount = 0;
  let goldCount = ranges[rangeIndex][1] - ranges[rangeIndex][0] + 1;
  let lastMax = ranges[rangeIndex][1];

  for (const id of ids) {
    if (id >= ranges[rangeIndex][0] && id <= ranges[rangeIndex][1]) {
      silverCount++;
    } else {
      while (rangeIndex < ranges.length - 1 && id > ranges[rangeIndex][1]) {
        rangeIndex++;
        if (ranges[rangeIndex][0] > lastMax) {
          goldCount += ranges[rangeIndex][1] - ranges[rangeIndex][0] + 1;
          lastMax = ranges[rangeIndex][1];
        } else if (ranges[rangeIndex][1] > lastMax) {
          goldCount += ranges[rangeIndex][1] - lastMax;
          lastMax = ranges[rangeIndex][1];
        }
      }
      if (id >= ranges[rangeIndex][0] && id <= ranges[rangeIndex][1]) {
        silverCount++;
      }
    }
  }

  return [silverCount, goldCount];
};

export const day05 = new AocPuzzle(2025, 5, silver, gold, both);
