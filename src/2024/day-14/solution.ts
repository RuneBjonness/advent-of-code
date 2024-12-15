import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";
import { vec2, Vec2 } from "@/lib/vec2";

export const silver = (input: string): number => {
  return safetyFactor(input, 101, 103);
};

export const gold = (input: string): number => {
  return NaN;
};

export const day14 = new AocPuzzle(2024, 14, silver, gold, input);

type Robot = { pos: Vec2; vel: Vec2 };

export const safetyFactor = (
  input: string,
  width: number,
  height: number
): number => {
  const robots: Robot[] = input.split("\n").map((line) => {
    const matches = line.match(/p=(.+),(.+) v=(.+),(.+)/)!.slice(1);
    return {
      pos: vec2(Number(matches[0]), Number(matches[1])),
      vel: vec2(Number(matches[2]), Number(matches[3])),
    };
  });

  robots.forEach((robot) => {
    let x = (robot.pos.x + robot.vel.x * 100) % width;
    if (x < 0) {
      x += width;
    }
    let y = (robot.pos.y + robot.vel.y * 100) % height;
    if (y < 0) {
      y += height;
    }
    robot.pos = vec2(x, y);
  });

  const halfWidth = (width - 1) / 2;
  const halfHeight = (height - 1) / 2;

  const q1 = robots.filter(
    (robot) => robot.pos.x < halfWidth && robot.pos.y < halfHeight
  ).length;
  const q2 = robots.filter(
    (robot) => robot.pos.x > halfWidth && robot.pos.y < halfHeight
  ).length;
  const q3 = robots.filter(
    (robot) => robot.pos.x > halfWidth && robot.pos.y > halfHeight
  ).length;
  const q4 = robots.filter(
    (robot) => robot.pos.x < halfWidth && robot.pos.y > halfHeight
  ).length;

  return q1 * q2 * q3 * q4;
};
