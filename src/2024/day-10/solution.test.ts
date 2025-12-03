import { describe, expect, test } from "bun:test";
import { day10 } from "./solution";

const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe("December 10", () => {
  test("silver - test input", () => {
    expect(day10.silver(testInput)).toBe(36);
  });

  test("silver - actual puzzle input", async () => {
    expect(day10.silver(await day10.readInput())).toBe(548);
  });

  test("gold - test input", () => {
    expect(day10.gold(testInput)).toBe(81);
  });

  test("gold - actual puzzle input", async () => {
    expect(day10.gold(await day10.readInput())).toBe(1252);
  });
});
