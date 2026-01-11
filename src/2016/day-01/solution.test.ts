import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver("R5, L5, R5, R3")).toBe(12);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(209);
  });

  test("gold - test input", () => {
    expect(day01.gold("R8, R4, R4, R8")).toBe(4);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(136);
  });
});
