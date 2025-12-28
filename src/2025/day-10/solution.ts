import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const machines = input.split("\n").map((m) => m.split(" "));
  let result = 0;
  for (const machine of machines) {
    const target = getTarget(machine);
    const combinations = calculateButtonCombinations(
      getButtons(machine),
      target.length
    );
    const minButtons = Math.min(
      ...combinations[target.join("")].map((c) => c.totalPresses)
    );
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
      getButtons(machine),
      target.length
    );
    const minButtons = minimumButtonsToJoltageTarget(target, combinations);
    result += minButtons;
  }
  return result;
};

const both = (input: string): [number, number] => {
  const machines = input.split("\n").map((m) => m.split(" "));
  let resultSilver = 0;
  let resultGold = 0;
  for (const machine of machines) {
    const lightTarget = getTarget(machine);
    const joltageTarget = getJoltageTarget(machine);
    const combinations = calculateButtonCombinations(
      getButtons(machine),
      lightTarget.length
    );

    const minButtonsToLightTarget = combinations[lightTarget.join("")]?.reduce(
      (min, combo) => Math.min(min, combo.totalPresses),
      Infinity
    );

    const minButtonsToJoltageTarget = minimumButtonsToJoltageTarget(
      joltageTarget,
      combinations
    );
    resultSilver += minButtonsToLightTarget;
    resultGold += minButtonsToJoltageTarget;
  }
  return [resultSilver, resultGold];
};

export const day10 = new AocPuzzle(2025, 10, silver, gold, both);

const getTarget = (machine: string[]): number[] => {
  return machine[0]
    .slice(1, -1)
    .split("")
    .map((c) => (c === "#" ? 1 : 0));
};

const getButtons = (machine: string[]): number[][] => {
  return machine.slice(1, -1).map(getButton);
};

const getButton = (button: string): number[] => {
  return button.slice(1, -1).split(",").map(Number);
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
