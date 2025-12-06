import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return sumInvalidIds(input, isInvalidIdPart1);
};

const gold = (input: string): number => {
  return sumInvalidIds(input, isInvalidIdPart2);
};

export const day02 = new AocPuzzle(2025, 2, silver, gold);

const sumInvalidIds = (
  input: string,
  invalidIdFilter: (id: number) => boolean
): number => {
  return input
    .split(",")
    .map((x) => x.split("-").map(Number))
    .map(([start, end]) => sumInvalidIdsInRange(start, end, invalidIdFilter))
    .reduce((acc, x) => acc + x, 0);
};

const sumInvalidIdsInRange = (
  start: number,
  end: number,
  invaliIdFilter: (id: number) => boolean
): number => {
  let sum = 0;
  for (let id = start; id <= end; id++) {
    if (invaliIdFilter(id)) {
      sum += id;
    }
  }
  return sum;
};

const isInvalidIdPart1 = (id: number): boolean => {
  const idStr = id.toString();
  if (idStr.length % 2 !== 0) {
    return false;
  }
  const halfLength = idStr.length / 2;
  return idStr.slice(0, halfLength) === idStr.slice(halfLength);
};

const isRepeated = (idStr: string, count: number): boolean => {
  if (idStr.length % count !== 0) {
    return false;
  }
  const partLength = idStr.length / count;
  const firstPart = idStr.slice(0, partLength);
  for (let i = 1; i < count; i++) {
    if (firstPart !== idStr.slice(i * partLength, (i + 1) * partLength)) {
      return false;
    }
  }
  return true;
};

const isInvalidIdPart2 = (id: number): boolean => {
  const idStr = id.toString();
  for (let count = 2; count <= idStr.length; count++) {
    if (isRepeated(idStr, count)) {
      return true;
    }
  }
  return false;
};
