import { expect, test } from "vitest";
import { silver, gold } from "./solution.ts";
import { describe } from "node:test";

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe("December 02", () => {
  test("silver", () => {
    expect(silver(testInput)).toBe(8);
  });

  test("gold", () => {
    expect(gold(testInput)).toBe(2286);
  });
});
