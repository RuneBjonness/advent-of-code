import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let errorScore = 0;

  input.split("\n").forEach((line) => {
    const openings = [];
    const chars = line.split("");
    for (let i = 0; i < chars.length; i++) {
      let x = chars[i];
      if (x == "(" || x == "[" || x == "{" || x == "<") {
        openings.push(x);
      } else {
        const lastOpening = openings.pop();
        if (lastOpening != "(" && x == ")") {
          errorScore += 3;
          break;
        } else if (lastOpening != "[" && x == "]") {
          errorScore += 57;
          break;
        } else if (lastOpening != "{" && x == "}") {
          errorScore += 1197;
          break;
        } else if (lastOpening != "<" && x == ">") {
          errorScore += 25137;
          break;
        }
      }
    }
  });

  return errorScore;
};

const gold = (input: string): number => {
  let autoCompleteScores = [];

  input.split("\n").forEach((line) => {
    let isCorrupt = false;
    const openings = [];
    const chars = line.split("");
    for (let i = 0; i < chars.length; i++) {
      let x = chars[i];
      if (x == "(" || x == "[" || x == "{" || x == "<") {
        openings.push(x);
      } else {
        const lastOpening = openings.pop();
        if (
          (lastOpening != "(" && x == ")") ||
          (lastOpening != "[" && x == "]") ||
          (lastOpening != "{" && x == "}") ||
          (lastOpening != "<" && x == ">")
        ) {
          isCorrupt = true;
          break;
        }
      }
    }

    if (!isCorrupt) {
      let totalScore = 0;
      openings.reverse().forEach((x, i) => {
        totalScore *= 5;
        if (x == "(") {
          totalScore += 1;
        } else if (x == "[") {
          totalScore += 2;
        } else if (x == "{") {
          totalScore += 3;
        } else if (x == "<") {
          totalScore += 4;
        }
      });
      autoCompleteScores.push(totalScore);
    }
  });

  autoCompleteScores.sort((a, b) => a - b);
  return autoCompleteScores[Math.floor(autoCompleteScores.length / 2)];
};

export const day10 = new AocPuzzle(2021, 10, silver, gold);
