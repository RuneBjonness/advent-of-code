import { expect, test, describe } from "vitest";
import { day01 } from "./solution";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(testInput)).toBe(11);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(2430334);
  });

  test("gold - test input", () => {
    expect(day01.gold(testInput)).toBe(31);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(28786472);
  });
});
