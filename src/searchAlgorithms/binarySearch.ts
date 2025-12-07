import type { SearchStep } from "./types";

export function binarySearchSteps(arr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  const a = [...arr].sort((x, y) => x - y);

  const push = (line: number, hi: number[]) => {
    steps.push({
      array: [...a],
      highlighted: hi,
      line,
    });
  };

  let low = 0, high = a.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    push(0, [low, mid, high]);    // range highlight

    if (a[mid] === target) {
      push(1, [mid]);             // found
      break;
    }

    push(2, [mid]);               // comparison line
    if (a[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  steps.push({ array: [...a], highlighted: [], line: -1 });
  return steps;
}
