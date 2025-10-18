import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const program = input.split(",").map((x) => Number(x));

  const outputs = runIntcode(program, 1);

  return outputs[outputs.length - 1];
};

export const gold = (input: string): number => {
  const program = input.split(",").map((x) => Number(x));

  const outputs = runIntcode(program, 5);

  return outputs[outputs.length - 1];
};

export const day05 = new AocPuzzle(2019, 5, silver, gold, input);

const runIntcode = (p: number[], input = 0): number[] => {
  const outputs: number[] = [];
  let i = 0;

  let instruction = getInstruction(p[i]);

  while (instruction.opcode !== 99) {
    if (instruction.opcode === 1) {
      setProgramValue(
        p,
        i + 3,
        instruction.param3mode,
        getProgramValue(p, i + 1, instruction.param1mode) +
          getProgramValue(p, i + 2, instruction.param2mode)
      );
      i += 4;
    } else if (instruction.opcode === 2) {
      setProgramValue(
        p,
        i + 3,
        instruction.param3mode,
        getProgramValue(p, i + 1, instruction.param1mode) *
          getProgramValue(p, i + 2, instruction.param2mode)
      );
      i += 4;
    } else if (instruction.opcode === 3) {
      setProgramValue(p, i + 1, instruction.param1mode, input);
      i += 2;
    } else if (instruction.opcode === 4) {
      outputs.push(getProgramValue(p, i + 1, instruction.param1mode));
      i += 2;
    } else if (instruction.opcode === 5) {
      if (getProgramValue(p, i + 1, instruction.param1mode) !== 0) {
        i = getProgramValue(p, i + 2, instruction.param2mode);
      } else {
        i += 3;
      }
    } else if (instruction.opcode === 6) {
      if (getProgramValue(p, i + 1, instruction.param1mode) === 0) {
        i = getProgramValue(p, i + 2, instruction.param2mode);
      } else {
        i += 3;
      }
    } else if (instruction.opcode === 7) {
      setProgramValue(
        p,
        i + 3,
        instruction.param3mode,
        getProgramValue(p, i + 1, instruction.param1mode) <
          getProgramValue(p, i + 2, instruction.param2mode)
          ? 1
          : 0
      );
      i += 4;
    } else if (instruction.opcode === 8) {
      setProgramValue(
        p,
        i + 3,
        instruction.param3mode,
        getProgramValue(p, i + 1, instruction.param1mode) ===
          getProgramValue(p, i + 2, instruction.param2mode)
          ? 1
          : 0
      );
      i += 4;
    }
    instruction = getInstruction(p[i]);
  }
  return outputs;
};

enum ParameterMode {
  Position = 0,
  Immediate = 1,
}

type Instruction = {
  opcode: number;
  param1mode: ParameterMode;
  param2mode: ParameterMode;
  param3mode: ParameterMode;
};

const getInstruction = (instruction: number): Instruction => {
  const str = String(instruction).padStart(5, "0");
  const opcode = Number(str.slice(3));
  const param1mode = Number(str[2]) as ParameterMode;
  const param2mode = Number(str[1]) as ParameterMode;
  const param3mode = Number(str[0]) as ParameterMode;
  return { opcode, param1mode, param2mode, param3mode };
};

const getProgramValue = (
  p: number[],
  index: number,
  mode: ParameterMode
): number => {
  return mode === ParameterMode.Position ? p[p[index]] : p[index];
};

const setProgramValue = (
  p: number[],
  index: number,
  mode: ParameterMode,
  value: number
): void => {
  if (mode === ParameterMode.Position) {
    p[p[index]] = value;
  } else {
    console.error("Immediate mode not supported for write operations");
  }
};
