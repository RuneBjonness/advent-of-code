import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let m = Array.from(Array(1000), () => Array(1000).fill(0));

  input.split("\n").forEach((line) => {
    let points = line.split(" -> ");

    let [p1x, p1y] = points[0].split(",").map(Number);
    let [p2x, p2y] = points[1].split(",").map(Number);

    if (p1x === p2x) {
      for (let y = Math.min(p1y, p2y); y <= Math.max(p1y, p2y); y++) {
        m[p1x][y]++;
      }
    } else if (p1y === p2y) {
      for (let x = Math.min(p1x, p2x); x <= Math.max(p1x, p2x); x++) {
        m[x][p1y]++;
      }
    }
  });

  return m.flat().filter((x) => x > 1).length;
};

const gold = (input: string): number => {
  let m = Array.from(Array(1000), () => Array(1000).fill(0));

  input.split("\n").forEach((line) => {
    let points = line.split(" -> ");

    let [p1x, p1y] = points[0].split(",").map(Number);
    let [p2x, p2y] = points[1].split(",").map(Number);

    if (p1x === p2x) {
      for (let y = Math.min(p1y, p2y); y <= Math.max(p1y, p2y); y++) {
        m[p1x][y]++;
      }
    } else if (p1y === p2y) {
      for (let x = Math.min(p1x, p2x); x <= Math.max(p1x, p2x); x++) {
        m[x][p1y]++;
      }
    } else if (Math.abs(p2x - p1x) === Math.abs(p2y - p1y)) {
      let x = p1x;
      let y = p1y;
      for (let i = 0; i <= Math.abs(p2x - p1x); i++) {
        m[x][y]++;
        x = p1x < p2x ? x + 1 : x - 1;
        y = p1y < p2y ? y + 1 : y - 1;
      }
    }
  });

  return m.flat().filter((x) => x > 1).length;
};

export const day05 = new AocPuzzle(2021, 5, silver, gold);
