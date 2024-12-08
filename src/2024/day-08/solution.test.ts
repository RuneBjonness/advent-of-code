import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe("December 08", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(14);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(392);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(34);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(1235);
  });
});
