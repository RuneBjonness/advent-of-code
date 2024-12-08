import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return Number(input);
};

export const gold = (input: string): number => {
  return Number(input) * 2;
};

export const day08 = new AocPuzzle(2024, 8, silver, gold, input);
