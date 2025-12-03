import { describe, expect, test } from "bun:test";
import { day17, runProgram } from "./solution";

const testInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const testInputGold = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

describe("December 17", () => {
  test("runProgram - sample 1", () => {
    const registers = { a: 0, b: 0, c: 9 };
    const program = [2, 6];
    runProgram(program, registers);
    expect(registers.b).toBe(1);
  });

  test("runProgram - sample 2", () => {
    const registers = { a: 10, b: 0, c: 0 };
    const program = [5, 0, 5, 1, 5, 4];
    const out = runProgram(program, registers);
    expect(out).toStrictEqual([0, 1, 2]);
  });

  test("runProgram - sample 3", () => {
    const registers = { a: 2024, b: 0, c: 0 };
    const program = [0, 1, 5, 4, 3, 0];
    const out = runProgram(program, registers);
    expect(registers.a).toBe(0);
    expect(out).toStrictEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
  });

  test("runProgram - sample 4", () => {
    const registers = { a: 0, b: 29, c: 0 };
    const program = [1, 7];
    runProgram(program, registers);
    expect(registers.b).toBe(26);
  });

  test("runProgram - sample 5", () => {
    const registers = { a: 0, b: 2024, c: 43690 };
    const program = [4, 0];
    runProgram(program, registers);
    expect(registers.b).toBe(44354);
  });

  test("silver - test input", () => {
    expect(day17.silver(testInput)).toBe("4,6,3,5,6,3,5,2,1,0");
  });

  test("silver - actual puzzle input", async () => {
    expect(day17.silver(await day17.readInput())).toBe("6,2,7,2,3,1,6,0,5");
  });

  test("gold - test input", () => {
    expect(day17.gold(testInputGold)).toBe(117440);
  });

  test("gold - actual puzzle input", async () => {
    expect(day17.gold(await day17.readInput())).toBe(236548287712877);
  });
});
