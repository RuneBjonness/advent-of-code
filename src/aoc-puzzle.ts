import { file } from "bun";
export type PuzzlePart = "silver" | "gold" | "both";

export class AocPuzzle {
  private readonly skipParts = new Map<PuzzlePart, string>();
  private readonly defaultInputPath: string;

  constructor(
    public readonly year: number,
    public readonly day: number,
    public readonly silver: (input: string) => number | string,
    public readonly gold: (input: string) => number | string,
    public readonly both?: (input: string) => [number | string, number | string]
  ) {
    this.defaultInputPath = `./input/${this.year}_${this.day
      .toString()
      .padStart(2, "0")}.txt`;
  }

  skip(part: PuzzlePart, reason: string): AocPuzzle {
    this.skipParts.set(part, reason);
    return this;
  }

  async readInput(path?: string): Promise<string> {
    const text = (await file(path ?? this.defaultInputPath).text()).trimEnd();
    return text;
  }

  solvePart(part: PuzzlePart, input: string, dryRun: boolean): void {
    let resultValue: number | string = "";
    let duration = "--";

    if (this.skipParts.has(part)) {
      resultValue = this.skipParts.get(part);
    } else {
      performance.mark("start");
      if (!dryRun) {
        if (part === "silver") {
          resultValue = this.silver(input);
        } else if (part === "gold") {
          resultValue = this.gold(input);
        } else if (part === "both") {
          let silverResult: number | string;
          let goldResult: number | string;
          if (this.both) {
            [silverResult, goldResult] = this.both(input);
          } else {
            silverResult = this.silver(input);
            goldResult = this.gold(input);
          }
          resultValue = `${silverResult}\n${String().padStart(
            35
          )}${goldResult}`;
        }
      }
      performance.mark("end");

      if (Number.isNaN(resultValue) || resultValue === "") {
        resultValue = "Not solved";
      } else {
        duration = performance
          .measure("solve", "start", "end")
          .duration.toFixed(1)
          .concat(" ms");
      }
    }

    const day = this.day.toString().padStart(2);
    const puzzlePart = part.padEnd(7);
    const result = resultValue.toString();
    duration = duration.padStart(10);

    console.log(
      `${this.year} | ${day} | ${puzzlePart} | ${duration} | ${result}`
    );
  }

  solve(input: string, dryRun: boolean): void {
    this.solvePart("silver", input, dryRun);
    this.solvePart("gold", input, dryRun);
    this.solvePart("both", input, dryRun);
  }
}
