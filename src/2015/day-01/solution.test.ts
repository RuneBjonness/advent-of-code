import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(")())())")).toBe(-3);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(232);
  });

  test("gold - test input", () => {
    expect(day01.gold(")")).toBe(1);
    expect(day01.gold("()())")).toBe(5);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(1783);
  });
});
