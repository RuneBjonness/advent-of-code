import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `123`;

describe("December 00 (template)", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(123);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(11111);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(246);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(22222);
  });
});
