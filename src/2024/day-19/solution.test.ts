import { describe, expect, test } from "vitest";
import { day19 } from "./solution";

const testInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

describe("December 19", () => {
  test("silver - test input", () => {
    expect(day19.silver(testInput)).toBe(6);
  });

  test("silver - actual puzzle input", async () => {
    expect(day19.silver(await day19.readInput())).toBe(360);
  });

  test("gold - test input", () => {
    expect(day19.gold(testInput)).toBe(16);
  });

  test("gold - actual puzzle input", async () => {
    expect(day19.gold(await day19.readInput())).toBe(577474410989846);
  });
});
