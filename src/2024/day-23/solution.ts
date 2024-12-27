import { AocPuzzle } from "@/aoc-puzzle";
import { input } from "./input";

export const silver = (input: string): number => {
  const nodes = parseNodes(input);
  const sets = new Set<string>();

  for (const node of nodes.keys()) {
    if (node.startsWith("t")) {
      for (const node2 of nodes.get(node)!) {
        for (const node3 of nodes.get(node2)!) {
          if (nodes.get(node3)!.includes(node)) {
            const connectedNodes = [node, node2, node3].sort();
            sets.add(
              `${connectedNodes[0]}-${connectedNodes[1]}-${connectedNodes[2]}`
            );
          }
        }
      }
    }
  }
  return sets.size;
};

export const gold = (input: string): string => {
  const nodes = parseNodes(input);
  nodes.forEach((value, key) => {
    nodes.set(key, value.sort());
  });

  let longest = [];
  const sortedKeys = [...nodes.keys()].sort();

  for (const key of sortedKeys) {
    const chain = longestChain(
      key,
      nodes.get(key)!.filter((x) => x > key),
      nodes
    );
    console.log("key:", key, "chain:", chain);
    if (chain.length > longest.length) {
      longest = chain;
      console.log("-------new longest:", chain.join(","));
    }
  }

  console.log("longest:", longest);

  return longest.join(",");
};

export const day23 = new AocPuzzle(2024, 23, silver, gold, input);

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

const longestChain = (
  node: string,
  common: string[],
  nodes: Map<string, string[]>
): string[] => {
  if (common.length === 0) {
    return [node];
  }
  let longest = [];
  for (const c of common) {
    const chain = longestChain(
      c,
      nodes.get(c)!.filter((x) => common.includes(x)),
      nodes
    );
    if (chain.length > longest.length) {
      longest = chain;
    }
  }
  return [node, ...longest];
};
