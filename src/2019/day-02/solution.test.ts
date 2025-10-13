import { describe, expect, test } from "vitest";
import { silver, gold, runIntcode } from "./solution";
import { input } from "./input";

const testInput = [1, 1, 1, 4, 99, 5, 6, 0, 99];

describe("December 02", () => {
  test("runIntcode - test input", () => {
    expect(runIntcode(testInput)).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(4138658);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(7264);
  });
});
