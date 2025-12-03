import { expect, test, describe } from "bun:test";
import { day04 } from "./solution";

describe("December 04", () => {
  test("silver - test input", () => {
    expect(day04.silver("111111-111111")).toBe(1);
  });

  test("silver - test input 2", () => {
    expect(day04.silver("223450-223450")).toBe(0);
  });

  test("silver - actual puzzle input", async () => {
    expect(day04.silver(await day04.readInput())).toBe(1150);
  });

  test("gold - test input", () => {
    expect(day04.gold("123444-123444")).toBe(0);
  });

  test("gold - test input 2", () => {
    expect(day04.gold("111122-111122")).toBe(1);
  });

  test("gold - actual puzzle input", async () => {
    expect(day04.gold(await day04.readInput())).toBe(748);
  });
});
