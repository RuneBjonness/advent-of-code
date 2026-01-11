import { AocPuzzle } from "@/aoc-puzzle";
import {
  Direction,
  directionVector,
  rotate90,
  rotate90ccw,
} from "@/lib/direction";
import { Vec2 } from "@/lib/vec2";

const silver = (input: string): number => {
  let x = 0;
  let y = 0;
  let dir: Direction = "up";

  const instructions = input.split(", ");

  for (const instr of instructions) {
    const turn = instr[0];
    const length = Number(instr.slice(1));

    if (turn === "R") {
      dir = rotate90(dir);
    } else if (turn === "L") {
      dir = rotate90ccw(dir);
    }

    const vector = directionVector(dir, length);
    x += vector.col;
    y += vector.row;
  }

  return Math.abs(x) + Math.abs(y);
};

const gold = (input: string): number => {
  let x = 0;
  let y = 0;

  const horizontalPaths: Path[] = [];
  const verticalPaths: Path[] = [];

  let dir: Direction = "up";

  const instructions = input.split(", ");

  for (const instr of instructions) {
    const turn = instr[0];
    const length = Number(instr.slice(1));

    if (turn === "R") {
      dir = rotate90(dir);
    } else if (turn === "L") {
      dir = rotate90ccw(dir);
    }

    const fromDelta = directionVector(dir);
    const toDelta = directionVector(dir, length);
    const path = {
      from: { x: x + fromDelta.col, y: y + fromDelta.row },
      to: { x: x + toDelta.col, y: y + toDelta.row },
    };
    if (dir === "left" || dir === "right") {
      for (const vPath of verticalPaths) {
        const intersection = instersects(path, vPath);
        if (intersection) {
          return Math.abs(intersection.x) + Math.abs(intersection.y);
        }
      }
      horizontalPaths.push(path);
    } else {
      for (const hPath of horizontalPaths) {
        const intersection = instersects(hPath, path);
        if (intersection) {
          return Math.abs(intersection.x) + Math.abs(intersection.y);
        }
      }
      verticalPaths.push(path);
    }
    x += toDelta.col;
    y += toDelta.row;
  }

  return 0;
};

export const day01 = new AocPuzzle(2016, 1, silver, gold);

type Path = { from: Vec2; to: Vec2 };

const instersects = (hPath: Path, vPath: Path): Vec2 | null => {
  const hMinX = Math.min(hPath.from.x, hPath.to.x);
  const hMaxX = Math.max(hPath.from.x, hPath.to.x);
  const vMinY = Math.min(vPath.from.y, vPath.to.y);
  const vMaxY = Math.max(vPath.from.y, vPath.to.y);
  if (
    vPath.from.x >= hMinX &&
    vPath.from.x <= hMaxX &&
    hPath.from.y >= vMinY &&
    hPath.from.y <= vMaxY
  ) {
    return { x: vPath.from.x, y: hPath.from.y };
  }
  return null;
};
