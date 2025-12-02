import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
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

const gold = (input: string): string => {
  const [wires, gateSection] = input.split("\n\n");
  const bits = wires.split("\n").length / 2;

  let gateConnections: GateConnection[] = gateSection.split("\n").map((g) => {
    const [in1, gate, in2, _, out] = g.split(" ");
    return { in1, gate, in2, out };
  });

  const swappedGateOutputs: string[] = [];
  const fullAdderWireKeys: FullAdderWireKeys[] = Array(bits)
    .fill({})
    .map(() => ({
      xorXY: "",
      xorCpS1: "",
      andXY: "",
      andCpS1: "",
      orC1C2: "",
    }));

  let bitPos = 0;
  while (bitPos < bits) {
    const bitPosString = bitPos.toString(10).padStart(2, "0");
    const xyGates = gateConnections.filter(
      (g) => g.in1.includes(bitPosString) || g.in2.includes(bitPosString)
    );
    const xorXY = xyGates.find((g) => g.gate === "XOR");
    const andXY = xyGates.find((g) => g.gate === "AND");

    const expectedZ = `z${bitPosString}`;

    const fa = fullAdderWireKeys[bitPos];

    if (bitPos === 0) {
      // First bit is only using a half adder. Setting result from andXY in orC1C2 to get started.
      if (xorXY.out !== expectedZ) {
        swappedGateOutputs.push(expectedZ, xorXY.out);
        gateConnections = swapGateOutputs(
          gateConnections,
          expectedZ,
          xorXY.out
        );
      }
      fa.orC1C2 = andXY.out;
    } else {
      const cp = fullAdderWireKeys[bitPos - 1].orC1C2;

      const cpS1Gates = gateConnections.filter(
        (g) =>
          g.in1 === xorXY.out ||
          g.in2 === xorXY.out ||
          g.in1 === cp ||
          g.in2 === cp
      );

      let xorCpS1 = cpS1Gates.find((g) => g.gate === "XOR");

      if (cpS1Gates.length > 2) {
        let toSwapA = "";
        let toSwapB = "";
        if (xorCpS1.in1 !== cp && xorCpS1.in2 !== cp) {
          toSwapA = cp;
          toSwapB = xorCpS1.in1 === xorXY.out ? xorCpS1.in2 : xorCpS1.in1;
          gateConnections = swapGateOutputs(gateConnections, toSwapA, toSwapB);
          swappedGateOutputs.push(toSwapA, toSwapB);
        } else if (xorCpS1.in1 !== xorXY.out && xorCpS1.in2 !== xorXY.out) {
          toSwapA = xorXY.out;
          toSwapB = xorCpS1.in1 === cp ? xorCpS1.in2 : xorCpS1.in1;
          gateConnections = swapGateOutputs(gateConnections, toSwapA, toSwapB);
          swappedGateOutputs.push(toSwapA, toSwapB);
        }
        fa.xorXY = toSwapB;
      } else {
        fa.xorXY = xorXY.out;
      }

      fa.xorCpS1 = xorCpS1.out;
      if (fa.xorCpS1 !== expectedZ) {
        gateConnections = swapGateOutputs(
          gateConnections,
          expectedZ,
          fa.xorCpS1
        );
        swappedGateOutputs.push(expectedZ, fa.xorCpS1);
        fa.xorCpS1 = expectedZ;
      }

      fa.andXY = andXY.out;
      fa.andCpS1 = gateConnections.find(
        (g) => (g.in1 === fa.xorXY || g.in2 === fa.xorXY) && g.gate === "AND"
      ).out;

      const orC1C2candidates = gateConnections.filter(
        (g) =>
          (g.in1 === fa.andXY ||
            g.in2 === fa.andXY ||
            g.in1 === fa.andCpS1 ||
            g.in2 === fa.andCpS1) &&
          g.gate === "OR"
      );

      if (orC1C2candidates.length === 1) {
        fa.orC1C2 = orC1C2candidates[0].out;
      }
    }
    // console.log(`${fa.xorXY}-${fa.xorCpS1}-${fa.andXY}-${fa.andCpS1}-${fa.orC1C2}`);

    bitPos++;
  }

  return swappedGateOutputs.sort().join(",");
};

export const day24 = new AocPuzzle(2024, 24, silver, gold);

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

type FullAdderWireKeys = {
  xorXY: string;
  xorCpS1: string;
  andXY: string;
  andCpS1: string;
  orC1C2: string;
};

const swapGateOutputs = (
  gateConnections: GateConnection[],
  a: string,
  b: string
): GateConnection[] => {
  return gateConnections.map((gc) => {
    if (gc.out === a) {
      gc.out = b;
    } else if (gc.out === b) {
      gc.out = a;
    }
    return gc;
  });
};
