import { describe, expect, test } from "bun:test";
import { day15 } from "./solution";

const testInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

describe("December 15", () => {
  test("silver - test input", () => {
    expect(day15.silver(testInput)).toBe(40);
  });

  test("silver - actual puzzle input", async () => {
    expect(day15.silver(await day15.readInput())).toBe(609);
  });

  test("gold - test input", () => {
    expect(day15.gold(testInput)).toBe(315);
  });

  // test("gold - actual puzzle input", async () => {
  //   expect(day15.gold(await day15.readInput())).toBe(2925);
  // });
});
