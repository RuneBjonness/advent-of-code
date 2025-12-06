import { describe, expect, test } from "bun:test";
import { day05 } from "./solution";

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe("December 05", () => {
  test("silver - test input", () => {
    expect(day05.silver(testInput)).toBe(3);
  });

  test("silver - actual puzzle input", async () => {
    expect(day05.silver(await day05.readInput())).toBe(615);
  });

  test("gold - test input", () => {
    expect(day05.gold(testInput)).toBe(14);
  });

  test("gold - actual puzzle input", async () => {
    expect(day05.gold(await day05.readInput())).toBe(353716783056994);
  });
});
