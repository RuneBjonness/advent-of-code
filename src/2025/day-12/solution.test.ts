import { describe, expect, test } from "bun:test";
import { day12 } from "./solution";

const testInput = ``;

describe("December 12", () => {
  test("silver - test input", () => {
    expect(day12.silver(testInput)).toBe(0);
  });

  test("silver - actual puzzle input", async () => {
    expect(day12.silver(await day12.readInput())).toBe(0);
  });

  test("gold - test input", () => {
    expect(day12.gold(testInput)).toBe(0);
  });

  test("gold - actual puzzle input", async () => {
    expect(day12.gold(await day12.readInput())).toBe(0);
  });
});
