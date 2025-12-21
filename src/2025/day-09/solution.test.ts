import { describe, expect, test } from "bun:test";
import { day09 } from "./solution";

const testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

describe("December 09", () => {
  test("silver - test input", () => {
    expect(day09.silver(testInput)).toBe(50);
  });

  test("silver - actual puzzle input", async () => {
    expect(day09.silver(await day09.readInput())).toBe(4740155680);
  });

  test("gold - test input", () => {
    expect(day09.gold(testInput)).toBe(24);
  });

  test("gold - actual puzzle input", async () => {
    expect(day09.gold(await day09.readInput())).toBe(1543501936);
  });
});
