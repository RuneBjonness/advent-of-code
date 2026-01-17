import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let nodes = new Set();
  let edges = [];

  input.split("\n").forEach((x) => {
    let [a, b] = x.split("-");
    nodes.add(a);
    nodes.add(b);
    edges.push([a, b]);
    edges.push([b, a]);
  });

  edges = edges.filter((e) => e[1] != "start" && e[0] != "end");

  let paths = [];
  getPathsFrom("start", edges, [], paths, getValidDestinationsSilver);

  return paths.length;
};

const gold = (input: string): number => {
  let nodes = new Set();
  let edges = [];

  input.split("\n").forEach((x) => {
    let [a, b] = x.split("-");
    nodes.add(a);
    nodes.add(b);
    edges.push([a, b]);
    edges.push([b, a]);
  });

  edges = edges.filter((e) => e[1] != "start" && e[0] != "end");
  let paths = [];
  getPathsFrom("start", edges, [], paths, getValidDestinationsGold);

  return paths.length;
};

export const day12 = new AocPuzzle(2021, 12, silver, gold);

function isBigCave(node) {
  return node.toUpperCase() == node;
}

function hasVisitedAnySmallCaveTwice(path) {
  let smallCaves = path.filter((p) => !isBigCave(p));
  let unique = new Set(smallCaves);
  return smallCaves.length != [...unique].length;
}

function getValidDestinationsSilver(node, edges, path) {
  return edges
    .filter((x) => x[0] == node && (isBigCave(x[1]) || !path.includes(x[1])))
    .map((e) => e[1]);
}

function getValidDestinationsGold(node, edges, path) {
  return edges
    .filter(
      (x) =>
        x[0] == node &&
        (isBigCave(x[1]) ||
          !path.some((p) => p == x[1]) ||
          !hasVisitedAnySmallCaveTwice(path)),
    )
    .map((e) => e[1]);
}

function getPathsFrom(node, edges, path, paths, getValidDestinations) {
  path.push(node);
  if (node == "end") {
    paths.push(path);
    return;
  }
  getValidDestinations(node, edges, path).forEach((d) => {
    getPathsFrom(d, edges, path.slice(), paths, getValidDestinations);
  });
}
