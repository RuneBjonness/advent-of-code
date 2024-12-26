import { describe, expect, test } from "vitest";
import { silver, gold, nextSecret, nthSecret, prices } from "./solution";
import { input } from "./input";

const testInput = `1
10
100
2024`;

describe("December 22", () => {
  test("nextSecret", () => {
    expect(nextSecret(123)).toBe(15887950);
    expect(nextSecret(15887950)).toBe(16495136);
    expect(nextSecret(16495136)).toBe(527345);
    expect(nextSecret(12683156)).toBe(11100544);
    expect(nextSecret(7753432)).toBe(5908254);
  });

  test("nthSecret", () => {
    expect(nthSecret(123, 10)).toBe(5908254);
    expect(nthSecret(1, 2000)).toBe(8685429);
    expect(nthSecret(10, 2000)).toBe(4700978);
    expect(nthSecret(100, 2000)).toBe(15273692);
    expect(nthSecret(2024, 2000)).toBe(8667524);
  });

  test("silver - test input", () => {
    expect(silver(testInput)).toBe(37327623);
  });

  test("silver - actual puzzle input", () => {
    expect(silver(input)).toBe(13429191512);
  });

  test("prices", () => {
    const p = prices(123, 9);

    expect(p.length).toBe(9);

    expect(p[0][0]).toBe(-3);
    expect(p[0][1]).toBe(0);

    expect(p[1][0]).toBe(6);
    expect(p[1][1]).toBe(6);

    expect(p[2][0]).toBe(-1);
    expect(p[2][1]).toBe(5);

    expect(p[8][0]).toBe(-2);
    expect(p[8][1]).toBe(2);
  });

  test("gold - test input", () => {
    expect(gold(testInput)).toBe(246);
  });

  // test("gold - actual puzzle input", () => {
  //   expect(gold(input)).toBe(22222);
  // });
});
