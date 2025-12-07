import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const lines = input
    .split("\n")
    .map((line) => line.split(" ").filter((x) => x.length > 0));

  const valueRows = lines.slice(0, -1);
  const operationRow = lines.at(-1);

  let result = 0;
  for (let col = 0; col < lines[0].length; col++) {
    const values = valueRows.map((row) => Number(row[col]));
    if (operationRow[col] === "+") {
      result += values.reduce((a, b) => a + b, 0);
    } else {
      result += values.reduce((a, b) => a * b, 1);
    }
  }

  return result;
};

const gold = (input: string): number => {
  const grid = input.split("\n").map((x) => x.split(""));

  const valueRows = grid.slice(0, -1);
  const operationRow = grid.at(-1);

  let result = 0;
  let partResult = 0;
  let operator = "+";

  for (let col = 0; col < valueRows[0].length; col++) {
    const value = Number(valueRows.map((row) => row[col]).join(""));

    if (operationRow[col] === "+") {
      operator = "+";
      result += partResult;
      partResult = value;
    } else if (operationRow[col] === "*") {
      operator = "*";
      result += partResult;
      partResult = value;
    } else if (operator === "+") {
      partResult += value;
    } else if (operator === "*" && value !== 0) {
      partResult *= value;
    }

    if (col === valueRows[0].length - 1) {
      result += partResult;
    }
  }

  return result;
};

export const day06 = new AocPuzzle(2025, 6, silver, gold);
