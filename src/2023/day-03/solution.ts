import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  let result = 0;
  const rows = input.split("\n");

  for (let i = 0; i < rows.length; i++) {
    const matches = [...rows[i].matchAll(/(\d+)+/g)];
    for (const match of matches) {
      if (checkAdjacent(rows, i, match.index, match.index + match[0].length)) {
        result += Number(match[0]);
      }
    }
  }

  return result;
};

export const gold = (input: string): number => {
  let result = 0;
  const rows = input.split("\n");

  for (let i = 0; i < rows.length; i++) {
    const matches = [...rows[i].matchAll(/\*/g)];
    for (const match of matches) {
      if (checkAdjacent(rows, i, match.index, match.index + 1)) {
        result += Number(match[0]);
      }
    }
  }

  return result;
};

export const day03 = new AocPuzzle(2023, 3, silver, gold, input);

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const checkAdjacent = (
  rows: string[],
  row: number,
  colStart: number,
  colEnd: number
): boolean => {
  for (let r = row - 1; r <= row + 1; r++) {
    if (r < 0 || r >= rows.length) {
      continue;
    }

    if (
      rows[r]
        .substring(
          clamp(colStart - 1, 0, rows[r].length),
          clamp(colEnd + 1, 0, rows[r].length)
        )
        .match(/[^\d\.]/)?.length
    ) {
      return true;
    }
  }

  return false;
};
