import { AocPuzzle } from "../aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return [...input.matchAll(/mul\((\d+),(\d+)\)/g)].reduce((acc, p) => {
    return acc + Number(p[1]) * Number(p[2]);
  }, 0);
};

export const gold = (input: string): number => {
  const validInstructions = input.matchAll(
    /mul\((\d+),(\d+)\)|(do\(\))|(don\'t\(\))/g
  );
  let total = 0;
  let enabled = true;
  for (const instruction of validInstructions) {
    if (instruction[0] === "do()") {
      enabled = true;
    } else if (instruction[0] === "don't()") {
      enabled = false;
    } else if (enabled) {
      total += Number(instruction[1]) * Number(instruction[2]);
    }
  }
  return total;
};

export const day03 = new AocPuzzle(2024, 3, silver, gold, input);
