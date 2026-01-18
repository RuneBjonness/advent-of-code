import { day01 } from "./day-01/solution";
import { day02 } from "./day-02/solution";
import { day03 } from "./day-03/solution";
import { day04 } from "./day-04/solution";
import { day05 } from "./day-05/solution";
import { day06 } from "./day-06/solution";
import { day07 } from "./day-07/solution";
import { day08 } from "./day-08/solution";
import { day09 } from "./day-09/solution";
import { day10 } from "./day-10/solution";
import { day11 } from "./day-11/solution";
import { day12 } from "./day-12/solution";
import { day13 } from "./day-13/solution";
import { day14 } from "./day-14/solution";
import { day15 } from "./day-15/solution";

export const puzzles2021 = [
  day01,
  day02,
  day03,
  day04,
  day05,
  day06,
  day07,
  day08,
  day09,
  day10,
  day11,
  day12,
  day13,
  day14,
  day15
    .skip("gold", "4-5 minutes execution time")
    .skip("both", "4-5 minutes execution time"),
];
