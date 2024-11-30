import { DayEntry } from "./aoc-day-entry";
import { input as day00input } from "./day-01-input";

export const silver = (input: string): number => {
  return Number(input);
};

export const gold = (input: string): number => {
  return Number(input) * 2;
};

export const day01: DayEntry = {
  silver: () => silver(day00input),
  gold: () => gold(day00input),
};
