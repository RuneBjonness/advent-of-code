import { describe, expect, test } from "bun:test";
import { day14 } from "./solution";

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe("December 14", () => {
  test("silver - test input", () => {
    expect(day14.silver(testInput)).toBe(1588);
  });

  test("silver - actual puzzle input", async () => {
    expect(day14.silver(await day14.readInput())).toBe(4244);
  });

  test("gold - test input", () => {
    expect(day14.gold(testInput)).toBe(2188189693529);
  });

  test("gold - actual puzzle input", async () => {
    expect(day14.gold(await day14.readInput())).toBe(4807056953866);
  });
});
