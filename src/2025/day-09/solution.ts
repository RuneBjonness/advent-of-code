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

type Edge = { min: number; max: number; index: number };

const gold = (input: string): number => {
  const positions: Vec2[] = input
    .split("\n")
    .map((line) => vec2(...line.split(",").map(Number)));

  const horizontalEdges: Edge[] = [];
  const verticalEdges: Edge[] = [];

  let from = positions[0];
  positions.push(from);

  for (let i = 1; i < positions.length; i++) {
    const to = positions[i];
    if (from.x === to.x) {
      verticalEdges.push({
        min: Math.min(from.y, to.y),
        max: Math.max(from.y, to.y),
        index: from.x,
      });
    } else if (from.y === to.y) {
      horizontalEdges.push({
        min: Math.min(from.x, to.x),
        max: Math.max(from.x, to.x),
        index: from.y,
      });
    }
    from = to;
  }

  verticalEdges.sort((a, b) => a.index - b.index);
  horizontalEdges.sort((a, b) => a.index - b.index);

  let maxArea = 0;
  for (let a = 0; a < positions.length - 1; a++) {
    for (let b = a + 1; b < positions.length; b++) {
      const minX = Math.min(positions[a].x, positions[b].x);
      const maxX = Math.max(positions[a].x, positions[b].x);
      const minY = Math.min(positions[a].y, positions[b].y);
      const maxY = Math.max(positions[a].y, positions[b].y);

      const area = (maxX - minX + 1) * (maxY - minY + 1);

      if (
        area > maxArea &&
        isValidArea(minX, maxX, minY, maxY, horizontalEdges, verticalEdges)
      ) {
        maxArea = area;
      }
    }
  }
  return maxArea;
};

export const day09 = new AocPuzzle(2025, 9, silver, gold);

const intersects = (edge: Edge, p: number): boolean => {
  return p > edge.min && p < edge.max;
};

const isValidArea = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  horizontalEdges: Edge[],
  verticalEdges: Edge[]
): boolean => {
  let i = horizontalEdges.findIndex((e) => e.index > minY);
  while (
    i >= 0 &&
    i < horizontalEdges.length &&
    horizontalEdges[i].index < maxY
  ) {
    if (
      intersects(horizontalEdges[i], minX + 1) ||
      intersects(horizontalEdges[i], maxX - 1)
    ) {
      return false;
    }
    i++;
  }

  i = verticalEdges.findIndex((e) => e.index > minX);
  while (i >= 0 && i < verticalEdges.length && verticalEdges[i].index < maxX) {
    if (
      intersects(verticalEdges[i], minY + 1) ||
      intersects(verticalEdges[i], maxY - 1)
    ) {
      return false;
    }
    i++;
  }
  return true;
};
