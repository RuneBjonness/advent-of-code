import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution.ts";
import { input } from "./input.ts";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(11);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(2430334);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(31);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(28786472);
  });
});
