import type { SearchStep } from "./types";

export function linearSearchSteps(arr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  const a = [...arr];

  const push = (line: number, hi: number[]) => {
    steps.push({
      array: [...a],
      highlighted: hi,
      line,
    });
  };

  for (let i = 0; i < a.length; i++) {
    push(0, [i]); // loop line
    if (a[i] === target) {
      push(1, [i]); // found
      break;
    }
  }

  steps.push({ array: [...a], highlighted: [], line: -1 });
  return steps;
}
