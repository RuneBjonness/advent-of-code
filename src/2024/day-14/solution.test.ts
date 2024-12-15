import { describe, expect, test } from "vitest";
import { silver, gold, safetyFactor } from "./solution";
import { input } from "./input";

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

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(230172768);
  });

  // test("gold - test input", () => {
  //   expect(gold(testInput)).toBe(246);
  // });

  // test("gold - actual puzzle input", () => {
  //   expect(gold(input)).toBe(22222);
  // });
});
