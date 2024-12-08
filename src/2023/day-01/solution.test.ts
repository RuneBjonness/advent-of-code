import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

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
    expect(silver(testInputSilver)).toBe(142);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(54877);
  });

  test("gold - test input", () => {
    expect(gold(testInputGold)).toBe(281);
  });

  test("gold - overlapping matches", () => {
    expect(gold("fiveight")).toBe(58);
    expect(gold("twone")).toBe(21);
    expect(gold("eightwoneight")).toBe(88);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(54100);
  });
});
