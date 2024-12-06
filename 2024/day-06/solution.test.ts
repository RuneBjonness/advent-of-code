import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution.ts";
import { input } from "./input.ts";

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("December 06", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(41);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(5318);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(6);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(1831);
  });
});
