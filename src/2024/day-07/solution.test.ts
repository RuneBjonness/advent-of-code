import { describe, expect, test } from "bun:test";
import { day07 } from "./solution";

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe("December 07", () => {
  test("silver - test input", () => {
    expect(day07.silver(testInput)).toBe(3749);
  });

  test("silver - actual puzzle input", async () => {
    expect(day07.silver(await day07.readInput())).toBe(8401132154762);
  });

  test("gold - test input", () => {
    expect(day07.gold(testInput)).toBe(11387);
  });

  test("gold - actual puzzle input", async () => {
    expect(day07.gold(await day07.readInput())).toBe(95297119227552);
  });
});
