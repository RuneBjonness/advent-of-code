import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return countPaths(parseDevices(input), "you", "out");
};

const gold = (input: string): number => {
  return (
    countPathsWithNodes(parseDevices(input), "svr", "out", ["fft", "dac"]).find(
      (item) => item.requiredDevices === 2
    )?.pathCount || 0
  );
};

const both = (input: string): [number, number] => {
  const devices = parseDevices(input);
  return [
    countPaths(devices, "you", "out"),
    countPathsWithNodes(devices, "svr", "out", ["fft", "dac"]).find(
      (item) => item.requiredDevices === 2
    )?.pathCount || 0,
  ];
};

export const day11 = new AocPuzzle(2025, 11, silver, gold, both);

const parseDevices = (input: string): Record<string, string[]> => {
  const devices: Record<string, string[]> = {};
  const lines = input.split("\n").map((line) => line.split(": "));
  for (const [device, connections] of lines) {
    devices[device] = connections.split(" ");
  }
  return devices;
};

const countPaths = (
  devices: Record<string, string[]>,
  current: string,
  target: string
): number => {
  if (current === target) {
    return 1;
  }
  let pathCount = 0;
  for (const output of devices[current] || []) {
    pathCount += countPaths(devices, output, target);
  }
  return pathCount;
};

type PathCount = { pathCount: number; requiredDevices: number };

const countPathsWithNodes = (
  devices: Record<string, string[]>,
  current: string,
  target: string,
  requiredDevices: string[],
  pathCache: Record<string, PathCount[]> = {}
): PathCount[] => {
  if (current === target) {
    return [{ pathCount: 1, requiredDevices: 0 }];
  }
  if (pathCache[current]) {
    return pathCache[current];
  }

  let pathCounts: PathCount[] = [];
  for (const output of devices[current] || []) {
    pathCounts.push(
      ...countPathsWithNodes(
        devices,
        output,
        target,
        requiredDevices,
        pathCache
      )
    );
  }

  pathCounts = pathCounts.reduce<PathCount[]>((acc, curr) => {
    const existing = acc.find(
      (item) => item.requiredDevices === curr.requiredDevices
    );
    if (existing) {
      existing.pathCount += curr.pathCount;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  if (requiredDevices.includes(current)) {
    for (const pathCount of pathCounts) {
      pathCount.requiredDevices += 1;
    }
  }

  pathCache[current] = pathCounts;
  return pathCounts;
};
