import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

const testInputSilver = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const testInputGold = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(testInputSilver)).toBe(142);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(54877);
  });

  test("gold - test input", () => {
    expect(day01.gold(testInputGold)).toBe(281);
  });

  test("gold - overlapping matches", () => {
    expect(day01.gold("fiveight")).toBe(58);
    expect(day01.gold("twone")).toBe(21);
    expect(day01.gold("eightwoneight")).toBe(88);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(54100);
  });
});
