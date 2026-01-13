import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let hPos = 0;
  let vPos = 0;

  input.split("\n").forEach((c) => {
    const cmd = c.split(" ");
    const dir = cmd[0];
    const dist = Number(cmd[1]);
    if (dir === "forward") {
      hPos += dist;
    } else if (dir === "up") {
      vPos -= dist;
    } else if (dir === "down") {
      vPos += dist;
    }
  });

  return hPos * vPos;
};

const gold = (input: string): number => {
  let hPos = 0;
  let vPos = 0;
  let aim = 0;

  input.split("\n").forEach((c) => {
    const cmd = c.split(" ");
    const dir = cmd[0];
    const val = Number(cmd[1]);
    if (dir === "forward") {
      hPos += val;
      vPos += aim * val;
    } else if (dir === "up") {
      aim -= val;
    } else if (dir === "down") {
      aim += val;
    }
  });

  return hPos * vPos;
};

export const day02 = new AocPuzzle(2021, 2, silver, gold);
