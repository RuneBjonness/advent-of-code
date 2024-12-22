import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const lines = input.split("\n");
  const registers: Register = {
    a: Number(lines[0].split(": ")[1]),
    b: Number(lines[1].split(": ")[1]),
    c: Number(lines[2].split(": ")[1]),
  };
  let program = lines[4].substring(9).split(",").map(Number);
  const out = runProgram(program, registers);

  return Number(out.join(""));
};

export const gold = (input: string): number => {
  return NaN;
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
    console.log(pointer, program[pointer], registers, out.join(""));

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
    registers.b = registers.b ^ operand;
    return null;
  },
  (operand, registers) => {
    registers.b = comboOperand(operand, registers) % 8;
    return null;
  },
  (operand, registers) => {
    if (registers.a !== 0) {
      return { out: null, pointer: operand };
    }
  },
  (_, registers) => {
    registers.b = registers.b ^ registers.c;
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
