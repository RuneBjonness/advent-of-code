import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const lp = getListPair(input);
  lp.list1.sort((a, b) => a - b);
  lp.list2.sort((a, b) => a - b);

  return lp.list1.reduce((acc, x, i) => acc + Math.abs(x - lp.list2[i]), 0);
};

const gold = (input: string): number => {
  const lp = getListPair(input);

  return lp.list1.reduce(
    (acc, x) => acc + x * occurencesInList(lp.list2, x),
    0
  );
};

export const day01 = new AocPuzzle(2024, 1, silver, gold);

type ListPair = {
  list1: number[];
  list2: number[];
};

const getListPair = (input: string): ListPair => {
  const lists = input.split("\n").map((line) => line.split("   ").map(Number));

  return lists.reduce(
    (acc: ListPair, [a, b]) => {
      acc.list1.push(a);
      acc.list2.push(b);
      return acc;
    },
    { list1: [], list2: [] }
  );
};

const occurencesInList = (list: number[], value: number): number => {
  return list.filter((n) => n === value).length;
};
