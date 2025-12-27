import { describe, expect, test } from "bun:test";
import { day10 } from "./solution";

const testInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

describe("December 10", () => {
  test("silver - test input", () => {
    expect(day10.silver(testInput)).toBe(7);
  });

  test("silver - actual puzzle input", async () => {
    expect(day10.silver(await day10.readInput())).toBe(486);
  });

  test("gold - test input", () => {
    expect(day10.gold(testInput)).toBe(33);
  });

  test("gold - actual puzzle input", async () => {
    expect(day10.gold(await day10.readInput())).toBe(17820);
  });
});
