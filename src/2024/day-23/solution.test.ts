import { describe, expect, test } from "vitest";
import { day23 } from "./solution";

const testInput = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

describe("December 23", () => {
  test("silver - test input", () => {
    expect(day23.silver(testInput)).toBe(7);
  });

  test("silver - actual puzzle input", async () => {
    expect(day23.silver(await day23.readInput())).toBe(1200);
  });

  test("gold - test input", () => {
    expect(day23.gold(testInput)).toBe("co,de,ka,ta");
  });

  test("gold - actual puzzle input", async () => {
    expect(day23.gold(await day23.readInput())).toBe(
      "ag,gh,hh,iv,jx,nq,oc,qm,rb,sm,vm,wu,zr"
    );
  });
});
