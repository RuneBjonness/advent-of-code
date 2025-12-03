import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let countZeros = 0;
  let position = 50;

  const instructions = input.split("\n");
  for (const instruction of instructions) {
    position = rotate(instruction, position);
    if (position === 0) {
      countZeros++;
    }
  }
  return countZeros;
};

const gold = (input: string): number => {
  let countZeros = 0;
  let position = 50;

  const instructions = input.split("\n");
  for (const instruction of instructions) {
    const result = rotateAndCountRotations(instruction, position);
    countZeros += result.rotations;
    position = result.newPosition;
  }
  return countZeros;
};

export const day01 = new AocPuzzle(2025, 1, silver, gold);

const rotate = (instruction: string, fromPosition: number): number => {
  const dir = instruction[0];
  const length = Number(instruction.slice(1));

  if (dir === "L") {
    return (fromPosition - length) % 100;
  } else if (dir === "R") {
    return (fromPosition + length) % 100;
  }
};

type RotatationResult = {
  newPosition: number;
  rotations: number;
};

const rotateAndCountRotations = (
  instruction: string,
  fromPosition: number
): RotatationResult => {
  const dir = instruction[0];
  const length = Number(instruction.slice(1));
  let rotations = Math.floor(length / 100);

  if (dir === "L") {
    let newPosition = (fromPosition - length) % 100;
    if (newPosition < 0) {
      newPosition += 100;
    }
    if (
      newPosition === 0 ||
      (newPosition > fromPosition && fromPosition !== 0)
    ) {
      rotations++;
    }
    return {
      newPosition: newPosition,
      rotations: rotations,
    };
  } else if (dir === "R") {
    let newPosition = (fromPosition + length) % 100;
    if (newPosition >= 100) {
      newPosition -= 100;
    }
    if (newPosition === 0 || newPosition < fromPosition) {
      rotations++;
    }
    return {
      newPosition: newPosition,
      rotations: rotations,
    };
  }
};
