import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const { marks, folds } = parseInput(input);

  const foldedMarks = fold(marks, folds[0]);
  return foldedMarks.length;
};

const gold = (input: string): string => {
  let { marks, folds } = parseInput(input);

  folds.forEach((f) => {
    marks = fold(marks, f);
  });

  let plotString = "";
  for (let i = 0; i < 8; i++) {
    let firstRow = "";
    for (let x = i * 5; x < i * 5 + 4; x++) {
      firstRow += marks.some((p) => p.y == 0 && p.x == x) ? "X" : " ";
    }
    if (firstRow === "X   ") {
      plotString += "L";
    } else if (firstRow === "X  X") {
      plotString += "K";
    } else if (firstRow === "XXX ") {
      let bottomRow = "";
      for (let x = i * 5; x < i * 5 + 4; x++) {
        bottomRow += marks.some((p) => p.y == 5 && p.x == x) ? "X" : " ";
      }
      if (bottomRow === "X  X") {
        plotString += "R";
      } else if (bottomRow === "XXX ") {
        plotString += "B";
      } else if (bottomRow === "X   ") {
        plotString += "P";
      }
    } else if (firstRow === "XXXX") {
      plotString += "E";
    }
  }

  return plotString;
};

export const day13 = new AocPuzzle(2021, 13, silver, gold);

function fold(marks, foldAt) {
  let f = foldAt.split("=");
  let fIdx = Number(f[1]);
  let folded = [];
  if (f[0] == "y") {
    folded = marks.filter((p) => p.y < fIdx);
    folded.push(
      ...marks
        .filter((p) => p.y > fIdx)
        .map((p) => {
          return { x: p.x, y: fIdx - (p.y - fIdx) };
        }),
    );
  } else {
    let fIdx = Number(f[1]);
    folded = marks.filter((p) => p.x < fIdx);
    folded.push(
      ...marks
        .filter((p) => p.x > fIdx)
        .map((p) => {
          return { x: fIdx - (p.x - fIdx), y: p.y };
        }),
    );
  }
  folded = [...new Map(folded.map((v) => [JSON.stringify(v), v])).values()];
  return folded;
}

const parseInput = (
  input: string,
): { marks: { x: number; y: number }[]; folds: string[] } => {
  const [marksPart, foldsPart] = input.split("\n\n");
  const marks = marksPart.split("\n").map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
  });
  const folds = foldsPart
    .split("\n")
    .map((line) => line.replace("fold along ", ""));
  return { marks, folds };
};
