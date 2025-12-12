import { describe, expect, test } from "bun:test";
import { day10 } from "./solution";

const testInput = ``;

describe("December 10", () => {
  test("silver - test input", () => {
    expect(day10.silver(testInput)).toBe(0);
  });

  test("silver - actual puzzle input", async () => {
    expect(day10.silver(await day10.readInput())).toBe(0);
  });

  test("gold - test input", () => {
    expect(day10.gold(testInput)).toBe(0);
  });

  test("gold - actual puzzle input", async () => {
    expect(day10.gold(await day10.readInput())).toBe(0);
  });
});
