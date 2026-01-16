import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  return day20a(input);
};

const gold = (_input: string): number => {
  return 0;
};

export const day20 = new AocPuzzle(2020, 20, silver, gold);

// -----------------------------------------------------------------------------
// Legacy code from initial js implementation. To be ported
// -----------------------------------------------------------------------------

function day20a(input) {
  let tiles = [];
  input.split("\n").forEach((r) => {
    if (r.length > 0) {
      if (r.substring(0, 4) == "Tile") {
        tiles.push({ id: Number(r.substring(5, 9)), img: [] });
      } else {
        tiles[tiles.length - 1].img.push(r);
      }
    }
  });

  let allEdges = [];
  tiles.forEach((t) => {
    t["edges"] = getEdges(t.img);
    allEdges.push(
      ...t["edges"].map((e) => {
        return { id: t.id, edge: e };
      }),
    );
    allEdges.push(
      ...t["edges"].map((e) => {
        return { id: t.id, edge: e.split("").reverse().join("") };
      }),
    );
  });

  let cornerIds = [];
  tiles.forEach((t) => {
    if (
      t.edges.filter((e) =>
        allEdges
          .filter((a) => a.id != t.id)
          .map((a) => a.edge)
          .includes(e),
      ).length == 2
    ) {
      cornerIds.push(t.id);
    }
  });
  // console.log(cornerIds);
  return cornerIds.reduce((a, b) => a * b);
}

function getEdges(img) {
  return [
    img[0],
    img.map((r) => r[0]).join(""),
    img[9],
    img.map((r) => r[9]).join(""),
  ];
}
