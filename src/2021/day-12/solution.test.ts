import { describe, expect, test } from "bun:test";
import { day12 } from "./solution";

const testInput1 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const testInput2 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

describe("December 12", () => {
  test("silver - test input 1", () => {
    expect(day12.silver(testInput1)).toBe(19);
  });

  test("silver - test input 2", () => {
    expect(day12.silver(testInput2)).toBe(226);
  });

  test("silver - actual puzzle input", async () => {
    expect(day12.silver(await day12.readInput())).toBe(3292);
  });

  test("gold - test input 1", () => {
    expect(day12.gold(testInput1)).toBe(103);
  });

  test("gold - test input 2", () => {
    expect(day12.gold(testInput2)).toBe(3509);
  });

  test("gold - actual puzzle input", async () => {
    expect(day12.gold(await day12.readInput())).toBe(89592);
  });
});
