import { expect, test, describe } from "bun:test";
import { day03 } from "./solution";

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
    expect(day03.silver(testInput)).toBe(4361);
  });

  test("silver - actual puzzle input", async () => {
    expect(day03.silver(await day03.readInput())).toBe(527144);
  });

  test("gold - test input", () => {
    expect(day03.gold(testInput)).toBe(467835);
  });

  // test("gold - actual puzzle input", async () => {
  //   expect(day03.gold(await day03.readInput())).toBe(22222);
  // });
});
