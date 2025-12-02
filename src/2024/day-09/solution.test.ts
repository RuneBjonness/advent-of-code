import { describe, expect, test } from "vitest";
import { day09 } from "./solution";

const testInput = `2333133121414131402`;

describe("December 09", () => {
  test("silver - test input", () => {
    expect(day09.silver(testInput)).toBe(1928);
  });

  test("silver - actual puzzle input", async () => {
    expect(day09.silver(await day09.readInput())).toBe(6382875730645);
  });

  test("gold - test input", () => {
    expect(day09.gold(testInput)).toBe(2858);
  });

  test("gold - actual puzzle input", async () => {
    expect(day09.gold(await day09.readInput())).toBe(6420913943576);
  });
});
