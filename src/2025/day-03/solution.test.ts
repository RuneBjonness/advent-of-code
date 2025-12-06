import { expect, test, describe } from "bun:test";
import { day03 } from "./solution";

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

describe("December 03", () => {
  test("silver - test input", () => {
    expect(day03.silver(testInput)).toBe(357);
  });

  test("silver - actual puzzle input", async () => {
    expect(day03.silver(await day03.readInput())).toBe(16842);
  });

  test("gold - test input", () => {
    expect(day03.gold(testInput)).toBe(3121910778619);
  });

  test("gold - actual puzzle input", async () => {
    expect(day03.gold(await day03.readInput())).toBe(167523425665348);
  });
});
