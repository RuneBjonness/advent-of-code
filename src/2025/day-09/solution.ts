import { AocPuzzle } from "@/aoc-puzzle";
import { vec2, Vec2 } from "@/lib/vec2";

const silver = (input: string): number => {
  const positions: Vec2[] = input
    .split("\n")
    .map((line) => vec2(...line.split(",").map(Number)));

  let maxArea = 0;
  for (let a = 0; a < positions.length - 1; a++) {
    for (let b = a + 1; b < positions.length; b++) {
      const area =
        (Math.abs(positions[b].x - positions[a].x) + 1) *
        (Math.abs(positions[b].y - positions[a].y) + 1);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
  return maxArea;
};

const gold = (input: string): number => {
  return NaN;
};

export const day09 = new AocPuzzle(2025, 9, silver, gold);
