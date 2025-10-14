import { day01 } from "./day-01/solution";
import { day02 } from "./day-02/solution";
import { day03 } from "./day-03/solution";

export const puzzles2019 = [
  day01,
  day02,
  day03.skip("silver", "32 seconds").skip("gold", "32 seconds"),
];
