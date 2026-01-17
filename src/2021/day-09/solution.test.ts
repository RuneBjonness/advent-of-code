import { describe, expect, test } from "bun:test";
import { day09 } from "./solution";

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe("December 09", () => {
  test("silver - test input", () => {
    expect(day09.silver(testInput)).toBe(15);
  });

  test("silver - actual puzzle input", async () => {
    expect(day09.silver(await day09.readInput())).toBe(500);
  });

  test("gold - test input", () => {
    expect(day09.gold(testInput)).toBe(1134);
  });

  test("gold - actual puzzle input", async () => {
    expect(day09.gold(await day09.readInput())).toBe(970200);
  });
});
