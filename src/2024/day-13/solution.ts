import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const machines = parseInput(input);

  const costA = 3;
  const costB = 1;
  const maxTokens = 400;

  let tokens = 0;
  for (const m of machines) {
    const maxPushesA = Math.floor(
      Math.min(m.prize.x / m.a.x, m.prize.y / m.a.y, 100)
    );
    const maxPushesB = Math.floor(
      Math.min(m.prize.x / m.b.x, m.prize.y / m.b.y, 100)
    );

    let minTokens = maxTokens + 1;
    for (let pushesA = 0; pushesA <= maxPushesA; pushesA++) {
      for (let pushesB = 0; pushesB <= maxPushesB; pushesB++) {
        const x = m.a.x * pushesA + m.b.x * pushesB;
        const y = m.a.y * pushesA + m.b.y * pushesB;
        if (x === m.prize.x && y === m.prize.y) {
          minTokens = Math.min(minTokens, pushesA * costA + pushesB * costB);
        }
      }
    }
    if (minTokens < maxTokens) {
      tokens += minTokens;
    }
  }
  return tokens;
};

export const gold = (input: string): number => {
  const machines = parseInput(input, 10000000000000);

  // console.log(machines);

  const costA = 3;
  const costB = 1;

  let tokens = 0;
  for (const m of machines) {
    const maxPushesA = Math.floor(
      Math.min(m.prize.x / m.a.x, m.prize.y / m.a.y)
    );
    const maxPushesB = Math.floor(
      Math.min(m.prize.x / m.b.x, m.prize.y / m.b.y)
    );
    const maxTokens = maxPushesA * costA + maxPushesB * costB;

    const remainingAfterMaxPushesB = {
      x: m.prize.x - m.b.x * maxPushesB,
      y: m.prize.y - m.b.y * maxPushesB,
    };
    const minPushesA = Math.floor(
      Math.max(
        remainingAfterMaxPushesB.x / m.a.x,
        remainingAfterMaxPushesB.y / m.a.y
      )
    );

    // console.log(maxPushesA - minPushesA, minPushesA, maxPushesA);

    let minTokens = maxTokens + 1;

    // for (let pushesA = minPushesA; pushesA <= maxPushesA; pushesA++) {
    //   const remainingX = m.prize.x - m.a.x * pushesA;
    //   const pushesB = Math.floor(remainingX / m.b.x);
    //   const x = m.a.x * pushesA + m.b.x * pushesB;
    //   const y = m.a.y * pushesA + m.b.y * pushesB;
    //   if (x === m.prize.x && y === m.prize.y) {
    //     minTokens = Math.min(minTokens, pushesA * costA + pushesB * costB);
    //   }
    // }

    if (minTokens < maxTokens) {
      tokens += minTokens;
    }
  }
  // return tokens;
  return NaN;
};

export const day13 = new AocPuzzle(2024, 13, silver, gold, input);

type Vec2 = { x: number; y: number };
type Machine = { a: Vec2; b: Vec2; prize: Vec2 };

const parseInput = (input: string, prizeAdjustment = 0): Machine[] => {
  return input.split("\n\n").map((section) => {
    const m = { a: { x: 0, y: 0 }, b: { x: 0, y: 0 }, prize: { x: 0, y: 0 } };
    section.split("\n").forEach((line) => {
      const [x, y] = line.match(/(\d+)/g)!.map(Number);
      if (line.startsWith("Button A")) {
        m.a = { x, y };
      } else if (line.startsWith("Button B")) {
        m.b = { x, y };
      } else {
        m.prize = { x: x + prizeAdjustment, y: y + prizeAdjustment };
      }
    });
    return m;
  });
};
