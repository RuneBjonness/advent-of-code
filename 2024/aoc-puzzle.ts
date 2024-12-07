export type PuzzlePart = "silver" | "gold";

export class AocPuzzle {
  constructor(
    public readonly year: number,
    public readonly day: number,
    public readonly silver: (input: string) => number,
    public readonly gold: (input: string) => number,
    public readonly input: string
  ) {}

  solvePart(part: PuzzlePart): void {
    performance.mark("start");
    const resultValue =
      part === "silver" ? this.silver(this.input) : this.gold(this.input);
    performance.mark("end");

    const day = this.day.toString().padStart(2);
    const puzzlePart = part.padEnd(7);
    const result = resultValue.toString().padStart(18);

    const duration = performance
      .measure("solve", "start", "end")
      .duration.toFixed(1)
      .padStart(8)
      .concat(" ms");

    console.log(
      `${this.year} | ${day} | ${puzzlePart}| ${result} | ${duration}`
    );
  }

  solve(): void {
    this.solvePart("silver");
    this.solvePart("gold");
  }
}
