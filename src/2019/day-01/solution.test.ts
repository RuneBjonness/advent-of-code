import { expect, test, describe } from "bun:test";
import { day01 } from "./solution";

const testInputSilver = `12
14
1969
100756`;

const testInputGold = `14
1969
100756`;

describe("December 01", () => {
  test("silver - test input", () => {
    expect(day01.silver(testInputSilver)).toBe(2 + 2 + 654 + 33583);
  });

  test("silver - actual puzzle input", async () => {
    expect(day01.silver(await day01.readInput())).toBe(3147032);
  });

  test("gold - test input", () => {
    expect(day01.gold(testInputGold)).toBe(2 + 966 + 50346);
  });

  test("gold - actual puzzle input", async () => {
    expect(day01.gold(await day01.readInput())).toBe(4717699);
  });
});
