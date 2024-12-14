import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";
import { cell, Direction, GridPosition, shiftPosition } from "@/lib/grid";

export const silver = (input: string): number => {
  const grid: Plot[][] = input
    .split("\n")
    .map((row) =>
      row.split("").map((plant) => ({ plant, region: 0, fences: [] }))
    );

  let totalPrice = 0;
  let regionId = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].region === 0) {
        regionId++;
        const r = identifyRegion(grid, regionId, { row, col });
        totalPrice +=
          r.length * r.reduce((acc, plot) => acc + plot.fences.length, 0);
      }
    }
  }

  return totalPrice;
};

export const gold = (input: string): number => {
  const grid: Plot[][] = input
    .split("\n")
    .map((row) =>
      row.split("").map((plant) => ({ plant, region: 0, fences: [] }))
    );

  const regions: Region[] = [];
  let regionId = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].region === 0) {
        regionId++;
        const r = identifyRegion(grid, regionId, { row, col });
        regions.push({
          id: regionId,
          area: r.length,
          sides: 0,
        });
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    regionId = 0;
    let fenceUp = false;
    let fenceDown = false;
    for (let col = 0; col < grid[row].length; col++) {
      const p = grid[row][col];
      if (p.region !== regionId) {
        regionId = p.region;
        fenceUp = false;
        fenceDown = false;
      }

      if (!fenceUp && p.fences.includes("up")) {
        fenceUp = true;
        const region = regions.find((r) => r.id === regionId);
        if (region) {
          region.sides++;
        }
      } else if (fenceUp && !p.fences.includes("up")) {
        fenceUp = false;
      }

      if (!fenceDown && p.fences.includes("down")) {
        fenceDown = true;
        const region = regions.find((r) => r.id === regionId);
        if (region) {
          region.sides++;
        }
      } else if (fenceDown && !p.fences.includes("down")) {
        fenceDown = false;
      }
    }
  }

  for (let col = 0; col < grid[0].length; col++) {
    regionId = 0;
    let fenceLeft = false;
    let fenceRight = false;
    for (let row = 0; row < grid.length; row++) {
      const p = grid[row][col];
      if (p.region !== regionId) {
        regionId = p.region;
        fenceLeft = false;
        fenceRight = false;
      }

      if (!fenceLeft && p.fences.includes("left")) {
        fenceLeft = true;
        const region = regions.find((r) => r.id === regionId);
        if (region) {
          region.sides++;
        }
      } else if (fenceLeft && !p.fences.includes("left")) {
        fenceLeft = false;
      }

      if (!fenceRight && p.fences.includes("right")) {
        fenceRight = true;
        const region = regions.find((r) => r.id === regionId);
        if (region) {
          region.sides++;
        }
      } else if (fenceRight && !p.fences.includes("right")) {
        fenceRight = false;
      }
    }
  }

  return regions.reduce((acc, region) => acc + region.area * region.sides, 0);
};

export const day12 = new AocPuzzle(2024, 12, silver, gold, input);

type Plot = {
  plant: string;
  region: number;
  fences: Direction[];
};

type Region = {
  id: number;
  area: number;
  sides: number;
};

const identifyRegion = (
  grid: Plot[][],
  id: number,
  pos: GridPosition
): Plot[] => {
  const p = cell(grid, pos);
  if (!p || p.region !== 0) {
    return [];
  }

  p.region = id;

  const region: Plot[] = [];
  const directions: Direction[] = ["right", "down", "left", "up"];

  for (const dir of directions) {
    const nextPos = shiftPosition(pos, dir);
    if (cell(grid, nextPos)?.plant === p.plant) {
      region.push(...identifyRegion(grid, id, nextPos));
    } else {
      p.fences.push(dir);
    }
  }
  region.push(p);

  return region;
};
