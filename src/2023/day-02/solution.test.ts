import { describe, expect, test } from "bun:test";
import { day02 } from "./solution";

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe("December 02", () => {
  test("silver - test input", () => {
    expect(day02.silver(testInput)).toBe(8);
  });

  test("silver - actual puzzle input", async () => {
    expect(day02.silver(await day02.readInput())).toBe(3059);
  });

  test("gold - test input", () => {
    expect(day02.gold(testInput)).toBe(2286);
  });

  test("gold - actual puzzle input", async () => {
    expect(day02.gold(await day02.readInput())).toBe(65371);
  });
});
