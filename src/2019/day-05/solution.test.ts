import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

describe("December 05", () => {
  test("silver - test input", () => {
    expect(silver("3,0,4,0,99")).toBe(1);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(4511442);
  });

  test("gold - test input", () => {
    expect(
      gold(
        "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
      )
    ).toBe(999);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(12648139);
  });
});
