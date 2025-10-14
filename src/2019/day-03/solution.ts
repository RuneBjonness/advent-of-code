import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const [wire1Instructions, wire2Instructions] = input.split("\n");

  let closestIntersectionDist = Number.POSITIVE_INFINITY;

  const path1 = calculateWirePath(wire1Instructions);
  const path2 = calculateWirePath(wire2Instructions);

  for (const point of path1) {
    if (path2.includes(point)) {
      const [x, y] = point.split(",").map(Number);
      const manhattanDist = Math.abs(x) + Math.abs(y);
      closestIntersectionDist = Math.min(
        closestIntersectionDist,
        manhattanDist
      );
    }
  }

  return closestIntersectionDist;
};

export const gold = (input: string): number => {
  const [wire1Instructions, wire2Instructions] = input.split("\n");

  let closestIntersectionWireLength = Number.POSITIVE_INFINITY;

  const path1 = calculateWirePath(wire1Instructions);
  const path2 = calculateWirePath(wire2Instructions);

  for (const point of path1) {
    if (path2.includes(point)) {
      const wireLength = path1.indexOf(point) + path2.indexOf(point) + 2;
      closestIntersectionWireLength = Math.min(
        closestIntersectionWireLength,
        wireLength
      );
    }
  }

  return closestIntersectionWireLength;
};

export const day03 = new AocPuzzle(2019, 3, silver, gold, input);

const calculateWirePath = (wireInstructions: string): string[] => {
  const wirePath: string[] = [];
  let currentPosition = { x: 0, y: 0 };

  const instructions = wireInstructions.split(",");
  for (const instruction of instructions) {
    const direction = instruction.charAt(0);
    const distance = Number(instruction.slice(1));

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case "R":
          currentPosition.x += 1;
          break;
        case "L":
          currentPosition.x -= 1;
          break;
        case "U":
          currentPosition.y -= 1;
          break;
        case "D":
          currentPosition.y += 1;
          break;
      }
      wirePath.push(`${currentPosition.x},${currentPosition.y}`);
    }
  }

  return wirePath;
};
