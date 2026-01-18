import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const sections = input.split("\n\n");
  const template = sections[0];

  let rules = [];
  sections[1].split("\n").forEach((r) => {
    rules.push(r.split(" -> "));
  });
  let counter = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
    N: 0,
    O: 0,
    P: 0,
    Q: 0,
    R: 0,
    S: 0,
    T: 0,
    U: 0,
    V: 0,
    W: 0,
    X: 0,
    Y: 0,
    Z: 0,
  };
  template.split("").forEach((s) => counter[s]++);

  for (let i = 0; i < template.length - 1; i++) {
    countSilver(template[i] + template[i + 1], rules, counter, 10);
  }
  let counterArr = Object.values(counter).filter((c) => c > 0);
  let min = Math.min(...counterArr);
  let max = Math.max(...counterArr);

  return max - min;
};

const gold = (input: string): number => {
  const sections = input.split("\n\n");
  const template = sections[0];
  let rules = [];
  sections[1].split("\n").forEach((r) => {
    rules.push(r.split(" -> "));
  });

  let currentPairs: Record<string, Record<string, number>> = {};
  rules.forEach(
    (r) =>
      (currentPairs[r[0]] = {
        B: 0,
        C: 0,
        F: 0,
        H: 0,
        K: 0,
        N: 0,
        O: 0,
        P: 0,
        S: 0,
        V: 0,
      }),
  );
  let totalPairs: Record<string, Record<string, number>> = {};
  rules.forEach(
    (r) =>
      (totalPairs[r[0]] = {
        B: 0,
        C: 0,
        F: 0,
        H: 0,
        K: 0,
        N: 0,
        O: 0,
        P: 0,
        S: 0,
        V: 0,
      }),
  );

  for (let i = 0; i < 40; i++) {
    rules.forEach(
      (r) => (totalPairs[r[0]] = countGold(r[0], rules, currentPairs)),
    );
    Object.entries(totalPairs).forEach(
      ([key, value]) => (currentPairs[key] = { ...value }),
    );
  }

  let counter: Record<string, number> = {
    B: 0,
    C: 0,
    F: 0,
    H: 0,
    K: 0,
    N: 0,
    O: 0,
    P: 0,
    S: 0,
    V: 0,
  };
  template.split("").forEach((s) => counter[s]++);
  for (let i = 0; i < template.length - 1; i++) {
    Object.entries(totalPairs[template[i] + template[i + 1]]).forEach(
      ([key, value]) => (counter[key] += value),
    );
  }

  let counterArr = Object.values(counter).filter((c) => c > 0);
  let min = Math.min(...counterArr);
  let max = Math.max(...counterArr);

  return max - min;
};

export const day14 = new AocPuzzle(2021, 14, silver, gold);

function countGold(
  pair: string,
  rules: string[][],
  pairCounters: Record<string, Record<string, number>>,
): Record<string, number> {
  let res = { B: 0, C: 0, F: 0, H: 0, K: 0, N: 0, O: 0, P: 0, S: 0, V: 0 };
  let insert = rules.find((r) => r[0] == pair)[1];
  res[insert]++;
  Object.entries(pairCounters[pair[0] + insert]).forEach(
    ([key, value]) => (res[key] += value),
  );
  Object.entries(pairCounters[insert + pair[1]]).forEach(
    ([key, value]) => (res[key] += value),
  );

  return res;
}

function countSilver(
  pair: string,
  rules: string[][],
  counter: Record<string, number>,
  steps: number,
) {
  if (steps == 0) {
    return;
  }

  let insert = rules.find((r) => r[0] == pair)[1];
  counter[insert]++;
  countSilver(pair[0] + insert, rules, counter, steps - 1);
  countSilver(insert + pair[1], rules, counter, steps - 1);
}
