import { describe, expect, test } from "bun:test";
import { day06 } from "./solution";

const testInput = `3,4,3,1,2`;

describe("December 06", () => {
  test("silver - test input", () => {
    expect(day06.silver(testInput)).toBe(5934);
  });

  test("silver - actual puzzle input", async () => {
    expect(day06.silver(await day06.readInput())).toBe(373378);
  });

  test("gold - test input", () => {
    expect(day06.gold(testInput)).toBe(26984457539);
  });

  test("gold - actual puzzle input", async () => {
    expect(day06.gold(await day06.readInput())).toBe(1682576647495);
  });
});
