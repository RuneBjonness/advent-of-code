import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const machines = input.split("\n").map((m) => m.split(" "));
  let result = 0;
  for (const machine of machines) {
    const target = getTarget(machine);
    const buttons = machine.slice(1, -1).map(getButtonBitmask);
    const minButtons = minButtonsToTarget(buttons, target);
    result += minButtons;
  }

  return result;
};

const gold = (input: string): number => {
  const machines = input.split("\n").map((m) => m.split(" "));
  let result = 0;
  for (const machine of machines) {
    const target = getJoltageTarget(machine);
    const combinations = calculateButtonCombinations(
      machine.slice(1, -1).map(getButton),
      target.length
    );
    const minButtons = minimumButtonsToJoltageTarget(target, combinations);
    result += minButtons;
  }
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

const getButton = (button: string): number[] => {
  return button.slice(1, -1).split(",").map(Number);
};

const getButtonBitmask = (button: string): number => {
  return button
    .slice(1, -1)
    .split(",")
    .map((n) => 2 ** Number(n))
    .reduce((acc, bit) => acc | bit, 0);
};

const getJoltageTarget = (machine: string[]): number[] => {
  return machine.at(-1).slice(1, -1).split(",").map(Number);
};

type ButtonCombinations = {
  totalPresses: number;
  effect: number[];
};
const calculateButtonCombinations = (
  buttons: number[][],
  targetLength: number,
  startIndex: number = 0,
  currentCombination: number[] = [],
  currentEffect: number[] = Array.from({ length: targetLength }, () => 0),
  totalPresses: number = 0,
  combinations: Record<string, ButtonCombinations[]> = {}
): Record<string, ButtonCombinations[]> => {
  const key = currentEffect.map((x) => (x % 2 === 0 ? "0" : "1")).join("");
  if (!combinations[key]) {
    combinations[key] = [];
  }
  combinations[key].push({ totalPresses, effect: [...currentEffect] });

  for (let i = startIndex; i < buttons.length; i++) {
    const button = buttons[i];
    const newEffect = [...currentEffect];
    for (const index of button) {
      newEffect[index] = (newEffect[index] ?? 0) + 1;
    }
    calculateButtonCombinations(
      buttons,
      targetLength,
      i + 1,
      [...currentCombination, i],
      newEffect,
      totalPresses + 1,
      combinations
    );
  }
  return combinations;
};

const getTargetParityKey = (target: number[]): string => {
  return target.map((x) => (x % 2 === 0 ? "0" : "1")).join("");
};

const minimumButtonsToJoltageTarget = (
  target: number[],
  combinations: Record<string, ButtonCombinations[]>,
  targetCache = new Map<string, number>()
): number => {
  const targetCacheKey = target.join(",");
  if (targetCache.has(targetCacheKey)) {
    return targetCache.get(targetCacheKey)!;
  }
  if (target.every((t) => t === 0)) {
    return 0;
  }
  if (target.some((t) => t < 0)) {
    return Infinity;
  }

  const targetKey = getTargetParityKey(target);
  if (!combinations[targetKey]) {
    return Infinity;
  }

  let currentMin = Infinity;
  for (const combo of combinations[targetKey]) {
    const res = minimumButtonsToJoltageTarget(
      target.map((t, i) => (t - combo.effect[i]) / 2),
      combinations,
      targetCache
    );
    currentMin = Math.min(currentMin, res * 2 + combo.totalPresses);
  }
  targetCache.set(targetCacheKey, currentMin);
  return currentMin;
};
