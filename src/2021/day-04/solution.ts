import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const [boards, numbers] = parseInput(input);
  const [winningBoard, num] = markAndTestBoards(boards, numbers);
  return scoreBoard(winningBoard, num);
};

const gold = (input: string): number => {
  const [boards, numbers] = parseInput(input);
  const [winningBoard, num] = getLastWinningBoard(boards, numbers);
  return scoreBoard(winningBoard, num);
};

export const day04 = new AocPuzzle(2021, 4, silver, gold);

const parseInput = (input: string): [number[][][], number[]] => {
  const blocks = input.split("\n\n");
  const numbers = blocks[0].split(",").map(Number);

  const boards = blocks.slice(1).map((b) => {
    return b.split("\n").map((line) =>
      line
        .split(" ")
        .filter((x) => x !== "")
        .map(Number),
    );
  });
  return [boards, numbers];
};

function getLastWinningBoard(
  boards: number[][][],
  numbers: number[],
): [number[][], number] {
  for (let n = 0; n < numbers.length; n++) {
    for (let b = 0; b < boards.length; b++) {
      for (let r = 0; r < boards[b].length; r++) {
        for (let c = 0; c < boards[b][r].length; c++) {
          if (boards[b][r][c] === numbers[n]) {
            boards[b][r][c] = -1;
          }
        }
      }
    }
    boards = boards.filter((x: number[][]) => !testBoard(x));
    if (boards.length === 1) {
      return markAndTestBoards(boards, numbers.slice(n));
    }
  }
  return [boards[0], 0];
}

function markAndTestBoards(
  boards: number[][][],
  numbers: number[],
): [number[][], number] {
  for (let n = 0; n < numbers.length; n++) {
    for (let b = 0; b < boards.length; b++) {
      for (let r = 0; r < boards[b].length; r++) {
        for (let c = 0; c < boards[b][r].length; c++) {
          if (boards[b][r][c] === numbers[n]) {
            boards[b][r][c] = -1;
            if (testBoard(boards[b])) {
              return [boards[b], numbers[n]];
            }
          }
        }
      }
    }
  }
  return [boards[0], 0];
}

function testBoard(b: number[][]): boolean {
  if (
    b.some((row: number[]) => {
      if (row.reduce((a: number, b: number) => a + b) === -5) {
        return true;
      }
    })
  ) {
    return true;
  }
  for (let c = 0; c < 5; c++) {
    if (
      b.map((r: number[]) => r[c]).reduce((a: number, b: number) => a + b) ===
      -5
    ) {
      return true;
    }
  }

  return false;
}

function scoreBoard(b: number[][], lastNum: number): number {
  return (
    b
      .flat()
      .filter((n: number) => n > 0)
      .reduce((a: number, b: number) => a + b) * lastNum
  );
}
