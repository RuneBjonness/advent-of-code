import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): string => {
  const lines = input.split("\n");
  const registers: Register = {
    a: Number(lines[0].split(": ")[1]),
    b: Number(lines[1].split(": ")[1]),
    c: Number(lines[2].split(": ")[1]),
  };
  let program = lines[4].substring(9).split(",").map(Number);
  const out = runProgram(program, registers);

  return out.join(",");
};

export const gold = (input: string): number => {
  const lines = input.split("\n");
  const registers: Register = {
    a: Number(lines[0].split(": ")[1]),
    b: Number(lines[1].split(": ")[1]),
    c: Number(lines[2].split(": ")[1]),
  };
  const programString = lines[4].substring(9);
  const program = programString.split(",").map(Number);

  const base3digits: number[] = [];

  let currentDigits = 0;
  let pos = program.length - 1;
  let b3Digit = 0;

  while (pos >= 0 && pos < program.length) {
    let found = false;
    while (b3Digit < 8 && !found) {
      registers.a = [...base3digits, b3Digit].reduce(
        (acc, x, idx) => acc + x * Math.pow(8, currentDigits - idx),
        0
      );
      const out = runProgram(program, registers).join(",");
      if (out === programString.slice(pos * 2)) {
        found = true;
      } else {
        b3Digit++;
      }
    }

    if (found) {
      base3digits.push(b3Digit);
      b3Digit = 0;
      currentDigits++;
      pos--;
    } else {
      b3Digit = base3digits.pop() + 1;
      currentDigits--;
      pos++;
    }
  }

  return base3digits.reduce(
    (acc, bit, idx) => acc + bit * Math.pow(8, currentDigits - 1 - idx),
    0
  );
};

export const day17 = new AocPuzzle(2024, 17, silver, gold, input);

type Register = {
  a: number;
  b: number;
  c: number;
};

type Instruction = (operand: number, registers: Register) => Result | null;

type Result = {
  out: number | null;
  pointer: number | null;
};

export const runProgram = (
  program: number[],
  registers: Register
): number[] => {
  let pointer = 0;
  const out: number[] = [];
  while (pointer < program.length) {
    const result = instructions[program[pointer]](
      program[pointer + 1],
      registers
    );
    if (result?.out != null) {
      out.push(result.out);
    }

    if (result?.pointer != null) {
      pointer = result.pointer;
    } else {
      pointer += 2;
    }
  }

  return out;
};

const instructions: Instruction[] = [
  (operand, registers) => {
    registers.a = Math.floor(
      registers.a / Math.pow(2, comboOperand(operand, registers))
    );
    return null;
  },
  (operand, registers) => {
    registers.b = (registers.b ^ operand) >>> 0;
    return null;
  },
  (operand, registers) => {
    registers.b = comboOperand(operand, registers) % 8;
    return null;
  },
  (operand, registers) => {
    return registers.a !== 0 ? { out: null, pointer: operand } : null;
  },
  (_, registers) => {
    registers.b = (registers.b ^ registers.c) >>> 0;
    return null;
  },
  (operand, registers) => {
    return { out: comboOperand(operand, registers) % 8, pointer: null };
  },
  (operand, registers) => {
    registers.b = Math.floor(
      registers.a / Math.pow(2, comboOperand(operand, registers))
    );
    return null;
  },
  (operand, registers) => {
    registers.c = Math.floor(
      registers.a / Math.pow(2, comboOperand(operand, registers))
    );
    return null;
  },
];

const comboOperand = (operand: number, registers: Register): number => {
  if (operand < 4) {
    return operand;
  } else if (operand === 4) {
    return registers.a;
  } else if (operand === 5) {
    return registers.b;
  } else if (operand === 6) {
    return registers.c;
  } else {
    console.log("Invalid combo operand 7");
    return 0;
  }
};
