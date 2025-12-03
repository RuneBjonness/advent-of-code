import { describe, expect, test } from "bun:test";
import { day04 } from "./solution";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const testInputGold = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;

describe("December 04", () => {
  test("silver - test input", () => {
    expect(day04.silver(testInput)).toBe(18);
  });

  test("silver - actual puzzle input", async () => {
    expect(day04.silver(await day04.readInput())).toBe(2639);
  });

  test("gold - test input", () => {
    expect(day04.gold(testInputGold)).toBe(9);
  });

  test("gold - actual puzzle input", async () => {
    expect(day04.gold(await day04.readInput())).toBe(2005);
  });
});
