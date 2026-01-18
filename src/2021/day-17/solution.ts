import { AocPuzzle } from "@/aoc-puzzle";

// These magic numbers were found via trial and error to limit the search space
// Will not work for all inputs!
const magicNumberMinX = 0;
const magicNumberMaxX = 50;
const magicNumberMinY = 0;
const magicNumberMaxY = 400;

const silver = (input: string): number => {
  const targetArea = parseTargetArea(input);
  let maxYpos = Number.NEGATIVE_INFINITY;
  let y = magicNumberMinY;
  while (y < magicNumberMaxY) {
    for (let x = magicNumberMinX; x < magicNumberMaxX; x++) {
      let top = launch(x, y, targetArea);
      if (top > maxYpos) {
        maxYpos = top;
        break;
      }
    }
    y++;
  }
  return maxYpos;
};

const gold = (input: string): number => {
  const targetArea = parseTargetArea(input);
  let hits = 0;
  for (let x = magicNumberMinX; x <= targetArea.maxX; x++) {
    for (let y = targetArea.minY; y <= magicNumberMaxY; y++) {
      if (hit(x, y, targetArea)) {
        hits++;
      }
    }
  }
  return hits;
};

export const day17 = new AocPuzzle(2021, 17, silver, gold);

function hit(x: number, y: number, targetArea: TargetArea) {
  return launch(x, y, targetArea) > Number.NEGATIVE_INFINITY;
}

function launch(x: number, y: number, targetArea: TargetArea) {
  let posx = 0;
  let posy = 0;
  let maxY = 0;

  while (true) {
    posx += x;
    posy += y;
    if (posy > maxY) {
      maxY = posy;
    }

    if (
      posx >= targetArea.minX &&
      posx <= targetArea.maxX &&
      posy >= targetArea.minY &&
      posy <= targetArea.maxY
    ) {
      return maxY;
    }
    if (posx > targetArea.maxX || posy < targetArea.minY) {
      return Number.NEGATIVE_INFINITY;
    }

    if (x < 0) {
      x++;
    } else if (x > 0) {
      x--;
    }
    y--;
  }
}

type TargetArea = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const parseTargetArea = (input: string): TargetArea => {
  const regex = /x=(\d+)..(\d+), y=(-\d+)..(-\d+)/;
  const match = input.match(regex);
  return {
    minX: Number(match[1]),
    maxX: Number(match[2]),
    minY: Number(match[3]),
    maxY: Number(match[4]),
  };
};
