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
  let idx = 0;
  let debug = {
    solved: 0,
    unsolved: 0,
    solvedByMaxPressesStrategy: 0,
    solveByDecreasingPressesStrategy: 0,
  };
  for (const machine of machines) {
    idx++;
    // console.log(`Processing machine ${idx}/${machines.length}`);
    const target = getJoltageTarget(machine);
    const buttons = getSortedButtons(
      machine.slice(1, -1).map(getButton),
      target
    );

    let minButtons = solveJoltageTargetByMaxPressesStrategy(buttons, [
      ...target,
    ]);
    if (minButtons < Infinity) {
      // console.log(`  Solved by max presses strategy!`);
      debug.solvedByMaxPressesStrategy++;
    } else {
      minButtons = solveJoltageTargetByDecreasingPressesStrategy(buttons, [
        ...target,
      ]);
      if (minButtons < Infinity) {
        // console.log(`  Solved by decreasing presses strategy!`);
        debug.solveByDecreasingPressesStrategy++;
      }
    }

    if (minButtons === Infinity) {
      // console.log(`  No solution found for machine ${idx}.`);
      debug.unsolved++;
      continue;
    }

    debug.solved++;
    result += minButtons;
    // console.log(`  Minimum buttons: ${minButtons}, result so far: ${result}`);
  }
  // console.log(`Debug info: ${JSON.stringify(debug)}`);
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

const remainingJoltageTarget = (
  target: number[],
  button: number[],
  presses = 1
): number[] => {
  for (let i = 0; i < button.length; i++) {
    target[button[i]] -= presses;
  }
  return target;
};

type ButtonInfo = {
  maxPresses: number;
  button: number[];
};

const calculateMaxPresses = (button: number[], target: number[]): number => {
  return Math.min(...button.map((i) => target[i]));
};

const getSortedButtons = (
  buttons: number[][],
  target: number[]
): ButtonInfo[] => {
  return buttons
    .map((btn) => ({
      maxPresses: calculateMaxPresses(btn, target),
      button: btn,
    }))
    .filter((b) => b.maxPresses > 0)
    .sort(
      (a, b) => b.button.length - a.button.length || b.maxPresses - a.maxPresses
    );
};

const pressAllButtonsWhereTargetIsEqualToTotalEffect = (
  btns: ButtonInfo[],
  target: number[],
  currentButtons = 0
): {
  buttons: ButtonInfo[];
  target: number[];
  currentButtons: number;
  solved: boolean;
  unsolvable: boolean;
} => {
  const result = {
    buttons: btns
      .map((b) => ({
        maxPresses: calculateMaxPresses(b.button, target),
        button: [...b.button],
      }))
      .filter((b) => b.maxPresses > 0),
    target: [...target],
    currentButtons,
    solved: false,
    unsolvable: false,
  };

  for (let i = 0; i < result.target.length; i++) {
    if (result.target[i] === 0) {
      continue;
    }
    const totalEffect = result.buttons
      .map((b) =>
        result.target.map((_, i) => (b.button.includes(i) ? b.maxPresses : 0))
      )
      .reduce((acc, be) => acc + be[i], 0);
    if (totalEffect < result.target[i]) {
      result.unsolvable = true;
      return result;
    }
    if (totalEffect === result.target[i]) {
      for (const button of result.buttons.filter((b) => b.button.includes(i))) {
        result.target = remainingJoltageTarget(
          [...result.target],
          button.button,
          button.maxPresses
        );
        result.currentButtons += button.maxPresses;
        button.maxPresses = 0;
      }
      if (result.target.some((t) => t < 0)) {
        result.unsolvable = true;
        return result;
      }
    }
  }

  if (result.target.every((t) => t === 0)) {
    result.currentButtons = currentButtons;
    result.solved = true;
  }
  return result;
};

