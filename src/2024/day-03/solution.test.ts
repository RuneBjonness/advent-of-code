import { describe, expect, test } from "vitest";
import { day03 } from "./solution";

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testInputGold = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

describe("December 03", () => {
  test("silver - test input", () => {
    expect(day03.silver(testInput)).toBe(161);
  });

  test("silver - actual puzzle input", async () => {
    expect(day03.silver(await day03.readInput())).toBe(174561379);
  });

  test("gold - test input", () => {
    expect(day03.gold(testInputGold)).toBe(48);
  });

  test("gold - actual puzzle input", async () => {
    expect(day03.gold(await day03.readInput())).toBe(106921067);
  });
});
