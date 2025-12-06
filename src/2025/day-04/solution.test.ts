import { describe, expect, test } from "bun:test";
import { day04 } from "./solution";

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

describe("December 04", () => {
  test("silver - test input", () => {
    expect(day04.silver(testInput)).toBe(13);
  });

  test("silver - actual puzzle input", async () => {
    expect(day04.silver(await day04.readInput())).toBe(1372);
  });

  test("gold - test input", () => {
    expect(day04.gold(testInput)).toBe(43);
  });

  test("gold - actual puzzle input", async () => {
    expect(day04.gold(await day04.readInput())).toBe(7922);
  });
});
