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
  invalidIdFilter: (id: number) => boolean
): number => {
  let sum = 0;
  for (let id = start; id <= end; id++) {
    if (invalidIdFilter(id)) {
      sum += id;
    }
  }
  return sum;
};

const isInvalidIdPart1 = (id: number): boolean => {
  const numDigits = Math.floor(Math.log10(id)) + 1;
  if (numDigits % 2 !== 0) {
    return false;
  }
  const divisor = 10 ** (numDigits / 2);
  const firstHalf = Math.floor(id / divisor);
  const secondHalf = id % divisor;
  return firstHalf === secondHalf;
};

const isRepeated = (id: number, numDigits: number, count: number): boolean => {
  if (numDigits % count !== 0) {
    return false;
  }

  const partLength = numDigits / count;
  const lastPart = id % 10 ** partLength;

  for (let i = 1; i < count; i++) {
    const divisor = 10 ** (partLength * i);
    const currentPart = Math.floor(
      (id % (divisor * 10 ** partLength)) / divisor
    );
    if (lastPart !== currentPart) {
      return false;
    }
  }
  return true;
};

const isInvalidIdPart2 = (id: number): boolean => {
  const numDigits = Math.floor(Math.log10(id)) + 1;
  for (let count = 2; count <= numDigits; count++) {
    if (isRepeated(id, numDigits, count)) {
      return true;
    }
  }
  return false;
};
