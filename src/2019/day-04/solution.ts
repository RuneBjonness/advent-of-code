import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const [min, max] = input.split("-").map(Number);
  let count = 0;

  for (let i = min; i <= max; i++) {
    if (isValidPassword(i)) {
      count++;
    }
  }
  return count;
};

export const gold = (input: string): number => {
  const [min, max] = input.split("-").map(Number);
  let count = 0;

  for (let i = min; i <= max; i++) {
    if (isValidPassword(i, true)) {
      count++;
    }
  }
  return count;
};

export const day04 = new AocPuzzle(2019, 4, silver, gold, input);

const isValidPassword = (pwd: number, exactDouble?: boolean): boolean => {
  const digits = String(pwd).split("").map(Number);

  let hasDouble = false;

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] < digits[i - 1]) {
      return false;
    }
    if (
      exactDouble &&
      (i - 2 < 0 || digits[i] != digits[i - 2]) &&
      digits[i] == digits[i - 1] &&
      (i + 1 == digits.length || digits[i] != digits[i + 1])
    ) {
      hasDouble = true;
    }
    if (!exactDouble && digits[i] === digits[i - 1]) {
      hasDouble = true;
    }
  }
  return hasDouble;
};
