import { expect, test } from "vitest";
import { silver, gold } from "./solution.ts";
import { describe } from "node:test";

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
  test("silver", () => {
    expect(silver(testInputSilver)).toBe(142);
  });

  test("gold", () => {
    expect(gold(testInputGold)).toBe(281);
  });

  test("gold: overlapping matches", () => {
    expect(gold("fiveight")).toBe(58);
    expect(gold("twone")).toBe(21);
    expect(gold("eightwoneight")).toBe(88);
  });
});
