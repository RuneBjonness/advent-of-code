import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const [ruleSection, updateSection] = input.split("\n\n");

  const rules = ruleSection
    .split("\n")
    .map((rule) => rule.split("|").map(Number));

  return updateSection
    .split("\n")
    .map((update) => update.split(",").map(Number))
    .filter((update) => isValidUpdate(rules, update))
    .reduce((acc, update) => acc + update[(update.length - 1) / 2], 0);
};

const gold = (input: string): number => {
  const [ruleSection, updateSection] = input.split("\n\n");

  const rules = ruleSection
    .split("\n")
    .map((rule) => rule.split("|").map(Number));

  return updateSection
    .split("\n")
    .map((update) => update.split(",").map(Number))
    .filter((update) => !isValidUpdate(rules, update))
    .map((update) =>
      update.sort((a, b) => {
        if (
          rules
            .filter((rule) => rule[0] === a)
            .map((rule) => rule[1])
            .includes(b)
        ) {
          return -1;
        }
        if (
          rules
            .filter((rule) => rule[1] === a)
            .map((rule) => rule[0])
            .includes(b)
        ) {
          return 1;
        }
        return 0;
      })
    )
    .reduce((acc, update) => acc + update[(update.length - 1) / 2], 0);
};

export const day05 = new AocPuzzle(2024, 5, silver, gold);

const isValidUpdate = (rules: number[][], update: number[]): boolean => {
  for (let i = 0; i < update.length - 1; i++) {
    const laterOrderedPages = rules
      .filter((rule) => rule[0] === update[i])
      .map((rule) => rule[1]);
    if (update.slice(0, i).some((page) => laterOrderedPages.includes(page))) {
      return false;
    }

    const earlierOrderedPages = rules
      .filter((rule) => rule[1] === update[i])
      .map((rule) => rule[0]);
    if (
      update.slice(i + 1).some((page) => earlierOrderedPages.includes(page))
    ) {
      return false;
    }
  }
  return true;
};
