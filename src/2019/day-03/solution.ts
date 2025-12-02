import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const [wire1Instructions, wire2Instructions] = input.split("\n");

  let closestIntersectionDist = Number.POSITIVE_INFINITY;

  const path1 = calculateWirePath(wire1Instructions);
  const path2 = calculateWirePath(wire2Instructions);

  for (const s1 of path1) {
    for (const s2 of path2) {
      const intersection = findIntersection(s1, s2) ?? findIntersection(s2, s1);

      if (intersection) {
        const manhattanDist =
          Math.abs(intersection.x) + Math.abs(intersection.y);
        closestIntersectionDist = Math.min(
          closestIntersectionDist,
          manhattanDist
        );
      }
    }
  }

  return closestIntersectionDist;
};

const gold = (input: string): number => {
  const [wire1Instructions, wire2Instructions] = input.split("\n");

  let closestIntersectionWireLength = Number.POSITIVE_INFINITY;

  const path1 = calculateWirePath(wire1Instructions);
  const path2 = calculateWirePath(wire2Instructions);

  for (const s1 of path1) {
    for (const s2 of path2) {
      const intersection = findIntersection(s1, s2) ?? findIntersection(s2, s1);

      if (intersection) {
        closestIntersectionWireLength = Math.min(
          closestIntersectionWireLength,
          intersection.wireLength
        );
      }
    }
  }

  return closestIntersectionWireLength;
};

export const day03 = new AocPuzzle(2019, 3, silver, gold);

type Position = { x: number; y: number };

type PathSection = {
  from: Position;
  to: Position;
  direction: string;
  accumulatedLength: number;
};

type Intersection = Position & { wireLength: number };

const calculateWirePath = (wireInstructions: string): PathSection[] => {
  const wirePath: PathSection[] = [];
  let currentPosition = { x: 0, y: 0 };
  let accumulatedLength = 0;

  for (const instruction of wireInstructions.split(",")) {
    const direction = instruction.charAt(0);
    const distance = Number(instruction.slice(1));
    const newPosition = { ...currentPosition };

    switch (direction) {
      case "R":
        newPosition.x += distance;
        break;
      case "L":
        newPosition.x -= distance;
        break;
      case "U":
        newPosition.y -= distance;
        break;
      case "D":
        newPosition.y += distance;
        break;
    }

    wirePath.push({
      from: currentPosition,
      to: newPosition,
      direction,
      accumulatedLength,
    });
    currentPosition = newPosition;
    accumulatedLength += distance;
  }

  return wirePath;
};

const findIntersection = (
  horizontal: PathSection,
  vertical: PathSection
): Intersection | null => {
  if (
    (horizontal.direction === "R" || horizontal.direction === "L") &&
    (vertical.direction === "U" || vertical.direction === "D")
  ) {
    if (
      Math.min(horizontal.from.x, horizontal.to.x) < vertical.from.x &&
      vertical.from.x < Math.max(horizontal.from.x, horizontal.to.x) &&
      Math.min(vertical.from.y, vertical.to.y) < horizontal.from.y &&
      horizontal.from.y < Math.max(vertical.from.y, vertical.to.y)
    ) {
      return {
        x: vertical.from.x,
        y: horizontal.from.y,
        wireLength:
          horizontal.accumulatedLength +
          vertical.accumulatedLength +
          Math.abs(vertical.from.x - horizontal.from.x) +
          Math.abs(horizontal.from.y - vertical.from.y),
      };
    }
  }
  return null;
};
