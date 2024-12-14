import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `125 17`;

describe("December 11", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(55312);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(193269);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(228449040027793);
  });
});
