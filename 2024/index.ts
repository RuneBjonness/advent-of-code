import { day01 } from "./day-01/solution";
import { day02 } from "./day-02/solution";
import { day03 } from "./day-03/solution";
import { day04 } from "./day-04/solution";
import { day05 } from "./day-05/solution";
import { day06 } from "./day-06/solution";
import { day07 } from "./day-07/solution";

const dayEntries = [day01, day02, day03, day04, day05, day06, day07];

const parseDay = (day: string): number => {
  const dayNumber = Number(day);
  if (dayNumber < 1 || dayNumber > 25 || isNaN(dayNumber)) {
    throw new Error("Invalid day number");
  }
  return dayNumber;
};

const day = parseDay(process.argv[2]);
const partFilter = process.argv[3];

console.log("Solving for December ", day);

if (partFilter === "silver" || !partFilter) {
  console.log("--- Silver ---");
  performance.mark("start silver");
  console.log(dayEntries[day - 1].silver());
  performance.mark("end silver");
  console.log("\n");
}

if (partFilter === "gold" || !partFilter) {
  console.log("--- Gold ---");
  performance.mark("start gold");
  console.log(dayEntries[day - 1].gold());
  performance.mark("end gold");
  console.log("\n");
}

performance.measure("silver", "start silver", "end silver");
performance.measure("gold", "start gold", "end gold");

console.log(
  performance
    .getEntriesByType("measure")
    .map((m) => `${m.name}: ${m.duration.toFixed(1)} ms`)
);
