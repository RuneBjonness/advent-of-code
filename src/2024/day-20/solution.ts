import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";
import {
  cell,
  Direction,
  distance,
  getPositions,
  GridPosition,
  shiftPosition,
} from "@/lib/grid";

export const silver = (input: string): number => {
  return countCheats(input, 100);
};

export const gold = (input: string): number => {
  const track = parseTrack(input);
  const path = traceTrack(track);
  let count = 0;
  for (let time = 0; time < path.length; time++) {
    count += findCheatsFromTime(time, 20, track, path).filter(
      (c) => c.save >= 100
    ).length;
  }
  return count;
};

export const day20 = new AocPuzzle(2024, 20, silver, gold, input);

export const countCheats = (input: string, minSave: number): number => {
  const track = parseTrack(input);
  const path = traceTrack(track);
  const cheats = findCheats(track, path).filter((c) => c.save >= minSave);
  return cheats.length;
};

type TrackCell = {
  type: string;
  time: number;
};

type Cheat = {
  start: GridPosition;
  end: GridPosition;
  save: number;
};

const parseTrack = (input: string): TrackCell[][] => {
  return input.split("\n").map((r) =>
    r.split("").map((c) => {
      return {
        type: c,
        time: Infinity,
      };
    })
  );
};

const directions: Direction[] = ["right", "left", "down", "up"];

const traceTrack = (track: TrackCell[][]): GridPosition[] => {
  let time = 0;
  let currentPos = getPositions(track, (c) => c.type === "S")[0];
  track[currentPos.row][currentPos.col].time = time;
  const path: GridPosition[] = [currentPos];

  let pathContinues = true;
  while (pathContinues) {
    time++;
    pathContinues = false;
    for (const dir of directions) {
      const nextPos = shiftPosition(currentPos, dir);
      const next = cell(track, nextPos);
      if (next && next?.type !== "#" && next?.time > time) {
        next.time = time;
        path.push(nextPos);
        currentPos = nextPos;
        pathContinues = true;
        break;
      }
    }
  }
  return path;
};

const findCheats = (track: TrackCell[][], path: GridPosition[]): Cheat[] => {
  const cheats: Cheat[] = [];
  for (const cheatStartPos of path) {
    const cheatStart = cell(track, cheatStartPos);
    for (const dir of directions) {
      const cheatEndPos = shiftPosition(cheatStartPos, dir, 2);
      const cheatEnd = cell(track, cheatEndPos);
      if (cheatEnd?.time < Infinity && cheatEnd?.time > cheatStart.time + 2) {
        cheats.push({
          start: cheatStartPos,
          end: cheatEndPos,
          save: cheatEnd.time - (cheatStart.time + 2),
        });
      }
    }
  }
  return cheats;
};

const findCheatsFromTime = (
  time: number,
  maxCheatLength: number,
  track: TrackCell[][],
  path: GridPosition[]
): Cheat[] => {
  const cheats: Cheat[] = [];
  const s = path[time];
  const possibleEnds = path
    .slice(time)
    .filter((e) => distance(s, e) <= maxCheatLength);
  for (const cheatEndPos of possibleEnds) {
    const cheatStart = cell(track, s);
    const cheatEnd = cell(track, cheatEndPos);
    if (
      cheatEnd?.time < Infinity &&
      cheatEnd?.time > cheatStart.time + distance(s, cheatEndPos)
    ) {
      cheats.push({
        start: s,
        end: cheatEndPos,
        save: cheatEnd.time - (cheatStart.time + distance(s, cheatEndPos)),
      });
    }
  }
  return cheats;
};
