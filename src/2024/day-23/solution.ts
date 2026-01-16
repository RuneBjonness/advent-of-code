import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  const nodes = parseNodes(input);
  const sets = new Set<string>();

  for (const node of nodes.keys()) {
    if (node.startsWith("t")) {
      for (const node2 of nodes.get(node)!) {
        for (const node3 of nodes.get(node2)!) {
          if (nodes.get(node3)!.includes(node)) {
            const connectedNodes = [node, node2, node3].sort();
            sets.add(
              `${connectedNodes[0]}-${connectedNodes[1]}-${connectedNodes[2]}`,
            );
          }
        }
      }
    }
  }
  return sets.size;
};

const gold = (input: string): string => {
  const nodes = parseNodes(input);
  nodes.forEach((value, key) => {
    nodes.set(key, value.sort());
  });

  let largestNetwork: string[] = [];
  const sortedKeys = [...nodes.keys()].sort();

  for (const key of sortedKeys) {
    const network = findLargestNetwork(
      [key],
      nodes.get(key)!.filter((x) => x > key),
      largestNetwork.length + 1,
      nodes,
    );
    if (network.length > largestNetwork.length) {
      largestNetwork = network;
    }
  }

  return largestNetwork.join(",");
};

export const day23 = new AocPuzzle(2024, 23, silver, gold);

const parseNodes = (input: string): Map<string, string[]> => {
  const nodes = new Map<string, string[]>();
  input.split("\n").forEach((line) => {
    const [from, to] = line.split("-");
    if (!nodes.has(from)) {
      nodes.set(from, []);
    }
    nodes.get(from)!.push(to);

    if (!nodes.has(to)) {
      nodes.set(to, []);
    }
    nodes.get(to)!.push(from);
  });
  return nodes;
};

const findLargestNetwork = (
  network: string[],
  sharedNodes: string[],
  minSize: number,
  nodes: Map<string, string[]>,
): string[] => {
  if (
    sharedNodes.length === 0 ||
    network.length + sharedNodes.length < minSize
  ) {
    return network;
  }
  let largestNetwork: string[] = [];
  for (const n of sharedNodes) {
    const networkCandidate = findLargestNetwork(
      [...network, n],
      nodes.get(n)!.filter((x) => sharedNodes.includes(x)),
      minSize,
      nodes,
    );
    if (networkCandidate.length > largestNetwork.length) {
      largestNetwork = networkCandidate;
      minSize = Math.max(largestNetwork.length + 1, minSize);
    }
  }
  return largestNetwork;
};
