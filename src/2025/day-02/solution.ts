import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return sumInvalidIds(input, true);
};

const gold = (input: string): number => {
  return sumInvalidIds(input, false);
};

export const day02 = new AocPuzzle(2025, 2, silver, gold);

const sumInvalidIds = (input: string, justTwoParts?: boolean): number => {
  return input
    .split(",")
    .map((x) => x.split("-").map(Number))
    .map(([start, end]) => sumInvalidIdsInRange(start, end, justTwoParts))
    .reduce((acc, x) => acc + x, 0);
};

const sumInvalidIdsInRange = (
  start: number,
  end: number,
  justTwoParts?: boolean
): number => {
  let sum = 0;
  let numDigits = Math.floor(Math.log10(start)) + 1;
  const numDigitsEnd = Math.floor(Math.log10(end)) + 1;

  while (numDigits <= numDigitsEnd) {
    const maxParts = justTwoParts ? 2 : numDigits;
    const repeatedNumbers: number[] = [];
    for (let parts = 2; parts <= maxParts; parts++) {
      if (numDigits % parts !== 0) {
        continue;
      }
      const from = Math.max(start, 10 ** (numDigits - 1));
      const to = Math.min(end, 10 ** numDigits - 1);

      const numDigitsPerPart = numDigits / parts;
      const divisor = 10 ** (numDigits - numDigitsPerPart);

      const firstPartStart = Math.floor(from / divisor);
      const firstPartEnd = Math.floor(to / divisor);

      for (
        let firstPart = firstPartStart;
        firstPart <= firstPartEnd;
        firstPart++
      ) {
        const repeatedNumber = constructNumber(firstPart, parts);
        if (repeatedNumber >= from && repeatedNumber <= to) {
          if (maxParts > 2 && repeatedNumbers.includes(repeatedNumber)) {
            continue;
          }
          repeatedNumbers.push(repeatedNumber);
          sum += repeatedNumber;
        }
      }
    }
    numDigits++;
  }
  return sum;
};

const constructNumber = (repeatedPart: number, count: number): number => {
  let number = 0;
  let multiplier = 1;
  const baseMultiplier = 10 ** Math.floor(Math.log10(repeatedPart) + 1);

  for (let i = 0; i < count; i++) {
    number += repeatedPart * multiplier;
    multiplier *= baseMultiplier;
  }
  return number;
};
