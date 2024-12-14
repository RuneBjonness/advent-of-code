import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return calculateNumberOfStones(input, 25);
};

export const gold = (input: string): number => {
  return calculateNumberOfStones(input, 75);
};

export const day11 = new AocPuzzle(2024, 11, silver, gold, input);

const calculateNumberOfStones = (input: string, blinks: number): number => {
  let stones = input.split(" ").map(Number);
  const cache = new Map<string, number>();

  let count = 0;
  for (let i = 0; i < stones.length; i++) {
    count += numberOfStones(stones[i], blinks, cache);
  }
  return count;
};

export const numberOfStonesSimple = (
  value: number,
  remainingBlinks: number,
  cache: Map<string, number>
): number => {
  const key = `${value}-${remainingBlinks}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  let result = 0;
  if (remainingBlinks === 0) {
    result = 1;
  } else if (value === 0) {
    result = numberOfStonesSimple(1, remainingBlinks - 1, cache);
  } else {
    const s = `${value}`;
    if (s.length % 2 === 0) {
      result =
        numberOfStonesSimple(
          Number(s.slice(0, s.length / 2)),
          remainingBlinks - 1,
          cache
        ) +
        numberOfStonesSimple(
          Number(s.slice(s.length / 2)),
          remainingBlinks - 1,
          cache
        );
    } else {
      result = numberOfStonesSimple(value * 2024, remainingBlinks - 1, cache);
    }
  }

  cache.set(key, result);
  return result;
};

export const numberOfStones = (
  value: number,
  remainingBlinks: number,
  cache: Map<string, number>
): number => {
  const key = `${value}-${remainingBlinks}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  let result = 0;
  if (remainingBlinks === 0) {
    result = 1;
  } else if (value === 0) {
    result = numberOfStones(1, remainingBlinks - 1, cache);
  } else if (value < 5) {
    if (remainingBlinks < 3) {
      result = remainingBlinks;
    } else if (value === 1) {
      // 2024
      result =
        2 * numberOfStones(2, remainingBlinks - 3, cache) +
        numberOfStones(0, remainingBlinks - 3, cache) +
        numberOfStones(4, remainingBlinks - 3, cache);
    } else if (value === 2) {
      // 4048
      result =
        2 * numberOfStones(4, remainingBlinks - 3, cache) +
        numberOfStones(0, remainingBlinks - 3, cache) +
        numberOfStones(8, remainingBlinks - 3, cache);
    } else if (value === 3) {
      // 6072
      result =
        numberOfStones(6, remainingBlinks - 3, cache) +
        numberOfStones(0, remainingBlinks - 3, cache) +
        numberOfStones(7, remainingBlinks - 3, cache) +
        numberOfStones(2, remainingBlinks - 3, cache);
    } else if (value === 4) {
      // 8096
      result =
        numberOfStones(8, remainingBlinks - 3, cache) +
        numberOfStones(0, remainingBlinks - 3, cache) +
        numberOfStones(9, remainingBlinks - 3, cache) +
        numberOfStones(6, remainingBlinks - 3, cache);
    }
  } else if (value < 10 && value !== 8) {
    if (remainingBlinks < 3) {
      result = 1;
    } else if (remainingBlinks === 3) {
      result = 2;
    } else if (remainingBlinks === 4) {
      result = 4;
    } else if (value === 5) {
      // 20482880
      result =
        2 * numberOfStones(0, remainingBlinks - 5, cache) +
        2 * numberOfStones(2, remainingBlinks - 5, cache) +
        numberOfStones(4, remainingBlinks - 5, cache) +
        3 * numberOfStones(8, remainingBlinks - 5, cache);
    } else if (value === 6) {
      // 24579456
      result =
        numberOfStones(2, remainingBlinks - 5, cache) +
        2 * numberOfStones(4, remainingBlinks - 5, cache) +
        2 * numberOfStones(5, remainingBlinks - 5, cache) +
        numberOfStones(6, remainingBlinks - 5, cache) +
        numberOfStones(7, remainingBlinks - 5, cache) +
        numberOfStones(9, remainingBlinks - 5, cache);
    } else if (value === 7) {
      // 28676032
      result =
        numberOfStones(0, remainingBlinks - 5, cache) +
        2 * numberOfStones(2, remainingBlinks - 5, cache) +
        numberOfStones(3, remainingBlinks - 5, cache) +
        2 * numberOfStones(6, remainingBlinks - 5, cache) +
        numberOfStones(7, remainingBlinks - 5, cache) +
        numberOfStones(8, remainingBlinks - 5, cache);
    } else if (value === 9) {
      // 36869184
      result =
        numberOfStones(1, remainingBlinks - 5, cache) +
        numberOfStones(3, remainingBlinks - 5, cache) +
        numberOfStones(4, remainingBlinks - 5, cache) +
        2 * numberOfStones(6, remainingBlinks - 5, cache) +
        2 * numberOfStones(8, remainingBlinks - 5, cache) +
        numberOfStones(9, remainingBlinks - 5, cache);
    }
  } else if (value === 8) {
    // 327726_8
    if (remainingBlinks < 3) {
      result = 1;
    } else if (remainingBlinks === 3) {
      result = 2;
    } else if (remainingBlinks === 4) {
      result = 3 + numberOfStones(8, remainingBlinks - 4, cache);
    } else
      result =
        2 * numberOfStones(2, remainingBlinks - 5, cache) +
        numberOfStones(3, remainingBlinks - 5, cache) +
        numberOfStones(6, remainingBlinks - 5, cache) +
        2 * numberOfStones(7, remainingBlinks - 5, cache) +
        numberOfStones(8, remainingBlinks - 4, cache);
  } else {
    const s = `${value}`;
    if (s.length % 2 === 0) {
      result =
        numberOfStones(
          Number(s.slice(0, s.length / 2)),
          remainingBlinks - 1,
          cache
        ) +
        numberOfStones(
          Number(s.slice(s.length / 2)),
          remainingBlinks - 1,
          cache
        );
    } else {
      result = numberOfStones(value * 2024, remainingBlinks - 1, cache);
    }
  }
  cache.set(key, result);
  return result;
};
