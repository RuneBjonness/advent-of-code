import { describe, expect, test } from "bun:test";
import { day12 } from "./solution";

const testInput = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

describe("December 12", () => {
  // test("silver - test input", () => {
  //   expect(day12.silver(testInput)).toBe(2);
  // });

  test("silver - actual puzzle input", async () => {
    expect(day12.silver(await day12.readInput())).toBe(526);
  });
});
