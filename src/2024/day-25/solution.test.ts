import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
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

  // test("gold - test input", () => {
  //   expect(gold(testInput)).toBe(246);
  // });

  // test("gold - actual puzzle input", () => {
  //   expect(gold(input)).toBe(22222);
  // });
});
