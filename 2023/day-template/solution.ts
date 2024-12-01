import { DayEntry } from "../aoc-day-entry";
import { input } from "./input";

export const silver = (input: string): number => {
  return Number(input);
};

export const gold = (input: string): number => {
  return Number(input) * 2;
};

export const day00: DayEntry = {
  silver: () => silver(input),
  gold: () => gold(input),
};
