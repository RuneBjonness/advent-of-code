import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput1 = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const testInput2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

describe("December 16", () => {
  test("silver - test input 1", () => {
    expect(silver(testInput1)).toBe(7036);
  });

  test("silver - test input 2", () => {
    expect(silver(testInput2)).toBe(11048);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(94444);
  });

  test("gold - test input 1", () => {
    expect(gold(testInput1)).toBe(45);
  });

  test("gold - test input 2", () => {
    expect(gold(testInput2)).toBe(64);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(502);
  });
});
