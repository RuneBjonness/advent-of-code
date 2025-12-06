import { describe, expect, test } from "bun:test";
import { day02 } from "./solution";

const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

describe("December 02", () => {
  test("silver - test input", () => {
    expect(day02.silver(testInput)).toBe(1227775554);
  });

  test("silver - actual puzzle input", async () => {
    expect(day02.silver(await day02.readInput())).toBe(24043483400);
  });

  test("gold - test input", () => {
    expect(day02.gold(testInput)).toBe(4174379265);
  });

  test("gold - actual puzzle input", async () => {
    expect(day02.gold(await day02.readInput())).toBe(38262920235);
  });
});
