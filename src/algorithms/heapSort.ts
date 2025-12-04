import type { Step } from "./types";

export function heapSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  let a = [...arr];
  const n = a.length;

  const add = (line: number, hi: number[]) =>
    steps.push({ array: [...a], highlightedIndices: hi, line });

  function heapify(size: number, i: number) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    add(0, [i]);

    if (left < size && a[left] > a[largest]) {
      largest = left;
      add(1, [left]);
    }
    if (right < size && a[right] > a[largest]) {
      largest = right;
      add(2, [right]);
    }
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      add(3, [i, largest]);
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2); i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    add(4, [0, i]);
    heapify(i, 0);
  }

  steps.push({ array: [...a], highlightedIndices: [], line: -1 });
  return steps;
}
