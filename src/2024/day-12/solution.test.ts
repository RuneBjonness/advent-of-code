import { describe, expect, test } from "vitest";
import { day12 } from "./solution";

const testInput1 = `AAAA
BBCD
BBCC
EEEC`;

const testInput2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

const testInput3 = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`;

const testInput4 = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

const testInputLarge = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

describe("December 12", () => {
  test("silver - test input 1", () => {
    expect(day12.silver(testInput1)).toBe(140);
  });

  test("silver - test input 2", () => {
    expect(day12.silver(testInput2)).toBe(772);
  });

  test("silver - test input large", () => {
    expect(day12.silver(testInputLarge)).toBe(1930);
  });

  test("silver - actual puzzle input", async () => {
    expect(day12.silver(await day12.readInput())).toBe(1449902);
  });

  test("gold - test input 1", () => {
    expect(day12.gold(testInput1)).toBe(80);
  });

  test("gold - test input 2", () => {
    expect(day12.gold(testInput2)).toBe(436);
  });

  test("gold - test input 3", () => {
    expect(day12.gold(testInput3)).toBe(236);
  });

  test("gold - test input 4", () => {
    expect(day12.gold(testInput4)).toBe(368);
  });

  test("gold - test input large", () => {
    expect(day12.gold(testInputLarge)).toBe(1206);
  });

  test("gold - actual puzzle input", async () => {
    expect(day12.gold(await day12.readInput())).toBe(908042);
  });
});
