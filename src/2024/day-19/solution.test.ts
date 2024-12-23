import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

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
    expect(silver(testInput)).toBe(6);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(360);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(16);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(577474410989846);
  });
});
