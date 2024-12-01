import { expect, test } from "vitest";
import { silver, gold } from "./solution.ts";
import { describe } from "node:test";

const testInput = `123`;

describe("December 00 (template)", () => {
  test("silver", () => {
    expect(silver(testInput)).toBe(123);
  });

  test("gold", () => {
    expect(gold(testInput)).toBe(246);
  });
});