const solveJoltageTargetByMaxPressesStrategy = (
  btns: ButtonInfo[],
  target: number[],
  currentButtons = 0,
  currentMin = Infinity,
  theoreticalMin = Math.max(...target)
): number => {
  if (target.every((t) => t === 0)) {
    return currentButtons;
  }
  if (target.some((t) => t < 0)) {
    return Infinity;
  }
  if (currentMin <= currentButtons + 1) {
    return Infinity;
  }
  const result = pressAllButtonsWhereTargetIsEqualToTotalEffect(
    btns,
    target,
    currentButtons
  );
  if (result.solved) {
    return result.currentButtons;
  } else if (result.unsolvable) {
    return Infinity;
  }
  const buttons = result.buttons;
  target = result.target;
  currentButtons = result.currentButtons;

  for (const button of buttons) {
    const newTarget = remainingJoltageTarget(
      [...target],
      button.button,
      button.maxPresses
    );
    const val = solveJoltageTargetByMaxPressesStrategy(
      [...buttons],
      [...newTarget],
      currentButtons + button.maxPresses,
      currentMin,
      theoreticalMin
    );
    currentMin = Math.min(currentMin, val);
    if (currentMin === theoreticalMin) {
      break;
    }
  }
  return currentMin;
};

const solveJoltageTargetByDecreasingPressesStrategy = (
  buttons: ButtonInfo[],
  target: number[],
  currentButtons = 0,
  currentMin = Infinity,
  theoreticalMin = Math.max(...target),
  firstCall = true,
  targetCache = new Map<string, number>()
): number => {
  const targetKey = target.join(",");
  if (targetCache.has(targetKey)) {
    return targetCache.get(targetKey)! + currentButtons;
  }

  if (target.every((t) => t === 0)) {
    return currentButtons;
  }
  if (target.some((t) => t < 0)) {
    return Infinity;
  }
  if (currentMin <= currentButtons + 1) {
    return Infinity;
  }

  if (!firstCall) {
    const result = pressAllButtonsWhereTargetIsEqualToTotalEffect(
      buttons,
      target,
      currentButtons
    );
    if (result.solved) {
      return result.currentButtons;
    } else if (result.unsolvable) {
      return Infinity;
    }
    buttons = result.buttons;
    target = result.target;
    currentButtons = result.currentButtons;

    for (const button of buttons) {
      const newTarget = remainingJoltageTarget(
        [...target],
        button.button,
        button.maxPresses
      );
      const val = solveJoltageTargetByDecreasingPressesStrategy(
        [...buttons],
        [...newTarget],
        currentButtons + button.maxPresses,
        currentMin,
        theoreticalMin,
        false,
        targetCache
      );
      targetCache.set(
        newTarget.join(","),
        val - currentButtons - button.maxPresses
      );
      currentMin = Math.min(currentMin, val);
      if (currentMin === theoreticalMin) {
        break;
      }
    }
  }

  if (currentMin === Infinity && buttons.length > 1 && firstCall) {
    for (const button of buttons) {
      const buttonsToTry = buttons.toSpliced(buttons.indexOf(button), 1);
      let pressesToTry = button.maxPresses - 1;
      const newTarget = remainingJoltageTarget(
        [...target],
        button.button,
        pressesToTry
      );
      while (pressesToTry >= 1) {
        const val = solveJoltageTargetByDecreasingPressesStrategy(
          buttonsToTry,
          [...newTarget],
          currentButtons + pressesToTry,
          currentMin,
          theoreticalMin,
          false,
          targetCache
        );
        targetCache.set(
          newTarget.join(","),
          val - currentButtons - pressesToTry
        );
        currentMin = Math.min(currentMin, val);
        if (currentMin < Infinity) {
          return currentMin;
        }
        pressesToTry--;
      }
    }

    let pressesToSubtractFromMax = 2;
    while (pressesToSubtractFromMax < 500) {
      for (const button of buttons) {
        const buttonsToTry = buttons.toSpliced(buttons.indexOf(button), 1);
        let pressesToTry = button.maxPresses - pressesToSubtractFromMax;
        const newTarget = remainingJoltageTarget(
          [...target],
          button.button,
          pressesToTry
        );
        if (pressesToTry >= 1) {
          const val = solveJoltageTargetByDecreasingPressesStrategy(
            buttonsToTry,
            [...newTarget],
            currentButtons + pressesToTry,
            currentMin,
            theoreticalMin,
            false,
            targetCache
          );
          targetCache.set(
            newTarget.join(","),
            val - currentButtons - pressesToTry
          );
          currentMin = Math.min(currentMin, val);
          if (currentMin < Infinity) {
            return currentMin;
          }
        }
      }
      pressesToSubtractFromMax++;
    }
  }

  return currentMin;
};
