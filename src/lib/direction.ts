import { GridPosition } from "./grid-position";

export type Direction =
  | "right"
  | "left"
  | "down"
  | "up"
  | "rightDown"
  | "leftDown"
  | "rightUp"
  | "leftUp";

export const directions: Direction[] = [
  "right",
  "left",
  "down",
  "up",
  "rightDown",
  "leftDown",
  "rightUp",
  "leftUp",
];

export const rotate90 = (dir: Direction): Direction => {
  switch (dir) {
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
    case "up":
      return "right";
    case "rightDown":
      return "leftDown";
    case "leftDown":
      return "leftUp";
    case "leftUp":
      return "rightUp";
    case "rightUp":
      return "rightDown";
  }
};

export const rotate90ccw = (dir: Direction): Direction => {
  switch (dir) {
    case "right":
      return "up";
    case "up":
      return "left";
    case "left":
      return "down";
    case "down":
      return "right";
    case "rightDown":
      return "rightUp";
    case "rightUp":
      return "leftUp";
    case "leftUp":
      return "leftDown";
    case "leftDown":
      return "rightDown";
  }
};

export const directionVector = (dir: Direction, length = 1): GridPosition => {
  switch (dir) {
    case "right":
      return { row: 0, col: length };
    case "left":
      return { row: 0, col: -length };
    case "down":
      return { row: length, col: 0 };
    case "up":
      return { row: -length, col: 0 };
    case "rightDown":
      return { row: length, col: length };
    case "leftDown":
      return { row: length, col: -length };
    case "rightUp":
      return { row: -length, col: length };
    case "leftUp":
      return { row: -length, col: -length };
  }
};

export const adjacentDeltas: GridPosition[] = [
  { row: 0, col: 1 }, // right
  { row: 0, col: -1 }, // left
  { row: 1, col: 0 }, // down
  { row: -1, col: 0 }, // up
];

export const adjacentAndDiagonalDeltas: GridPosition[] = [
  { row: 0, col: 1 }, // right
  { row: 0, col: -1 }, // left
  { row: 1, col: 0 }, // down
  { row: -1, col: 0 }, // up
  { row: 1, col: 1 }, // rightDown
  { row: 1, col: -1 }, // leftDown
  { row: -1, col: 1 }, // rightUp
  { row: -1, col: -1 }, // leftUp
];
