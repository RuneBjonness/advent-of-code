import { describe, expect, test } from "bun:test";
import { day17 } from "./solution";

const testInput = `target area: x=20..30, y=-10..-5`;

describe("December 17", () => {
  test("silver - test input", () => {
    expect(day17.silver(testInput)).toBe(45);
  });

  test("silver - actual puzzle input", async () => {
    expect(day17.silver(await day17.readInput())).toBe(6555);
  });

  test("gold - test input", () => {
    expect(day17.gold(testInput)).toBe(112);
  });

  test("gold - actual puzzle input", async () => {
    expect(day17.gold(await day17.readInput())).toBe(4973);
  });
});
