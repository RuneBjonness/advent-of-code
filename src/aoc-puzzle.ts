export type PuzzlePart = "silver" | "gold";

export class AocPuzzle {
  private skipParts = new Map<PuzzlePart, string>();

  constructor(
    public readonly year: number,
    public readonly day: number,
    public readonly silver: (input: string) => number | string,
    public readonly gold: (input: string) => number | string,
    public readonly input: string
  ) {}

  skip(part: PuzzlePart, reason: string): AocPuzzle {
    this.skipParts.set(part, reason);
    return this;
  }

  solvePart(part: PuzzlePart): void {
    let resultValue: number | string;
    let duration = "--";
    let comment = "";

    if (this.skipParts.has(part)) {
      resultValue = "--";
      comment = this.skipParts.get(part);
    } else {
      performance.mark("start");
      resultValue =
        part === "silver" ? this.silver(this.input) : this.gold(this.input);
      performance.mark("end");

      if (Number.isNaN(resultValue)) {
        comment = "Not solved";
      } else {
        duration = performance
          .measure("solve", "start", "end")
          .duration.toFixed(1)
          .concat(" ms");
      }
    }

    const day = this.day.toString().padStart(2);
    const puzzlePart = part.padEnd(7);
    const result = resultValue.toString().padStart(18);
    duration = duration.padStart(10);

    console.log(
      `${this.year} | ${day} | ${puzzlePart}| ${result} | ${duration} | ${comment}`
    );
  }

  solve(): void {
    this.solvePart("silver");
    this.solvePart("gold");
  }
}
