import { describe, expect, test } from "bun:test";
import { day18, getFirstBreakingPosition, getLowestCost } from "./solution";

const testInput = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

describe("December 18", () => {
  test("simulateMemory - test input", () => {
    expect(getLowestCost(testInput, 7, 12)).toBe(22);
  });

  test("silver - actual puzzle input", async () => {
    expect(day18.silver(await day18.readInput())).toBe(282);
  });

  test("gold - test input", () => {
    expect(getFirstBreakingPosition(testInput, 7)).toBe("6,1");
  });

  test("gold - actual puzzle input", async () => {
    expect(day18.gold(await day18.readInput())).toBe("64,29");
  });
});
