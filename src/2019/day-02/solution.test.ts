import { describe, expect, test } from "vitest";
import { day02, runIntcode } from "./solution";

const testInput = [1, 1, 1, 4, 99, 5, 6, 0, 99];

describe("December 02", () => {
  test("runIntcode - test input", () => {
    expect(runIntcode(testInput)).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  test("silver - actual puzzle input", async () => {
    expect(day02.silver(await day02.readInput())).toBe(4138658);
  });

  test("gold - actual puzzle input", async () => {
    expect(day02.gold(await day02.readInput())).toBe(7264);
  });
});
