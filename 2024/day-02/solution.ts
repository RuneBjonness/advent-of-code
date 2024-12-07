import { AocPuzzle } from "../aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return input
    .split("\n")
    .map((levels) => levels.split(" ").map(Number))
    .filter((report) => isSafe(report, 3)).length;
};

export const gold = (input: string): number => {
  const reports = input
    .split("\n")
    .map((levels) => levels.split(" ").map(Number));

  let safeCount = 0;

  for (let i = 0; i < reports.length; i++) {
    const idx = unsafeLevelIndex(reports[i], 3);
    if (
      idx === -1 ||
      isSafe(cloneAndSplice(reports[i], idx), 3) ||
      isSafe(cloneAndSplice(reports[i], idx + 1), 3) ||
      (idx > 0 && isSafe(cloneAndSplice(reports[i], idx - 1), 3))
    ) {
      safeCount++;
    }
  }

  return safeCount;
};

export const day02 = new AocPuzzle(2024, 2, silver, gold, input);

type Trend = "increasing" | "decreasing" | "constant";

const trend = (a: number, b: number): Trend => {
  return a < b ? "increasing" : a > b ? "decreasing" : "constant";
};

const distance = (a: number, b: number): number => {
  return Math.abs(a - b);
};

const isSafe = (report: number[], maxSafeDistance: number): boolean => {
  return unsafeLevelIndex(report, maxSafeDistance) === -1;
};

const cloneAndSplice = <T>(list: T[], index: number): T[] => {
  const clone = [...list];
  clone.splice(index, 1);
  return clone;
};

const unsafeLevelIndex = (
  report: number[],
  maxSafeDistance: number
): number => {
  if (report.length < 2) {
    return 0;
  }

  const initialTrend = trend(report[0], report[1]);

  if (initialTrend === "constant") {
    return 0;
  }

  for (let i = 0; i < report.length - 1; i++) {
    if (
      initialTrend !== trend(report[i], report[i + 1]) ||
      distance(report[i], report[i + 1]) > maxSafeDistance
    ) {
      return i;
    }
  }
  return -1;
};
