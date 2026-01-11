import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver("+1\n+1\n+1")).toBe(3);
    expect(day01.silver("+1\n+1\n-2")).toBe(0);
    expect(day01.silver("-1\n-2\n-3")).toBe(-6);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(540);
  });

  test("gold - test input", () => {
    expect(day01.gold("+1\n-1")).toBe(0);
    expect(day01.gold("+3\n+3\n+4\n-2\n-4")).toBe(10);
    expect(day01.gold("-6\n+3\n+8\n+5\n-6")).toBe(5);
    expect(day01.gold("+7\n+7\n-2\n-7\n-4")).toBe(14);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(73056);
  });
});
