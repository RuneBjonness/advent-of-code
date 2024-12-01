import { DayEntry } from "../aoc-day-entry";
import { input } from "./input";

export const silver = (input: string): number => {
  return input
    .split("\n")
    .map(parseGame)
    .filter((x) => x.red <= 12 && x.green <= 13 && x.blue <= 14)
    .reduce((acc, x) => acc + x.id, 0);
};

export const gold = (input: string): number => {
  return input
    .split("\n")
    .map(parseGame)
    .reduce((acc, x) => acc + x.red * x.green * x.blue, 0);
};

type Game = {
  id: number;
  red: number;
  green: number;
  blue: number;
};

const parseGame = (txt: string): Game => {
  const game: Game = {
    id: Number(txt.substring(5, txt.indexOf(":"))),
    red: 0,
    green: 0,
    blue: 0,
  };

  const subsets = txt
    .substring(txt.indexOf(":") + 1)
    .split(";")
    .map((x) => x.trim());

  for (const subset of subsets) {
    const colors = subset.split(", ");

    for (const color of colors) {
      const [count, colorName] = color.split(" ");
      game[colorName] = Math.max(game[colorName], Number(count));
    }
  }

  return game;
};

export const day02: DayEntry = {
  silver: () => silver(input),
  gold: () => gold(input),
};
