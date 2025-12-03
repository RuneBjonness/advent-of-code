import { describe, expect, test } from "bun:test";
import { day22, nextSecret, nthSecret } from "./solution";

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
    expect(day22.silver(testInput)).toBe(37327623);
  });

  test("silver - actual puzzle input", async () => {
    expect(day22.silver(await day22.readInput())).toBe(13429191512);
  });

  test("gold - test input", () => {
    expect(day22.gold(testInputGold)).toBe(23);
  });

  test("gold - actual puzzle input", async () => {
    expect(day22.gold(await day22.readInput())).toBe(1582);
  });
});
