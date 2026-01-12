import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

const testInput = `199
200
208
210
200
207
240
269
260
263`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(testInput)).toBe(7);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(1228);
  });

  test("gold - test input", () => {
    expect(day01.gold(testInput)).toBe(5);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(1257);
  });
});
