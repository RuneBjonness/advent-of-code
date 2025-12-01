# advent-of-code

Advent of code solutions

```
> bun run dev [options]

Options:
  -y | --year <year> | Specify the year (e.g., 2025)
  -d | --day <day>   | Specify the day (1-25)
     | --silver      | Run only part 1 (the silver star)
     | --gold        | Run only part 2 (the gold star)
  -p | --path <path> | Specify a custom input file path (requires --year and --day to be set)

Examples:
  # Run all solutions for every year and day available:
  > bun run dev

  # Run both parts for day 1, 2025 - using custom input file
  > bun run dev -y 2025 -d 1 --path ./input/2025_01.txt

  # Run silver solution for day 24, 2024
  > bun run dev -y 2024 -d 24 --silver
```

This works for the solutions in TypeScript (2019, 2023-2025).

2020 (day 20) & 2021 (day 1-19) are in plain JavaScript
