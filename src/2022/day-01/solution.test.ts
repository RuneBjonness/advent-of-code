import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(testInput)).toBe(24000);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(69310);
  });

  test("gold - test input", () => {
    expect(day01.gold(testInput)).toBe(45000);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(206104);
  });
});
