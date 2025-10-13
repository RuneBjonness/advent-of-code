import { PuzzlePart } from "./aoc-puzzle";
import { getPuzzles } from "./puzzle-collection";

const parseYearFilter = (year?: string): number | null => {
  if (!year || year === "*") {
    return null;
  }

  const yearNumber = Number(year);
  if (yearNumber < 2015 || isNaN(yearNumber)) {
    throw new Error("Invalid year filter");
  }
  return yearNumber;
};

const parseDayFilter = (day?: string): number | null => {
  if (!day || day === "*") {
    return null;
  }

  const dayNumber = Number(day);
  if (dayNumber < 1 || dayNumber > 25 || isNaN(dayNumber)) {
    throw new Error("Invalid day filter");
  }
  return dayNumber;
};

const parsePartFilter = (part?: string): PuzzlePart | null => {
  if (!part || part === "*") {
    return null;
  }

  if (part !== "silver" && part !== "gold") {
    throw new Error("Invalid part filter");
  }

  return part;
};

const year = parseYearFilter(process.argv[2]);
const day = parseDayFilter(process.argv[3]);
const part = parsePartFilter(process.argv[4]);

const puzzles = getPuzzles(year, day);

if (puzzles.length === 0) {
  console.log("No puzzles found");
}

puzzles.forEach((puzzle) => {
  if (part) {
    puzzle.solvePart(part);
  } else {
    puzzle.solve();
  }
});
