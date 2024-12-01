import { expect, test } from "vitest";
import { silver, gold } from "./solution.ts";
import { describe } from "node:test";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe("December 01", () => {
  test("silver", () => {
    expect(silver(testInput)).toBe(11);
  });

  test("gold", () => {
    expect(gold(testInput)).toBe(31);
  });
});
