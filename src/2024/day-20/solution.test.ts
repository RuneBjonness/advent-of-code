import { describe, expect, test } from "bun:test";
import { day20, countCheats } from "./solution";

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

  test("silver - actual puzzle input", async () => {
    expect(day20.silver(await day20.readInput())).toBe(1197);
  });

  test("gold - actual puzzle input", async () => {
    expect(day20.gold(await day20.readInput())).toBe(944910);
  });
});
