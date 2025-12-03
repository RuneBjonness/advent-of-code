import { describe, expect, test } from "bun:test";
import { day16 } from "./solution";

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
    expect(day16.silver(testInput1)).toBe(7036);
  });

  test("silver - test input 2", () => {
    expect(day16.silver(testInput2)).toBe(11048);
  });

  test("silver - actual puzzle input", async () => {
    expect(day16.silver(await day16.readInput())).toBe(94444);
  });

  test("gold - test input 1", () => {
    expect(day16.gold(testInput1)).toBe(45);
  });

  test("gold - test input 2", () => {
    expect(day16.gold(testInput2)).toBe(64);
  });

  test("gold - actual puzzle input", async () => {
    expect(day16.gold(await day16.readInput())).toBe(502);
  });
});
