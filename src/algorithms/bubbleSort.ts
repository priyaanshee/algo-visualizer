export async function bubbleSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  setHighlighted?: (indices: number[]) => void
) {
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // highlight compared bars
      if (setHighlighted) setHighlighted([j, j + 1]);
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, speed));

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);  // show swap
        await new Promise((r) => setTimeout(r, speed));
      }
    }
  }

  if (setHighlighted) setHighlighted([]); // remove highlight
}
