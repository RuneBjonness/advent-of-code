import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution.ts";
import { input } from "./input.ts";

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testInputGold = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

describe("December 03", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(161);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(174561379);
  });

  test("gold - test input", () => {
    expect(gold(testInputGold)).toBe(48);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(106921067);
  });
});
