import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

const testInput = `1721
979
366
299
675
1456`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(testInput)).toBe(514579);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(918339);
  });

  test("gold - test input", () => {
    expect(day01.gold(testInput)).toBe(241861950);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(23869440);
  });
});
