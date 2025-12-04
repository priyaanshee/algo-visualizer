import type { Step } from "./types";

export function mergeSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  let a = [...arr];

  const add = (line: number, hi: number[]) =>
    steps.push({ array: [...a], highlightedIndices: hi, line });

  function merge(l: number, m: number, r: number) {
    let left = a.slice(l, m + 1);
    let right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    add(0, [l, r]);

    while (i < left.length && j < right.length) {
      add(1, [k]);
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      add(2, [k - 1]);
    }

    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];

    add(3, [l, r]);
  }

  function divide(l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    divide(l, m);
    divide(m + 1, r);
    merge(l, m, r);
  }

  divide(0, a.length - 1);
  steps.push({ array: [...a], highlightedIndices: [], line: -1 });
  return steps;
}
