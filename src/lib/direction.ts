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
