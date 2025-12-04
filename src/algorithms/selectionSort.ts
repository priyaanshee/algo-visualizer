import type { Step } from "./types";

export function selectionSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  let a = [...arr];
  const n = a.length;

  const add = (line: number, hi: number[]) =>
    steps.push({ array: [...a], highlightedIndices: hi, line });

  for (let i = 0; i < n; i++) {
    let min = i;
    add(0, [i]);
    for (let j = i + 1; j < n; j++) {
      add(1, [j, min]);
      if (a[j] < a[min]) {
        min = j;
        add(2, [min]);
      }
    }
    [a[i], a[min]] = [a[min], a[i]];
    add(3, [i, min]);
  }

  steps.push({ array: [...a], highlightedIndices: [], line: -1 });
  return steps;
}
