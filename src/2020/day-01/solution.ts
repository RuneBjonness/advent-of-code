import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const numbers = input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = numbers.length - 1; j > i; j--) {
      const sum = numbers[i] + numbers[j];
      if (sum === 2020) {
        return numbers[i] * numbers[j];
      } else if (sum < 2020) {
        break;
      }
    }
  }
  return 0;
};

const gold = (input: string): number => {
  const numbers = input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const partialSum = numbers[i] + numbers[j];
      for (let k = numbers.length - 1; k > i; k--) {
        const sum = partialSum + numbers[k];
        if (sum === 2020) {
          return numbers[i] * numbers[j] * numbers[k];
        } else if (sum < 2020) {
          break;
        }
      }
    }
  }
  return 0;
};

export const day01 = new AocPuzzle(2020, 1, silver, gold);
