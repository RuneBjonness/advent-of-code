import { parseArgs } from "util";
import { getPuzzles } from "./puzzle-collection";
import { AocPuzzle } from "./aoc-puzzle";

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
    both: {
      type: "boolean",
    },
    path: {
      type: "string",
      short: "p",
    },
    dryrun: {
      type: "boolean",
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
});

const solvePuzzles = async (puzzles: AocPuzzle[]) => {
  if (puzzles.length === 0) {
    console.log("No puzzles found");
  } else {
    const path = puzzles.length === 1 ? values.path : undefined;
    for (const puzzle of puzzles) {
      const input = await puzzle.readInput(path);
      if (values.silver) {
        puzzle.solvePart("silver", input, values.dryrun);
      }
      if (values.gold) {
        puzzle.solvePart("gold", input, values.dryrun);
      }
      if (values.both) {
        puzzle.solvePart("both", input, values.dryrun);
      }
      if (!values.silver && !values.gold && !values.both) {
        puzzle.solve(input, values.dryrun);
      }
    }
  }
};

const year = parseYearFilter(values.year);
const day = parseDayFilter(values.day);
const puzzles = getPuzzles(year, day);

solvePuzzles(puzzles);
