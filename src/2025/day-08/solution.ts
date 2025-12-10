import { AocPuzzle } from "@/aoc-puzzle";
import { distance, Vec3, vec3 } from "@/lib/vec3";

const silver = (input: string): number => {
  return productOfThreeLargestCircuits(input, 1000);
};

const gold = (input: string): number => {
  const positions = parsePositions(input);
  const distances = calculateDistances(positions);
  const circuits: Vec3[][] = [];

  for (const { a, b } of distances) {
    if (
      circuits.some((circuit) => circuit.includes(a) && circuit.includes(b))
    ) {
      continue;
    }

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

    if (circuits.length === 1 && circuits[0].length === positions.length) {
      return a.x * b.x;
    }
  }
  return 0;
};

const both = (input: string): [number, number] => {
  const positions = parsePositions(input);
  const distances = calculateDistances(positions);
  const circuits: Vec3[][] = [];

  let silverResult = 0;
  let goldResult = 0;

  for (let i = 0; i < distances.length; i++) {
    const { a, b } = distances[i];
    if (
      circuits.some((circuit) => circuit.includes(a) && circuit.includes(b))
    ) {
      continue;
    }

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

    if (silverResult === 0 && i >= 999) {
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

export const day08 = new AocPuzzle(2025, 8, silver, gold, both);

const parsePositions = (input: string) =>
  input.split("\n").map((x) => {
    const [xPos, yPos, zPos] = x.split(",").map(Number);
    return vec3(xPos, yPos, zPos);
  });

type DistanceCache = { a: Vec3; b: Vec3; distance: number };

const calculateDistances = (positions: Vec3[]): DistanceCache[] => {
  const distances: DistanceCache[] = [];
  for (let indexA = 0; indexA < positions.length - 1; indexA++) {
    const posA = positions[indexA];
    for (let indexB = indexA + 1; indexB < positions.length; indexB++) {
      const posB = positions[indexB];
      distances.push({ a: posA, b: posB, distance: distance(posA, posB) });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);
  return distances;
};

export const productOfThreeLargestCircuits = (
  input: string,
  maxConnections: number
): number => {
  const positions = parsePositions(input);
  const distances = calculateDistances(positions);

  const circuits: Vec3[][] = [];

  for (const { a, b } of distances.slice(0, maxConnections)) {
    if (
      circuits.some((circuit) => circuit.includes(a) && circuit.includes(b))
    ) {
      continue;
    }

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
  const circuitSizes = circuits.map((c) => c.length).sort((a, b) => b - a);

  return circuitSizes[0] * circuitSizes[1] * circuitSizes[2];
};
