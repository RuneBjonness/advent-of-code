import { describe, expect, test } from "bun:test";
import { day11 } from "./solution";

const testInput = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const testInputGold = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

describe("December 11", () => {
  test("silver - test input", () => {
    expect(day11.silver(testInput)).toBe(5);
  });

  test("silver - actual puzzle input", async () => {
    expect(day11.silver(await day11.readInput())).toBe(758);
  });

  test("gold - test input", () => {
    expect(day11.gold(testInputGold)).toBe(2);
  });

  test("gold - actual puzzle input", async () => {
    expect(day11.gold(await day11.readInput())).toBe(490695961032000);
  });
});
