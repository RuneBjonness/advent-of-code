import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  let result = 0;

  let fileIndex = -1;
  let lastFileIndex = (input.length + 1) / 2;

  let emptyIndex = -1;

  let blockIndex = 0;
  let remainingEmptyBlocks = 0;
  let remainingLastFileBlocks = 0;

  while (emptyIndex + 1 < lastFileIndex) {
    if (fileIndex <= emptyIndex) {
      fileIndex++;
      const blocks = Number(input[fileIndex * 2]);
      for (let i = 0; i < blocks; i++) {
        result += blockIndex * fileIndex;
        blockIndex++;
      }
    } else {
      emptyIndex++;
      remainingEmptyBlocks += Number(input[emptyIndex * 2 + 1]);
    }

    while (remainingEmptyBlocks > 0) {
      if (remainingLastFileBlocks > 0) {
        const blocks = Math.min(remainingEmptyBlocks, remainingLastFileBlocks);
        for (let i = 0; i < blocks; i++) {
          result += blockIndex * lastFileIndex;
          blockIndex++;
        }
        remainingEmptyBlocks -= blocks;
        remainingLastFileBlocks -= blocks;
      }

      if (remainingLastFileBlocks === 0) {
        lastFileIndex--;
        remainingLastFileBlocks = Number(input[lastFileIndex * 2]);
      }
    }
  }

  for (let i = 0; i < remainingLastFileBlocks; i++) {
    result += blockIndex * lastFileIndex;
    blockIndex++;
  }

  return result;
};

export const gold = (input: string): number => {
  let result = 0;
  let fileIndex = (input.length - 1) / 2;
  let diskMap = input.split("").map(Number);

  while (fileIndex > 0) {
    const blocks = diskMap[fileIndex * 2];
    let newIndex = fileIndex * 2;
    let blockOffset = 0;

    for (let i = 1; i < fileIndex * 2; i += 2) {
      if (diskMap[i] >= blocks) {
        blockOffset = Number(input[i]) - diskMap[i];
        diskMap[i] -= blocks;
        newIndex = i;
        break;
      }
    }

    const blockIndex = input
      .slice(0, newIndex)
      .split("")
      .reduce((acc, val) => acc + Number(val), 0);

    for (let i = 0; i < blocks; i++) {
      result += (blockIndex + blockOffset + i) * fileIndex;
    }
    fileIndex--;
  }

  return result;
};

export const day09 = new AocPuzzle(2024, 9, silver, gold, input);
