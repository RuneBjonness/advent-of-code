import { describe, expect, test } from "bun:test";
import { day11 } from "./solution";

const testInput = ``;

describe("December 11", () => {
  test("silver - test input", () => {
    expect(day11.silver(testInput)).toBe(0);
  });

  test("silver - actual puzzle input", async () => {
    expect(day11.silver(await day11.readInput())).toBe(0);
  });

  test("gold - test input", () => {
    expect(day11.gold(testInput)).toBe(0);
  });

  test("gold - actual puzzle input", async () => {
    expect(day11.gold(await day11.readInput())).toBe(0);
  });
});
