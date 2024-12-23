import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  return countDesigns(input, (d, p) => (isValidDesign(d, p) ? 1 : 0));
};

export const gold = (input: string): number => {
  return countDesigns(input, countPossibleArrangements);
};

export const day19 = new AocPuzzle(2024, 19, silver, gold, input);

const countDesigns = (
  input: string,
  countFunction: (design: string, patterns: string[]) => number
): number => {
  const [patternsSection, designsSection] = input.split("\n\n");
  const patterns = patternsSection.split(", ");
  const designs = designsSection.split("\n");
  patterns.sort((a, b) => a.length - b.length);

  let count = 0;
  for (const design of designs) {
    const validPatterns = patterns.filter((pattern) =>
      design.includes(pattern)
    );
    count += countFunction(design, validPatterns);
  }
  return count;
};

const isValidDesign = (
  design: string,
  patterns: string[],
  unsolvable: string[] = []
): boolean => {
  if (design === "") {
    return true;
  }
  if (unsolvable.includes(design)) {
    return false;
  }
  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      if (isValidDesign(design.slice(pattern.length), patterns, unsolvable)) {
        return true;
      }
    }
  }
  unsolvable.push(design);
  return false;
};

const countPossibleArrangements = (
  design: string,
  patterns: string[],
  unsolvable: string[] = [],
  solutions: Record<string, number> = {}
): number => {
  if (design === "") {
    return 1;
  }
  if (unsolvable.includes(design)) {
    return 0;
  }
  if (solutions[design]) {
    return solutions[design];
  }
  let count = 0;
  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      count += countPossibleArrangements(
        design.slice(pattern.length),
        patterns,
        unsolvable,
        solutions
      );
    }
  }
  if (count === 0) {
    unsolvable.push(design);
  }
  solutions[design] = count;
  return count;
};
