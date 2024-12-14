import { bench, describe } from "vitest";
import { numberOfStones, numberOfStonesSimple } from "./solution";

describe("numberOfStones - single digit 50 blinks", () => {
  bench("simple", () => {
    numberOfStonesSimple(0, 50, new Map<string, number>());
  });

  bench("1-digit-version", () => {
    numberOfStones(0, 50, new Map<string, number>());
  });
});

describe("numberOfStones - single digit 75 blinks", () => {
  bench("simple", () => {
    numberOfStonesSimple(0, 75, new Map<string, number>());
  });

  bench("1-digit-version", () => {
    numberOfStones(0, 75, new Map<string, number>());
  });
});

describe("numberOfStones - three digit 50 blinks", () => {
  bench("simple", () => {
    numberOfStonesSimple(213, 50, new Map<string, number>());
  });

  bench("1-digit-version", () => {
    numberOfStones(213, 50, new Map<string, number>());
  });
});

describe("numberOfStones - three digit 75 blinks", () => {
  bench("simple", () => {
    numberOfStonesSimple(213, 75, new Map<string, number>());
  });

  bench("1-digit-version", () => {
    numberOfStones(213, 75, new Map<string, number>());
  });
});
