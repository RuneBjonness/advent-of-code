import { describe, expect, test } from "bun:test";
import { day06 } from "./solution";

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

describe("December 06", () => {
  test("silver - test input", () => {
    expect(day06.silver(testInput)).toBe(4277556);
  });

  test("silver - actual puzzle input", async () => {
    expect(day06.silver(await day06.readInput())).toBe(4405895212738);
  });

  test("gold - test input", () => {
    expect(day06.gold(testInput)).toBe(3263827);
  });

  test("gold - actual puzzle input", async () => {
    expect(day06.gold(await day06.readInput())).toBe(7450962489289);
  });
});
