import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe("December 03", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(4361);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(527144);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(467835);
  });

  // test("gold - actual puzzle input", () => {
  //   expect(gold(input)).toBe(22222);
  // });
});
