import { describe, expect, test } from "bun:test";
import { day07 } from "./solution";

const testInput = `16,1,2,0,4,2,7,1,2,14`;

describe("December 07", () => {
  test("silver - test input", () => {
    expect(day07.silver(testInput)).toBe(37);
  });

  test("silver - actual puzzle input", async () => {
    expect(day07.silver(await day07.readInput())).toBe(355592);
  });

  test("gold - test input", () => {
    expect(day07.gold(testInput)).toBe(168);
  });

  test("gold - actual puzzle input", async () => {
    expect(day07.gold(await day07.readInput())).toBe(101618069);
  });
});
