import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

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
    expect(silver(testInput)).toBe(18);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(2639);
  });

  test("gold - test input", () => {
    expect(gold(testInputGold)).toBe(9);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(2005);
  });
});
