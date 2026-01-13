import { puzzles2015 } from "./2015";
import { puzzles2016 } from "./2016";
import { puzzles2017 } from "./2017";
import { puzzles2018 } from "./2018";
import { puzzles2019 } from "./2019";
import { puzzles2020 } from "./2020";
import { puzzles2021 } from "./2021";
import { puzzles2022 } from "./2022";
import { puzzles2023 } from "./2023";
import { puzzles2024 } from "./2024";
import { puzzles2025 } from "./2025";

const puzzleCollection = [
  ...puzzles2015,
  ...puzzles2016,
  ...puzzles2017,
  ...puzzles2018,
  ...puzzles2019,
  ...puzzles2020,
  ...puzzles2021,
  ...puzzles2022,
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
