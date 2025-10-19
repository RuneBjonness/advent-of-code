import { describe, expect, test } from "vitest";
import { silver, gold, nextSecret, nthSecret, prices } from "./solution";
import { input } from "./input";

const testInput = `1
10
100
2024`;

const testInputGold = `1
2
3
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

    expect(p.changes.length).toBe(9);

    expect(p.changes[0].delta).toBe(-3);
    expect(p.changes[0].price).toBe(0);

    expect(p.changes[1].delta).toBe(6);
    expect(p.changes[1].price).toBe(6);

    expect(p.changes[2].delta).toBe(-1);
    expect(p.changes[2].price).toBe(5);

    expect(p.changes[8].delta).toBe(-2);
    expect(p.changes[8].price).toBe(2);
  });

  test("gold - test input", () => {
    expect(gold(testInputGold)).toBe(23);
  });

  // test("gold - actual puzzle input", () => {
  //   expect(gold(input)).toBe(1582);
  // });
});
