import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let count = 0;
  input.split("\n").forEach((line) => {
    count += line
      .split(" | ")[1]
      .split(" ")
      .filter(
        (d) => d.length == 2 || d.length == 3 || d.length == 4 || d.length == 7,
      ).length;
  });

  return count;
};

const gold = (input: string): number => {
  let sum = 0;
  input.split("\n").forEach((line) => {
    let config = Array(7);
    let digits = line.split(" | ")[0].split(" ");

    let cf = digits.filter((d) => d.length == 2)[0];
    let acf = digits.filter((d) => d.length == 3)[0];
    let bcdf = digits.filter((d) => d.length == 4)[0];

    if (digits.filter((d) => d.includes(cf[0])).length == 9) {
      config[2] = cf[1];
      config[5] = cf[0];
    } else {
      config[2] = cf[0];
      config[5] = cf[1];
    }
    config[0] = acf.replace(cf[0], "").replace(cf[1], "");
    let bd = bcdf.replace(cf[0], "").replace(cf[1], "");
    if (digits.filter((d) => d.includes(bd[0])).length == 6) {
      config[1] = bd[0];
      config[3] = bd[1];
    } else {
      config[1] = bd[1];
      config[3] = bd[0];
    }

    let eg = "abcdefg"
      .replace(config[0], "")
      .replace(config[1], "")
      .replace(config[2], "")
      .replace(config[3], "")
      .replace(config[5], "");
    if (digits.filter((d) => d.includes(eg[0])).length == 4) {
      config[4] = eg[0];
      config[6] = eg[1];
    } else {
      config[4] = eg[1];
      config[6] = eg[0];
    }

    let digitStrings = [
      config[0] + config[1] + config[2] + config[4] + config[5] + config[6],
      config[2] + config[5],
      config[0] + config[2] + config[3] + config[4] + config[6],
      config[0] + config[2] + config[3] + config[5] + config[6],
      config[1] + config[2] + config[3] + config[5],
      config[0] + config[1] + config[3] + config[5] + config[6],
      config[0] + config[1] + config[3] + config[4] + config[5] + config[6],
      config[0] + config[2] + config[5],
      config[0] +
        config[1] +
        config[2] +
        config[3] +
        config[4] +
        config[5] +
        config[6],
      config[0] + config[1] + config[2] + config[3] + config[5] + config[6],
    ];
    digitStrings = digitStrings.map((x) => [...x].sort().join(""));

    let number = 0;
    line
      .split(" | ")[1]
      .split(" ")
      .reverse()
      .forEach((x, i) => {
        let n = [...x].sort().join("");
        number += 10 ** i * digitStrings.findIndex((s) => s === n);
      });
    sum += number;
  });

  return sum;
};

export const day08 = new AocPuzzle(2021, 8, silver, gold);
