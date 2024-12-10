import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe("December 10", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(36);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(548);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(81);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(1252);
  });
});
