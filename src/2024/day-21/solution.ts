import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return input.split("\n").reduce((acc, code) => {
    return acc + shortestForCode(code) * Number(code.slice(0, 3));
  }, 0);
};

export const gold = (input: string): number => {
  return input.split("\n").reduce((acc, code) => {
    return acc + shortestForCode(code, 25) * Number(code.slice(0, 3));
  }, 0);
};

export const day21 = new AocPuzzle(2024, 21, silver, gold, input);

export const dirKeysToPressNumPadKey = (
  startKey: string,
  targetKey: string
): string[] => {
  const numPad = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["", "0", "A"],
  ];
  return dirKeysToPressTargetKeyPad(startKey, targetKey, numPad);
};

export const dirKeysToPressDirKey = (
  startKey: string,
  targetKey: string
): string[] => {
  const dirKeyPad = [
    ["", "^", "A"],
    ["<", "v", ">"],
  ];
  return dirKeysToPressTargetKeyPad(startKey, targetKey, dirKeyPad);
};

const dirKeysToPressTargetKeyPad = (
  startKey: string,
  targetKey: string,
  targetKeyPad: string[][]
): string[] => {
  if (startKey === targetKey) {
    return ["A"];
  }

  const startRow = targetKeyPad.findIndex((row) => row.includes(startKey));
  const startCol = targetKeyPad[startRow].indexOf(startKey);

  const targetRow = targetKeyPad.findIndex((row) => row.includes(targetKey));
  const targetCol = targetKeyPad[targetRow].indexOf(targetKey);

  const rowDiff = targetRow - startRow;
  const colDiff = targetCol - startCol;

  const rowDirs = (rowDiff > 0 ? "v" : "^").repeat(Math.abs(rowDiff));
  const colDirs = (colDiff > 0 ? ">" : "<").repeat(Math.abs(colDiff));

  if (rowDiff === 0) {
    return [`${colDirs}A`];
  }
  if (colDiff === 0) {
    return [`${rowDirs}A`];
  }

  const avoidRow = targetKeyPad.findIndex((row) => row.includes(""));
  const avoidCol = targetKeyPad[avoidRow].indexOf("");

  if (startRow === avoidRow && targetCol === avoidCol) {
    return [`${rowDirs}${colDirs}A`];
  }
  if (startCol === avoidCol && targetRow === avoidRow) {
    return [`${colDirs}${rowDirs}A`];
  }

  return [`${rowDirs}${colDirs}A`, `${colDirs}${rowDirs}A`];
};

export const dirKeysForNumPadCode = (targetCode: string): string[][] => {
  let keys: string[][] = [];
  let currentKey = "A";
  for (const targetKey of targetCode) {
    keys.push(dirKeysToPressNumPadKey(currentKey, targetKey));
    currentKey = targetKey;
  }
  return keys;
};

export const dirKeysForDirKeySequence = (
  targetSequence: string
): string[][] => {
  let keys: string[][] = [];
  let currentKey = "A";
  for (const targetKey of targetSequence) {
    keys.push(dirKeysToPressDirKey(currentKey, targetKey));
    currentKey = targetKey;
  }
  return keys;
};

export const shortestForCode = (code: string, robotChainLength = 2): number => {
  const chache: Map<string, number> = new Map();
  return dirKeysForNumPadCode(code)
    .map((x) =>
      x.reduce(
        (acc, key) =>
          Math.min(acc, shortestForSequence(key, robotChainLength - 1, chache)),
        Infinity
      )
    )
    .reduce((acc, key) => acc + key, 0);
};

export const shortestForSequence = (
  sequence: string,
  robotChainLength: number,
  chache: Map<string, number>
): number => {
  const key = `${sequence}-${robotChainLength}`;
  if (chache.has(key)) {
    return chache.get(key)!;
  }

  let result = 0;
  if (robotChainLength === 0) {
    result = dirKeysForDirKeySequence(sequence)
      .map((x) => x.reduce((acc, key) => Math.min(acc, key.length), Infinity))
      .reduce((acc, key) => acc + key, 0);
  } else {
    result = dirKeysForDirKeySequence(sequence)
      .map((x) =>
        x.reduce(
          (acc, key) =>
            Math.min(
              acc,
              shortestForSequence(key, robotChainLength - 1, chache)
            ),
          Infinity
        )
      )
      .reduce((acc, key) => acc + key, 0);
  }
  chache.set(key, result);
  return result;
};
