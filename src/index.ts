import { parseArgs } from "util";
import { getPuzzles } from "./puzzle-collection";

const parseYearFilter = (year?: string): number | null => {
  if (!year || year === "*") {
    return null;
  }

  const yearNumber = Number(year);
  if (yearNumber < 2015 || Number.isNaN(yearNumber)) {
    throw new Error("Invalid year filter");
  }
  return yearNumber;
};

const parseDayFilter = (day?: string): number | null => {
  if (!day || day === "*") {
    return null;
  }

  const dayNumber = Number(day);
  if (dayNumber < 1 || dayNumber > 25 || Number.isNaN(dayNumber)) {
    throw new Error("Invalid day filter");
  }
  return dayNumber;
};

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    year: {
      type: "string",
      short: "y",
    },
    day: {
      type: "string",
      short: "d",
    },
    silver: {
      type: "boolean",
    },
    gold: {
      type: "boolean",
    },
    path: {
      type: "string",
      short: "p",
    },
  },
  strict: true,
  allowPositionals: true,
});

const year = parseYearFilter(values.year);
const day = parseDayFilter(values.day);

const puzzles = getPuzzles(year, day);

if (puzzles.length === 0) {
  console.log("No puzzles found");
} else if (values.path && puzzles.length === 1) {
  const input = await puzzles[0].readInput(values.path);
  if (values.silver) {
    puzzles[0].solvePart("silver", input);
  } else if (values.gold) {
    puzzles[0].solvePart("gold", input);
  } else {
    puzzles[0].solve(input);
  }
} else {
  for (const puzzle of puzzles) {
    if (values.silver) {
      puzzle.solvePart("silver");
    } else if (values.gold) {
      puzzle.solvePart("gold");
    } else {
      puzzle.solve();
    }
  }
}
