import { AocPuzzle } from "@/aoc-puzzle";
import { Heap } from "@/lib/heap";
import { distance, Vec3, vec3 } from "@/lib/vec3";

const silver = (input: string): number => {
  return solve(input, false, true)[0];
};

const gold = (input: string): number => {
  return solve(input, true, false)[1];
};

const both = (input: string): [number, number] => {
  return solve(input);
};

export const day08 = new AocPuzzle(2025, 8, silver, gold, both);

const parsePositions = (input: string) =>
  input.split("\n").map((x) => {
    const [xPos, yPos, zPos] = x.split(",").map(Number);
    return vec3(xPos, yPos, zPos);
  });

type DistanceCache = { a: Vec3; b: Vec3; distance: number };

const calculateDistances = (positions: Vec3[]): Heap<DistanceCache> => {
  const distanceHeap: Heap<DistanceCache> = new Heap<DistanceCache>(
    (a, b) => a.distance - b.distance
  );
  for (let indexA = 0; indexA < positions.length - 1; indexA++) {
    const posA = positions[indexA];
    for (let indexB = indexA + 1; indexB < positions.length; indexB++) {
      const posB = positions[indexB];
      distanceHeap.push({ a: posA, b: posB, distance: distance(posA, posB) });
    }
  }

  return distanceHeap;
};

const calculateClosestDistances = (
  positions: Vec3[],
  n = 1000
): Heap<DistanceCache> => {
  const maxHeap: Heap<DistanceCache> = new Heap<DistanceCache>(
    (a, b) => b.distance - a.distance
  );
  for (let indexA = 0; indexA < positions.length - 1; indexA++) {
    const posA = positions[indexA];
    for (let indexB = indexA + 1; indexB < positions.length; indexB++) {
      const posB = positions[indexB];
      const dist = distance(posA, posB);
      if (maxHeap.size >= n) {
        if (dist < maxHeap.peek()!.distance) {
          maxHeap.replace({ a: posA, b: posB, distance: dist });
        }
      } else {
        maxHeap.push({ a: posA, b: posB, distance: dist });
      }
    }
  }
  const minHeap: Heap<DistanceCache> = new Heap<DistanceCache>(
    (a, b) => a.distance - b.distance
  );
  minHeap.init([...maxHeap.data]);
  return minHeap;
};

export const solve = (
  input: string,
  skipSilverSolution = false,
  skipGoldSolution = false,
  silverConnections = 1000
): [number, number] => {
  const positions = parsePositions(input);
  const distances = skipGoldSolution
    ? calculateClosestDistances(positions, silverConnections)
    : calculateDistances(positions);
  const circuits: Vec3[][] = [];

  let count = 0;
  let silverResult = 0;
  let goldResult = 0;

  while (distances.size > 0) {
    count++;
    const { a, b } = distances.pop();
    if (
      !circuits.some((circuit) => circuit.includes(a) && circuit.includes(b))
    ) {
      const circuitWithA = circuits.find((circuit) => circuit.includes(a));
      const circuitWithB = circuits.find((circuit) => circuit.includes(b));

      if (circuitWithA && circuitWithB) {
        circuitWithA.push(...circuitWithB);
        const index = circuits.indexOf(circuitWithB);
        circuits.splice(index, 1);
      } else if (circuitWithA) {
        circuitWithA.push(b);
      } else if (circuitWithB) {
        circuitWithB.push(a);
      } else {
        circuits.push([a, b]);
      }
    }

    if (
      !skipSilverSolution &&
      silverResult === 0 &&
      count >= silverConnections
    ) {
      const circuitSizes = circuits.map((c) => c.length).sort((a, b) => b - a);
      silverResult = circuitSizes[0] * circuitSizes[1] * circuitSizes[2];
    }

    if (circuits.length === 1 && circuits[0].length === positions.length) {
      goldResult = a.x * b.x;
      break;
    }
  }
  return [silverResult, goldResult];
};
