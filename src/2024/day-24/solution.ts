import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const [wireValues, gateConnections] = input.split("\n\n");

  const wires = new Map<string, number>();
  for (const wireValue of wireValues.split("\n")) {
    const [wire, value] = wireValue.split(": ");
    wires.set(wire, Number(value));
  }

  const waitingGates: GateConnection[] = [];
  for (const gateConnection of gateConnections.split("\n")) {
    const [in1, gate, in2, _, out] = gateConnection.split(" ");
    waitingGates.push({ in1, gate, in2, out });
  }

  while (waitingGates.length > 0) {
    const gateConnection = waitingGates.shift();
    if (!resolveGateConnection(gateConnection, wires)) {
      waitingGates.push(gateConnection);
    }
  }

  const binary = [...wires.keys()]
    .filter((key) => key.startsWith("z"))
    .sort((a, b) => (a < b ? 1 : -1))
    .map((key) => wires.get(key))
    .join("");

  return parseInt(binary, 2);
};

export const gold = (input: string): number => {
  return NaN;
};

export const day24 = new AocPuzzle(2024, 24, silver, gold, input);

type GateConnection = {
  in1: string;
  in2: string;
  gate: string;
  out: string;
};

const resolveGateConnection = (
  gateConnection: GateConnection,
  wires: Map<string, number>
): boolean => {
  const { in1, in2, gate, out } = gateConnection;
  const value1 = wires.get(in1);
  const value2 = wires.get(in2);
  if (value1 === undefined || value2 === undefined) {
    return false;
  }

  switch (gate) {
    case "AND":
      wires.set(out, value1 & value2);
      break;
    case "OR":
      wires.set(out, value1 | value2);
      break;
    case "XOR":
      wires.set(out, value1 ^ value2);
      break;
    default:
      throw new Error(`Unknown gate: ${gate}`);
  }
  return true;
};
