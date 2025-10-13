import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInputSilver = `12
14
1969
100756`;

const testInputGold = `14
1969
100756`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(silver(testInputSilver)).toBe(2 + 2 + 654 + 33583);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(3147032);
  });

  test("gold - test input", () => {
    expect(gold(testInputGold)).toBe(2 + 966 + 50346);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(4717699);
  });
});
