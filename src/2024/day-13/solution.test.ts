import { describe, expect, test } from "bun:test";
import { day13 } from "./solution";

const testInput = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

describe("December 13", () => {
  test("silver - test input", () => {
    expect(day13.silver(testInput)).toBe(480);
  });

  test("silver - actual puzzle input", async () => {
    expect(day13.silver(await day13.readInput())).toBe(26810);
  });

  test("gold - actual puzzle input", async () => {
    expect(day13.gold(await day13.readInput())).toBe(108713182988244);
  });
});
