import { describe, expect, test } from "vitest";
import { day11 } from "./solution";

const testInput = `125 17`;

describe("December 11", () => {
  test("silver - test input", () => {
    expect(day11.silver(testInput)).toBe(55312);
  });

  test("silver - actual puzzle input", async () => {
    expect(day11.silver(await day11.readInput())).toBe(193269);
  });

  test("gold - actual puzzle input", async () => {
    expect(day11.gold(await day11.readInput())).toBe(228449040027793);
  });
});
