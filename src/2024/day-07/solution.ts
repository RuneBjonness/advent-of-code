import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return totalCalibrationResult(input, [add, multiply]);
};

const gold = (input: string): number => {
  return totalCalibrationResult(input, [add, multiply, concatinate]);
};

export const day07 = new AocPuzzle(2024, 7, silver, gold);

type Operation = (a: number, b: number) => number;
const add: Operation = (a, b) => a + b;
const multiply: Operation = (a, b) => a * b;
const concatinate: Operation = (a, b) => Number(`${a}${b}`);

const totalCalibrationResult = (
  input: string,
  operations: Operation[]
): number => {
  return input
    .split("\n")
    .map((line) => {
      const [target, valueLine] = line.split(": ");
      const targetValue = Number(target);
      const values = valueLine.split(" ").map(Number);

      if (values.length < 2) {
        return 0;
      }

      return isEquationSolvable(
        values[0],
        values[1],
        operations,
        values.slice(2),
        targetValue
      )
        ? targetValue
        : 0;
    })
    .reduce((acc, value) => acc + value, 0);
};

const isEquationSolvable = (
  a: number,
  b: number,
  operations: Operation[],
  remainingValues: number[],
  target: number
): boolean => {
  const accumulatedValues = operations.map((operation) => operation(a, b));

  if (remainingValues.length === 0) {
    return accumulatedValues.includes(target);
  }

  const validValues = accumulatedValues.filter((value) => value <= target);

  if (validValues.length === 0) {
    return false;
  }

  return validValues.some((value) => {
    return isEquationSolvable(
      value,
      remainingValues[0],
      operations,
      remainingValues.slice(1),
      target
    );
  });
};
