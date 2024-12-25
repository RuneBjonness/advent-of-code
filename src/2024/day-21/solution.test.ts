import { describe, expect, test } from "vitest";
import {
  silver,
  gold,
  dirKeysToPressNumPadKey,
  dirKeysToPressDirKey,
  dirKeysForNumPadCode,
  dirKeysForDirKeySequence,
} from "./solution";
import { input } from "./input";

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
    expect(silver(testInput)).toBe(126384);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(238078);
  });

  // test("gold - actual puzzle input", () => {
  //   expect(gold(input)).toBe(22222);
  // });
});
