import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let numbers = input.split("\n");
  let sum = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    sum = add(sum, numbers[i]);
  }
  return magnitude(parsePairs(sum));
};

const gold = (input: string): number => {
  let numbers = input.split("\n");
  let sums = [];
  for (let i = 1; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      sums.push(add(numbers[j], numbers[i]));
      sums.push(add(numbers[i], numbers[j]));
    }
  }
  let maxMagnitude = 0;
  sums.forEach((s) => {
    let mag = magnitude(parsePairs(s));
    if (mag > maxMagnitude) {
      maxMagnitude = mag;
    }
  });

  return maxMagnitude;
};

export const day18 = new AocPuzzle(2021, 18, silver, gold);

function add(a, b) {
  return reduce(`[${a},${b}]`);
}

function reduce(a) {
  while (true) {
    let r = explode(a);
    if (r) {
      a = r;
      continue;
    }
    r = split(a);
    if (r) {
      a = r;
      continue;
    }
    return a;
  }
}

function explode(n) {
  let lvl = 0;
  for (let i = 0; i < n.length; i++) {
    if (n[i] == "[") {
      lvl++;
      if (lvl == 5) {
        let expIdxEnd = n.indexOf("]", i + 1);
        let pair = n.substring(i + 1, expIdxEnd).split(",");
        let left = addToLastNumber(n.substring(0, i), pair[0]);
        let right = addToFirstNumber(n.substring(expIdxEnd + 1), pair[1]);
        return left + "0" + right;
      }
    } else if (n[i] == "]") {
      lvl--;
    }
  }
  return false;
}

function addToLastNumber(s, add) {
  let number = "";
  for (let i = s.length - 1; i >= 0; i--) {
    if (Number(s[i]) >= 0) {
      number = s[i] + number;
    } else if (number.length > 0) {
      return (
        s.substring(0, i + 1) +
        (Number(add) + Number(number)) +
        s.substring(i + 1 + number.length)
      );
    }
  }
  return s;
}

function addToFirstNumber(s, add) {
  let number = "";
  for (let i = 0; i < s.length; i++) {
    if (Number(s[i]) >= 0) {
      number = number + s[i];
    } else if (number.length > 0) {
      return (
        s.substring(0, i - number.length) +
        (Number(add) + Number(number)) +
        s.substring(i)
      );
    }
  }
  return s;
}

function split(n) {
  let number = "";
  for (let i = 0; i < n.length; i++) {
    if (Number(n[i]) >= 0) {
      number += n[i];
    } else if (number.length > 1) {
      let num = Number(number);
      return (
        n.substring(0, i - number.length) +
        "[" +
        Math.floor(num / 2) +
        "," +
        Math.ceil(num / 2) +
        "]" +
        n.substring(i)
      );
    } else {
      number = "";
    }
  }
  return false;
}

function magnitude(p) {
  let l = p.leftVal != null ? p.leftVal : magnitude(p.left);
  let r = p.rightVal != null ? p.rightVal : magnitude(p.right);
  return 3 * l + 2 * r;
}

function parsePairs(n) {
  let p = {};
  let rIdx = 0;
  if (n[1] == "[") {
    rIdx = getClosingIndex(n, 1) + 1;
    p["left"] = parsePairs(n.substring(1, rIdx));
  } else {
    rIdx = n.indexOf(",");
    p["leftVal"] = Number(n.substring(1, rIdx));
  }
  rIdx++;
  if (n[rIdx] == "[") {
    p["right"] = parsePairs(n.substring(rIdx, n.length - 1));
  } else {
    p["rightVal"] = Number(n.substring(rIdx, n.length - 1));
  }
  return p;
}

function getClosingIndex(n, start) {
  let lvl = 1;
  for (let i = start + 1; i < n.length; i++) {
    if (n[i] == "[") {
      lvl++;
    } else if (n[i] == "]") {
      lvl--;
      if (lvl === 0) {
        return i;
      }
    }
  }
  return n.length;
}
