import { expect, test } from "vitest";
import { silver, gold } from "./day-01.ts";
import { describe } from "node:test";

describe("December 01", () => {
  test("silver", () => {
    expect(silver("123")).toBe(123);
  });

  test("gold", () => {
    expect(gold("123")).toBe(246);
  });
});
