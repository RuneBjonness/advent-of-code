import { describe, expect, test } from "bun:test";
import { day13 } from "./solution";

const testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

describe("December 13", () => {
  test("silver - test input", () => {
    expect(day13.silver(testInput)).toBe(17);
  });

  test("silver - actual puzzle input", async () => {
    expect(day13.silver(await day13.readInput())).toBe(653);
  });

  test("gold - actual puzzle input", async () => {
    expect(day13.gold(await day13.readInput())).toBe("LKREBPRK");
  });
});
