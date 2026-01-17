import { describe, expect, test } from "bun:test";
import { day11 } from "./solution";

const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

describe("December 11", () => {
  test("silver - test input", () => {
    expect(day11.silver(testInput)).toBe(1656);
  });

  test("silver - actual puzzle input", async () => {
    expect(day11.silver(await day11.readInput())).toBe(1661);
  });

  test("gold - test input", () => {
    expect(day11.gold(testInput)).toBe(195);
  });

  test("gold - actual puzzle input", async () => {
    expect(day11.gold(await day11.readInput())).toBe(334);
  });
});
