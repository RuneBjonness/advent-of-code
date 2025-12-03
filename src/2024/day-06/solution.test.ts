import { describe, expect, test } from "bun:test";
import { day06 } from "./solution";

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
    expect(day06.silver(testInput)).toBe(41);
  });

  test("silver - actual puzzle input", async () => {
    expect(day06.silver(await day06.readInput())).toBe(5318);
  });

  test("gold - test input", () => {
    expect(day06.gold(testInput)).toBe(6);
  });

  test("gold - actual puzzle input", async () => {
    expect(day06.gold(await day06.readInput())).toBe(1831);
  });
});
