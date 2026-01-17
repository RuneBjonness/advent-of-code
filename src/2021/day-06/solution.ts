import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const timers = input.split(",").map(Number);

  for (let t = 0; t < 80; t++) {
    let offspring = [];
    for (let i = 0; i < timers.length; i++) {
      if (timers[i] === 0) {
        timers[i] = 6;
        offspring.push(8);
      } else {
        timers[i]--;
      }
    }
    timers.push(...offspring);
  }

  return timers.length;
};

const gold = (input: string): number => {
  const timers = input.split(",").map(Number);
  const fish = [
    0,
    timers.filter((x) => x == 1).length,
    timers.filter((x) => x == 2).length,
    timers.filter((x) => x == 3).length,
    timers.filter((x) => x == 4).length,
    timers.filter((x) => x == 5).length,
    0,
    0,
    0,
  ];

  for (let t = 0; t < 256; t++) {
    const gen1 = fish.shift();
    fish[6] += gen1;
    fish.push(gen1);
  }

  return fish.reduce((a, b) => a + b);
};

export const day06 = new AocPuzzle(2021, 6, silver, gold);
