import { describe, expect, test } from "bun:test";
import { day05 } from "./solution";

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

describe("December 05", () => {
  test("silver - test input", () => {
    expect(day05.silver(testInput)).toBe(5);
  });

  test("silver - actual puzzle input", async () => {
    expect(day05.silver(await day05.readInput())).toBe(5197);
  });

  test("gold - test input", () => {
    expect(day05.gold(testInput)).toBe(12);
  });

  test("gold - actual puzzle input", async () => {
    expect(day05.gold(await day05.readInput())).toBe(18605);
  });
});
