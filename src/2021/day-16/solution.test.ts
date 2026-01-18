import { describe, expect, test } from "bun:test";
import { day16 } from "./solution";

const testInput1 = `8A004A801A8002F478`;
const testInput2 = `A0016C880162017C3686B18A3D4780`;

describe("December 16", () => {
  test("silver - test input 1", () => {
    expect(day16.silver(testInput1)).toBe(16);
  });

  test("silver - test input 2", () => {
    expect(day16.silver(testInput2)).toBe(31);
  });

  test("silver - actual puzzle input", async () => {
    expect(day16.silver(await day16.readInput())).toBe(871);
  });

  test("gold - test input 1", () => {
    expect(day16.gold(testInput1)).toBe(15);
  });

  test("gold - test input 2", () => {
    expect(day16.gold(testInput2)).toBe(54);
  });

  test("gold - actual puzzle input", async () => {
    expect(day16.gold(await day16.readInput())).toBe(68703010504);
  });
});
