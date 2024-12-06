import { day01 } from "./day-01/solution";
import { day02 } from "./day-02/solution";
import { day03 } from "./day-03/solution";
import { day04 } from "./day-04/solution";
import { day05 } from "./day-05/solution";
import { day06 } from "./day-06/solution";

const dayEntries = [day01, day02, day03, day04, day05, day06];

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
  console.log(dayEntries[day - 1].silver());
  console.log("\n");
}

if (partFilter === "gold" || !partFilter) {
  console.log("--- Gold ---");
  console.log(dayEntries[day - 1].gold());
  console.log("\n");
}
