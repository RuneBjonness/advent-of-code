import { DayEntry } from "../aoc-day-entry";
import { input } from "./input";

export const silver = (input: string): number => {
  return input
    .split("\n")
    .reduce((acc, x) => acc + firstDigit(x) * 10 + lastDigit(x), 0);
};

export const gold = (input: string): number => {
  return input
    .split("\n")
    .reduce(
      (acc, x) =>
        acc + firstDigitOrSpelledDigit(x) * 10 + lastDigitOrSpelledDigit(x),
      0
    );
};

const digits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const firstDigit = (txt: string): number => {
  return Number(txt.match(/\d/)?.[0]);
};

const lastDigit = (txt: string): number => {
  return Number(txt.match(/(\d)/g)?.pop());
};

const firstDigitOrSpelledDigit = (txt: string): number => {
  return parseDigit(
    txt.match(/\d|zero|one|two|three|four|five|six|seven|eight|nine/)?.[0]
  );
};

const lastDigitOrSpelledDigit = (txt: string): number => {
  const matches = [
    ...txt.matchAll(
      /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g
    ),
  ];

  return parseDigit(matches.pop()?.[1]);
};

const parseDigit = (txt: string = ""): number => {
  return txt.length === 1 ? Number(txt) : digits.indexOf(txt);
};

export const day01: DayEntry = {
  silver: () => silver(input),
  gold: () => gold(input),
};
