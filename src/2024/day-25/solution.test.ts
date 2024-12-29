import { describe, expect, test } from "vitest";
import { silver } from "./solution";
import { input } from "./input";

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
    expect(silver(testInput)).toBe(3);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(3077);
  });
});
