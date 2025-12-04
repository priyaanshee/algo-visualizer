import type { Step } from "./types";

export function bubbleSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  let a = [...arr];
  const n = a.length;

  const add = (line: number, highlights: number[]) =>
    steps.push({ array: [...a], highlightedIndices: highlights, line });

  for (let i = 0; i < n - 1; i++) {
    add(0, [i]);
    for (let j = 0; j < n - i - 1; j++) {
      add(1, [j, j + 1]);
      add(2, [j, j + 1]);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        add(3, [j, j + 1]);
      }
    }
  }

  steps.push({ array: [...a], highlightedIndices: [], line: -1 });
  return steps;
}
