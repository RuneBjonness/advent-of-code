import { expect, test, describe } from "bun:test";
import { day02 } from "./solution";

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

describe("December 02", () => {
  test("silver - test input", () => {
    expect(day02.silver(testInput)).toBe(150);
  });

  test("silver - actual puzzle input", async () => {
    expect(day02.silver(await day02.readInput())).toBe(2272262);
  });

  test("gold - test input", () => {
    expect(day02.gold(testInput)).toBe(900);
  });

  test("gold - actual puzzle input", async () => {
    expect(day02.gold(await day02.readInput())).toBe(2134882034);
  });
});
