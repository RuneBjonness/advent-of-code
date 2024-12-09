import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `2333133121414131402`;

describe("December 09", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(1928);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(6382875730645);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(2858);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(6420913943576);
  });
});
