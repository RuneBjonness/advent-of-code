import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let totalRiskLevel = 0;
  let heightmap = [];

  input.split("\n").forEach((line) => {
    heightmap.push(line.split("").map((x) => Number(x)));
  });

  for (let r = 0; r < heightmap.length; r++) {
    for (let c = 0; c < heightmap[r].length; c++) {
      if (getNeighbours(heightmap, r, c).every((x) => x > heightmap[r][c])) {
        totalRiskLevel += heightmap[r][c] + 1;
      }
    }
  }

  return totalRiskLevel;
};

const gold = (input: string): number => {
  let lowpoints = [];
  let heightmap = [];

  input.split("\n").forEach((line) => {
    heightmap.push(line.split("").map((x) => Number(x)));
  });

  for (let r = 0; r < heightmap.length; r++) {
    for (let c = 0; c < heightmap[r].length; c++) {
      if (getNeighbours(heightmap, r, c).every((x) => x > heightmap[r][c])) {
        lowpoints.push({ r, c });
      }
    }
  }

  let basins = [];

  lowpoints.forEach((p) => {
    basins.push(basin(p, heightmap.slice()));
  });

  basins.sort((a, b) => b - a);

  return basins[0] * basins[1] * basins[2];
};

export const day09 = new AocPuzzle(2021, 9, silver, gold);

function basin(lp: { r: number; c: number }, m: number[][]): number {
  let tiles = getHigherNeighbours(m, lp.r, lp.c);
  if (m[lp.r][lp.c] > 9) {
    return 0;
  }
  m[lp.r][lp.c] += 10;

  if (tiles.length === 0) {
    return 1;
  }
  let sum = 1;
  tiles.forEach((t) => (sum += basin(t, m)));
  return sum;
}

function getHigherNeighbours(
  m: number[][],
  r: number,
  c: number,
): { r: number; c: number; val: number }[] {
  return getNeighbourPoints(m, r, c).filter(
    (n) => n.val < 9 && n.val > m[r][c],
  );
}

function getNeighbourPoints(
  m: number[][],
  r: number,
  c: number,
): { r: number; c: number; val: number }[] {
  const tiles = [];
  if (r > 0) {
    tiles.push({ r: r - 1, c: c, val: m[r - 1][c] });
  }
  if (r < m.length - 1) {
    tiles.push({ r: r + 1, c: c, val: m[r + 1][c] });
  }
  if (c > 0) {
    tiles.push({ r: r, c: c - 1, val: m[r][c - 1] });
  }
  if (c < m[0].length - 1) {
    tiles.push({ r: r, c: c + 1, val: m[r][c + 1] });
  }
  return tiles;
}

function getNeighbours(m: number[][], r: number, c: number): number[] {
  const tiles = [];
  if (r > 0) {
    tiles.push(m[r - 1][c]);
  }
  if (r < m.length - 1) {
    tiles.push(m[r + 1][c]);
  }
  if (c > 0) {
    tiles.push(m[r][c - 1]);
  }
  if (c < m[0].length - 1) {
    tiles.push(m[r][c + 1]);
  }
  return tiles;
}
