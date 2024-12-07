import { AocPuzzle } from "../aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return Number(input);
};

export const gold = (input: string): number => {
  return Number(input) * 2;
};

export const day00 = new AocPuzzle(2024, 0, silver, gold, input);
