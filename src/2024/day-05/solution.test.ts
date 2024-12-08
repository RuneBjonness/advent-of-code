import { describe, expect, test } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

describe("December 05", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(143);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(4281);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(123);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(5466);
  });
});
