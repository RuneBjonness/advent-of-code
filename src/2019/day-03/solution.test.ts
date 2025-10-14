import { expect, test, describe } from "vitest";
import { silver, gold } from "./solution";
import { input } from "./input";

const testInput = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;

const testInput2 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

describe("December 03", () => {
  test("silver - test input", () => {
    expect(silver(testInput)).toBe(159);
  });

  test("silver - test input 2", () => {
    expect(silver(testInput2)).toBe(135);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(721);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(610);
  });

  test("gold - test input 2", () => {
    expect(gold(testInput2)).toBe(410);
  });

  test("gold - actual puzzle input", () => {
    expect(gold(input)).toBe(7388);
  });
});
