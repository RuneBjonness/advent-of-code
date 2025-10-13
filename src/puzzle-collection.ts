import { puzzles2019 } from "./2019";
import { puzzles2023 } from "./2023";
import { puzzles2024 } from "./2024";

const puzzleCollection = puzzles2019.concat(puzzles2023, puzzles2024);

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
