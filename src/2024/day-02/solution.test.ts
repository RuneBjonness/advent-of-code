import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe("December 02", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(2);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(407);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(4);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(459);
  });
});
