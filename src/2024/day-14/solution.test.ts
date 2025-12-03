import { describe, expect, test } from "bun:test";
import { day14, safetyFactor } from "./solution";

const testInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

describe("December 14", () => {
  test("safetyFactor - test input", () => {
    expect(safetyFactor(testInput, 11, 7)).toBe(12);
  });

  test("silver - actual puzzle input", async () => {
    expect(day14.silver(await day14.readInput())).toBe(230172768);
  });

  test("gold - actual puzzle input", async () => {
    expect(day14.gold(await day14.readInput())).toBe(8087);
  });
});
