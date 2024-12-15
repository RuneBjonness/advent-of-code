import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";
import { vec2, Vec2 } from "@/lib/vec2";

export const silver = (input: string): number => {
  return safetyFactor(input, 101, 103);
};

export const gold = (input: string): number => {
  return secondsToChristmasTree(input, 101, 103);
};

export const day14 = new AocPuzzle(2024, 14, silver, gold, input);

type Robot = { pos: Vec2; vel: Vec2 };

export const parseInput = (input: string): Robot[] => {
  return input.split("\n").map((line) => {
    const matches = line.match(/p=(.+),(.+) v=(.+),(.+)/)!.slice(1);
    return {
      pos: vec2(Number(matches[0]), Number(matches[1])),
      vel: vec2(Number(matches[2]), Number(matches[3])),
    };
  });
};

export const safetyFactor = (
  input: string,
  width: number,
  height: number
): number => {
  const robots = parseInput(input);

  robots.forEach((robot) => {
    robot.pos = getPosition(robot, width, height, 100);
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

const getPosition = (
  robot: Robot,
  width: number,
  height: number,
  seconds = 1
): Vec2 => {
  let x = (robot.pos.x + robot.vel.x * seconds) % width;
  if (x < 0) {
    x += width;
  }
  let y = (robot.pos.y + robot.vel.y * seconds) % height;
  if (y < 0) {
    y += height;
  }
  return vec2(x, y);
};

const secondsToChristmasTree = (
  input: string,
  width: number,
  height: number
): number => {
  const robots = parseInput(input);

  let seconds = 0;
  while (seconds < 10000) {
    seconds++;
    robots.forEach((robot) => {
      robot.pos = getPosition(robot, width, height);
    });

    const grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ".")
    );

    robots.forEach((robot) => {
      grid[robot.pos.y][robot.pos.x] = "#";
    });

    if (
      grid
        .flatMap((row) => row)
        .join("")
        .includes("##########")
    ) {
      // log(robots, width, height);
      return seconds;
    }
  }
  return -1;
};

const log = (robots: Robot[], width: number, height: number) => {
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ".")
  );

  robots.forEach((robot) => {
    grid[robot.pos.y][robot.pos.x] = "#";
  });

  console.log(grid.map((row) => row.join("")).join("\n"));
  console.log();
};
