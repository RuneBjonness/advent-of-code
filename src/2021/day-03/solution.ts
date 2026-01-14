import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const numbers = input.split("\n");
  let bitCount = Array(numbers[0].length).fill(0);
  let digitCount = 0;

  numbers.forEach((x) => {
    digitCount++;
    x.split("").forEach((bit, idx) => {
      if (bit === "1") {
        bitCount[idx]++;
      }
    });
  });

  let gamma = "";
  let epsilon = "";
  bitCount.forEach((x) => {
    gamma += x > digitCount - x ? "1" : "0";
    epsilon += x > digitCount - x ? "0" : "1";
  });

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const gold = (input: string): number => {
  const digits = input.split("\n");
  let oxygenRating = [...digits];
  let co2Rating = [...digits];

  for (let i = 0; i < digits[0].length; i++) {
    let count = 0;
    oxygenRating.forEach((x) => {
      if (x[i] === "1") {
        count++;
      }
    });
    if (count >= oxygenRating.length - count) {
      oxygenRating = oxygenRating.filter((v) => v[i] === "1");
    } else {
      oxygenRating = oxygenRating.filter((v) => v[i] === "0");
    }
    if (oxygenRating.length === 1) {
      break;
    }
  }

  for (let i = 0; i < digits[0].length; i++) {
    let count = 0;
    co2Rating.forEach((x) => {
      if (x[i] === "1") {
        count++;
      }
    });
    if (count >= co2Rating.length - count) {
      co2Rating = co2Rating.filter((v) => v[i] === "0");
    } else {
      co2Rating = co2Rating.filter((v) => v[i] === "1");
    }
    if (co2Rating.length === 1) {
      break;
    }
  }

  return parseInt(oxygenRating[0], 2) * parseInt(co2Rating[0], 2);
};

export const day03 = new AocPuzzle(2021, 3, silver, gold);
