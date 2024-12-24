import { describe, expect, test } from "vitest";
import { silver, gold, countCheats } from "./solution";
import { input } from "./input";

const testInput = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

describe("December 20", () => {
  test("silver - test input", () => {
    expect(countCheats(testInput, 10)).toBe(10);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(1197);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(944910);
  });
});
