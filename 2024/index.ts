import { PuzzlePart } from "./aoc-puzzle";
import { day01 } from "./day-01/solution";
import { day02 } from "./day-02/solution";
import { day03 } from "./day-03/solution";
import { day04 } from "./day-04/solution";
import { day05 } from "./day-05/solution";
import { day06 } from "./day-06/solution";
import { day07 } from "./day-07/solution";

const puzzles = [day01, day02, day03, day04, day05, day06, day07];

const parseDayFilter = (day?: string): number | null => {
  if (!day) {
    return null;
  }

  const dayNumber = Number(day);
  if (dayNumber < 1 || dayNumber > 25 || isNaN(dayNumber)) {
    throw new Error("Invalid day number");
  }
  return dayNumber;
};

const parsePartFilter = (part?: string): PuzzlePart | null => {
  if (!part) {
    return null;
  }

  if (part !== "silver" && part !== "gold") {
    throw new Error("Invalid part filter");
  }

  return part;
};

const day = parseDayFilter(process.argv[2]);
const part = parsePartFilter(process.argv[3]);

console.log("Advent of Code 2024\n");

if (day) {
  if (part) {
    puzzles[day - 1].solvePart(part);
  } else {
    puzzles[day - 1].solve();
  }
} else {
  puzzles.forEach((puzzle) => puzzle.solve());
}
