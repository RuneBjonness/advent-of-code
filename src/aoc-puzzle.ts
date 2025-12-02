import { file } from "bun";
export type PuzzlePart = "silver" | "gold";

export class AocPuzzle {
  private readonly skipParts = new Map<PuzzlePart, string>();
  private readonly defaultInputPath: string;

  constructor(
    public readonly year: number,
    public readonly day: number,
    public readonly silver: (input: string) => number | string,
    public readonly gold: (input: string) => number | string
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

  solvePart(part: PuzzlePart, input: string): void {
    let resultValue: number | string;
    let duration = "--";

    if (this.skipParts.has(part)) {
      resultValue = this.skipParts.get(part);
    } else {
      performance.mark("start");
      resultValue = part === "silver" ? this.silver(input) : this.gold(input);
      performance.mark("end");

      if (Number.isNaN(resultValue)) {
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

  solve(input: string): void {
    this.solvePart("silver", input);
    this.solvePart("gold", input);
  }
}
