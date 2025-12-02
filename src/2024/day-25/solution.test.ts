import { describe, expect, test } from "vitest";
import { day25 } from "./solution";

const testInput = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

describe("December 25", () => {
  test("silver - test input", () => {
    expect(day25.silver(testInput)).toBe(3);
  });

  test("silver - actual puzzle input", async () => {
    expect(day25.silver(await day25.readInput())).toBe(3077);
  });
});
