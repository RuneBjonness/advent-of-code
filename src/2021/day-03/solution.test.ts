import { describe, expect, test } from "bun:test";
import { day03 } from "./solution";

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe("December 03", () => {
  test("silver - test input", () => {
    expect(day03.silver(testInput)).toBe(198);
  });

  test("silver - actual puzzle input", async () => {
    expect(day03.silver(await day03.readInput())).toBe(4139586);
  });

  test("gold - test input", () => {
    expect(day03.gold(testInput)).toBe(230);
  });

  test("gold - actual puzzle input", async () => {
    expect(day03.gold(await day03.readInput())).toBe(1800151);
  });
});
