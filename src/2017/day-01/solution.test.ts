import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver("1122")).toBe(3);
    expect(day01.silver("1111")).toBe(4);
    expect(day01.silver("1234")).toBe(0);
    expect(day01.silver("91212129")).toBe(9);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(1097);
  });

  test("gold - test input", () => {
    expect(day01.gold("1212")).toBe(6);
    expect(day01.gold("1221")).toBe(0);
    expect(day01.gold("123425")).toBe(4);
    expect(day01.gold("123123")).toBe(12);
    expect(day01.gold("12131415")).toBe(4);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(1188);
  });
});
