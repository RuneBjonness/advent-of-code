import { describe, expect, test } from "bun:test";
import { day09 } from "./solution";

const testInput = `0`;

describe("December 09", () => {
  test("silver - test input", () => {
    expect(day09.silver(testInput)).toBe(0);
  });

  test("silver - actual puzzle input", async () => {
    expect(day09.silver(await day09.readInput())).toBe(0);
  });

  test("gold - test input", () => {
    expect(day09.gold(testInput)).toBe(0);
  });

  test("gold - actual puzzle input", async () => {
    expect(day09.gold(await day09.readInput())).toBe(0);
  });
});
