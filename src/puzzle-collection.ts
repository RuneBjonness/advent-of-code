import { puzzles2019 } from "./2019";
import { puzzles2023 } from "./2023";
import { puzzles2024 } from "./2024";
import { puzzles2025 } from "./2025";

const puzzleCollection = [
  ...puzzles2019,
  ...puzzles2023,
  ...puzzles2024,
  ...puzzles2025,
];

export const getPuzzles = (year?: number, day?: number) =>
  puzzleCollection.filter((puzzle) => {
    if (year && puzzle.year !== year) {
      return false;
    }

    if (day && puzzle.day !== day) {
      return false;
    }

    return true;
  });
