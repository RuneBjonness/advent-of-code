import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return input
    .split("\n")
    .map((bank) => maxJoltageRating(bank))
    .reduce((sum, rating) => sum + rating, 0);
};

const gold = (input: string): number => {
  return input
    .split("\n")
    .map((bank) =>
      Number(maxJoltageRatingRemaining(bank.split("").map(Number), 12))
    )
    .reduce((sum, rating) => sum + rating, 0);
};

export const day03 = new AocPuzzle(2025, 3, silver, gold);

const maxJoltageRating = (bank: string): number => {
  const batteries = bank.split("").map(Number);

  for (let i = 9; i > 0; i--) {
    const firstIndex = batteries.indexOf(i);
    if (firstIndex !== -1 && firstIndex < batteries.length - 1) {
      return i * 10 + Math.max(...batteries.slice(firstIndex + 1));
    }
  }
};

const maxJoltageRatingRemaining = (
  batteries: number[],
  remaining: number,
  ratings: string = ""
): string => {
  if (remaining === 1) {
    return ratings + Math.max(...batteries).toString();
  }
  for (let i = 9; i > 0; i--) {
    const idx = batteries.indexOf(i);
    if (idx !== -1 && idx < batteries.length - remaining + 1) {
      return maxJoltageRatingRemaining(
        batteries.slice(idx + 1),
        remaining - 1,
        ratings + i.toString()
      );
    }
  }
};
