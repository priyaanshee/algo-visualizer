import type { Step } from "./types";

export function quickSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  let a = [...arr];

  const add = (line: number, hi: number[]) =>
    steps.push({ array: [...a], highlightedIndices: hi, line });

  function partition(low: number, high: number) {
    let pivot = a[high];
    add(0, [high]);
    let i = low - 1;
    for (let j = low; j < high; j++) {
      add(1, [j, high]);
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        add(2, [i, j]);
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    add(3, [i + 1, high]);
    return i + 1;
  }

  function quick(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quick(low, pi - 1);
      quick(pi + 1, high);
    }
  }

  quick(0, a.length - 1);
  steps.push({ array: [...a], highlightedIndices: [], line: -1 });
  return steps;
}
