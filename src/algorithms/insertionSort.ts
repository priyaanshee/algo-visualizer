import type { Step } from "./types";

export function insertionSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  let a = [...arr];

  const add = (line: number, hi: number[]) =>
    steps.push({ array: [...a], highlightedIndices: hi, line });

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    add(0, [i]);
    add(1, [i]);
    add(2, [j]);

    while (j >= 0 && a[j] > key) {
      add(3, [j, j + 1]);
      a[j + 1] = a[j];
      add(4, [j + 1]);
      j--;
    }
    a[j + 1] = key;
    add(5, [j + 1]);
  }

  steps.push({ array: [...a], highlightedIndices: [], line: -1 });
  return steps;
}
