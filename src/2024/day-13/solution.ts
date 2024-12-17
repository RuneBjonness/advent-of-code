import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";
import { vec2, Vec2 } from "@/lib/vec2";

export const silver = (input: string): number => {
  return parseInput(input).reduce((acc, m) => acc + tokenCostMachine(m), 0);
};

export const gold = (input: string): number => {
  return parseInput(input, 10000000000000).reduce(
    (acc, m) => acc + tokenCostMachine(m),
    0
  );
};

export const day13 = new AocPuzzle(2024, 13, silver, gold, input);

type Machine = { a: Vec2; b: Vec2; prize: Vec2 };

const parseInput = (input: string, prizeAdjustment = 0): Machine[] => {
  return input.split("\n\n").map((section) => {
    const m = { a: vec2(), b: vec2(), prize: vec2() };
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

const tokenCostMachine = (m: Machine): number => {
  const ax = m.a.x;
  const ay = m.a.y;
  const bx = m.b.x;
  const by = m.b.y;
  const px = m.prize.x;
  const py = m.prize.y;

  const j = (px * ay - py * ax) / (bx * ay - by * ax);
  const i = (px - bx * j) / ax;

  if (i < 0 || j < 0 || i % 1 !== 0 || j % 1 !== 0) {
    return 0;
  }

  return i * 3 + j;
};
