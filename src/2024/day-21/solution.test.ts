import { describe, expect, test } from "bun:test";
import {
  day21,
  dirKeysToPressNumPadKey,
  dirKeysToPressDirKey,
  dirKeysForNumPadCode,
  dirKeysForDirKeySequence,
} from "./solution";

const testInput = `029A
980A
179A
456A
379A`;

describe("December 21", () => {
  test("dirKeysToPressNumPadKey", () => {
    expect(dirKeysToPressNumPadKey("5", "5")).toEqual(["A"]);
    expect(dirKeysToPressNumPadKey("A", "0")).toEqual(["<A"]);
    expect(dirKeysToPressNumPadKey("2", "9")).toEqual(["^^>A", ">^^A"]);
  });

  test("dirKeysForNumPadCode", () => {
    expect(dirKeysForNumPadCode("029A")).toEqual([
      ["<A"],
      ["^A"],
      ["^^>A", ">^^A"],
      ["vvvA"],
    ]);
  });

  test("dirKeysToPressDirKey", () => {
    expect(dirKeysToPressDirKey(">", ">")).toEqual(["A"]);
    expect(dirKeysToPressDirKey("A", "<")).toEqual(["v<<A"]);
  });

  test("dirKeysForDirKeySequence", () => {
    expect(dirKeysForDirKeySequence("<A")).toEqual([["v<<A"], [">>^A"]]);
  });

  test("silver - test input", () => {
    expect(day21.silver(testInput)).toBe(126384);
  });

  test("silver - actual puzzle input", async () => {
    expect(day21.silver(await day21.readInput())).toBe(238078);
  });

  test("gold - actual puzzle input", async () => {
    expect(day21.gold(await day21.readInput())).toBe(293919502998014);
  });
});
