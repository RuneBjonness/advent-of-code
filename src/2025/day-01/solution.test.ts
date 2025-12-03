import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(testInput)).toBe(3);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(999);
  });

  test("gold - test input", () => {
    expect(day01.gold(testInput)).toBe(6);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(6099);
  });
});
