import { expect, test } from "vitest";
import { silver, gold } from "./solution.ts";
import { describe } from "node:test";

describe("December 00 (template)", () => {
  test("silver", () => {
    expect(silver("123")).toBe(123);
  });

  test("gold", () => {
    expect(gold("123")).toBe(246);
  });
});
