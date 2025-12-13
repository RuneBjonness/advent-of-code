import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const machines = input.split("\n").map((m) => m.split(" "));
  let result = 0;
  for (const machine of machines) {
    const target = getTarget(machine);
    const buttons = getButtons(machine);
    const minButtons = minButtonsToTarget(buttons, target);
    result += minButtons;
  }

  return result;
};

const gold = (input: string): number => {
  let result = 0;
  return result;
};

export const day10 = new AocPuzzle(2025, 10, silver, gold);

const minButtonsToTarget = (
  buttons: number[],
  target: number,
  currentButtons = 0,
  currentMin = Infinity
): number => {
  if (target === 0) {
    return currentButtons;
  }

  currentButtons++;

  if (buttons.length === 0 || currentMin <= currentButtons) {
    return Infinity;
  }

  const buttonsToConsider = buttons.filter((b) => (b & target) !== 0);
  for (const button of buttonsToConsider) {
    const val = minButtonsToTarget(
      buttons.toSpliced(buttons.indexOf(button), 1),
      target ^ button,
      currentButtons,
      currentMin
    );
    currentMin = Math.min(currentMin, val);
  }

  return currentMin;
};

const getTarget = (machine: string[]): number => {
  return machine[0]
    .slice(1, -1)
    .split("")
    .reverse()
    .map((c) => (c === "#" ? 1 : 0))
    .reduce((acc, bit) => (acc << 1) | bit, 0);
};

const getButtons = (machine: string[]): number[] => {
  const buttons: number[] = [];
  for (let i = 1; i < machine.length - 1; i++) {
    buttons.push(
      machine[i]
        .slice(1, -1)
        .split(",")
        .map((n) => 2 ** Number(n))
        .reduce((acc, bit) => acc | bit, 0)
    );
  }
  return buttons;
};
