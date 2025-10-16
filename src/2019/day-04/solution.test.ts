import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

describe("December 04", () => {
  test("silver - test input", () => {
    expect(silver("111111-111111")).toBe(1);
  });

  test("silver - test input 2", () => {
    expect(silver("223450-223450")).toBe(0);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(1150);
  });

  test("gold - test input", () => {
    expect(gold("123444-123444")).toBe(0);
  });

  test("gold - test input 2", () => {
    expect(gold("111122-111122")).toBe(1);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(748);
  });
});
