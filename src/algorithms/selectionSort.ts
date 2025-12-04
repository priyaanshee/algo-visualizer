export async function selectionSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  setHighlighted?: (indices: number[]) => void
) {
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (setHighlighted) setHighlighted([minIndex, j]);
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, speed));

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, speed));
  }

  if (setHighlighted) setHighlighted([]);
}
