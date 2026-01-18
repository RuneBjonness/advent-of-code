import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const values: number[][] = input
    .split("\n")
    .map((r) => r.split("").map(Number));
  const m: Tile[][] = values.map((r, i) =>
    r.map((n, j) => ({
      row: i,
      col: j,
      val: n,
      sum: 0,
      resolvedTop: i === 0 ? Number.MAX_VALUE : 0,
      resolvedRight: j === r.length - 1 ? Number.MAX_VALUE : 0,
      resolvedBottom: i === values.length - 1 ? Number.MAX_VALUE : 0,
      resolvedLeft: j === 0 ? Number.MAX_VALUE : 0,
    })),
  );
  setTileSum(m, 0, 0, m[0][0].val);

  while (m[m.length - 1][m[0].length - 1].sum === 0) {
    let cheapestSolvedTile = m
      .flatMap((r) => r.filter((c) => c.sum > 0 && hasUnresolvedNeighbours(c)))
      .reduce((a, b) => (a.sum < b.sum ? a : b));

    getNeighbours(m, cheapestSolvedTile.row, cheapestSolvedTile.col).forEach(
      (t) => {
        setTileSum(m, t.row, t.col, t.val + cheapestSolvedTile.sum);
      },
    );
  }
  return m[m.length - 1][m[0].length - 1].sum - m[0][0].sum;
};

const gold = (input: string): number => {
  const template = input
    .split("\n")
    .map((r) => r.split("").map((n) => Number(n)));

  let m = Array.from(Array(template.length * 5), () =>
    new Array(template[0].length * 5).fill(0),
  );

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      template.forEach((r, ri) => {
        r.forEach((c, ci) => {
          m[template.length * i + ri][r.length * j + ci] = next(c, i + j);
        });
      });
    }
  }

  m.forEach((r, i) =>
    r.forEach(
      (n, j) =>
        (m[i][j] = {
          row: i,
          col: j,
          val: Number(n),
          sum: 0,
          resolvedTop: i === 0 ? Number.MAX_VALUE : 0,
          resolvedRight: j === m[i].length - 1 ? Number.MAX_VALUE : 0,
          resolvedBottom: i === m.length - 1 ? Number.MAX_VALUE : 0,
          resolvedLeft: j === 0 ? Number.MAX_VALUE : 0,
        }),
    ),
  );
  setTileSum(m, 0, 0, m[0][0].val);

  while (m[m.length - 1][m[0].length - 1].sum === 0) {
    let cheapestSolvedTile = m
      .flatMap((r) => r.filter((c) => c.sum > 0 && hasUnresolvedNeighbours(c)))
      .reduce((a, b) => (a.sum < b.sum ? a : b));

    getNeighbours(m, cheapestSolvedTile.row, cheapestSolvedTile.col).forEach(
      (t) => {
        setTileSum(m, t.row, t.col, t.val + cheapestSolvedTile.sum);
      },
    );
  }

  return m[m.length - 1][m[0].length - 1].sum - m[0][0].sum;
};

export const day15 = new AocPuzzle(2021, 15, silver, gold);

type Tile = {
  row: number;
  col: number;
  val: number;
  sum: number;
  resolvedTop: number;
  resolvedRight: number;
  resolvedBottom: number;
  resolvedLeft: number;
};

function getNeighbours(
  m: Tile[][],
  r: number,
  c: number,
  includeResolved = false,
): Tile[] {
  const tiles = [];
  if (r > 0 && (includeResolved || m[r][c].resolvedTop === 0)) {
    tiles.push(m[r - 1][c]);
  }
  if (r < m.length - 1 && (includeResolved || m[r][c].resolvedBottom === 0)) {
    tiles.push(m[r + 1][c]);
  }
  if (c > 0 && (includeResolved || m[r][c].resolvedLeft === 0)) {
    tiles.push(m[r][c - 1]);
  }
  if (c < m[0].length - 1 && (includeResolved || m[r][c].resolvedRight === 0)) {
    tiles.push(m[r][c + 1]);
  }
  if (tiles.length === 0) console.log(m[r][c]);
  return tiles;
}

function hasUnresolvedNeighbours(t: Tile): boolean {
  return (
    t.resolvedTop === 0 ||
    t.resolvedRight === 0 ||
    t.resolvedBottom === 0 ||
    t.resolvedLeft === 0
  );
}

function setTileSum(m: Tile[][], r: number, c: number, sum: number) {
  m[r][c].sum = sum;
  if (r > 0) {
    m[r - 1][c].resolvedBottom = sum;
    checkTile(m[r - 1][c]);
  }
  if (r < m.length - 1) {
    m[r + 1][c].resolvedTop = sum;
    checkTile(m[r + 1][c]);
  }
  if (c > 0) {
    m[r][c - 1].resolvedRight = sum;
    checkTile(m[r][c - 1]);
  }
  if (c < m[0].length - 1) {
    m[r][c + 1].resolvedLeft = sum;
    checkTile(m[r][c + 1]);
  }
}

function checkTile(t: Tile) {
  if (t.sum === 0 && !hasUnresolvedNeighbours(t)) {
    t.sum =
      Math.min(
        t.resolvedTop,
        t.resolvedRight,
        t.resolvedBottom,
        t.resolvedLeft,
      ) + t.val;
  }
}

function next(val: number, increment: number): number {
  let n = (val + increment) % 9;
  return n > 0 ? n : 9;
}
