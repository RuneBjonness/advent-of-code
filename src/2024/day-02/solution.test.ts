import { expect, test, describe } from "vitest";
import { day02 } from "./solution";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe("December 02", () => {
  test("silver - test input", () => {
    expect(day02.silver(testInput)).toBe(2);
  });

  test("silver - actual puzzle input", async () => {
    expect(day02.silver(await day02.readInput())).toBe(407);
  });

  test("gold - test input", () => {
    expect(day02.gold(testInput)).toBe(4);
  });

  test("gold - actual puzzle input", async () => {
    expect(day02.gold(await day02.readInput())).toBe(459);
  });
});
