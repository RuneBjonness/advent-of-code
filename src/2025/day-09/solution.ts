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

type Range = { min: number; max: number };
type Edges = Record<number, Range[]>;

const gold = (input: string): number => {
  const positions: Vec2[] = input
    .split("\n")
    .map((line) => vec2(...line.split(",").map(Number)));

  const horizontalEdges: Edges = {};
  const verticalEdges: Edges = {};

  let from = positions[0];
  positions.push(from);

  for (let i = 1; i < positions.length; i++) {
    const to = positions[i];
    if (from.x === to.x) {
      const x = from.x;
      const range = {
        min: Math.min(from.y, to.y),
        max: Math.max(from.y, to.y),
      };
      if (!verticalEdges[x]) {
        verticalEdges[x] = [];
      }
      verticalEdges[x].push(range);
    } else if (from.y === to.y) {
      const y = from.y;
      const range = {
        min: Math.min(from.x, to.x),
        max: Math.max(from.x, to.x),
      };
      if (!horizontalEdges[y]) horizontalEdges[y] = [];
      horizontalEdges[y].push(range);
    }
    from = to;
  }

  let maxArea = 0;
  for (let a = 0; a < positions.length - 1; a++) {
    for (let b = a + 1; b < positions.length; b++) {
      const minX = Math.min(positions[a].x, positions[b].x);
      const maxX = Math.max(positions[a].x, positions[b].x);
      const minY = Math.min(positions[a].y, positions[b].y);
      const maxY = Math.max(positions[a].y, positions[b].y);

      let valid = true;
      for (let y = minY + 1; y < maxY; y++) {
        const hEdges = horizontalEdges[y];
        if (hEdges) {
          for (const edge of hEdges) {
            if (
              (edge.min > minX && edge.min < maxX) ||
              (edge.max > minX && edge.max < maxX) ||
              (edge.min <= minX && edge.max >= maxX)
            ) {
              valid = false;
              break;
            }
          }
        }
        if (!valid) break;
      }

      for (let x = minX + 1; x < maxX; x++) {
        const vEdges = verticalEdges[x];
        if (vEdges) {
          for (const edge of vEdges) {
            if (
              (edge.min > minY && edge.min < maxY) ||
              (edge.max > minY && edge.max < maxY) ||
              (edge.min <= minY && edge.max >= maxY)
            ) {
              valid = false;
              break;
            }
          }
        }
        if (!valid) break;
      }

      if (valid) {
        const area =
          (Math.abs(positions[b].x - positions[a].x) + 1) *
          (Math.abs(positions[b].y - positions[a].y) + 1);
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }
  return maxArea;
};

export const day09 = new AocPuzzle(2025, 9, silver, gold);
