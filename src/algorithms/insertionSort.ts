export async function insertionSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  setHighlighted?: (indices: number[]) => void
) {
  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      if (setHighlighted) setHighlighted([j, j + 1]);
      arr[j + 1] = arr[j];
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, Math.max(80, 1000 - speed)));
      j--;
    }

    arr[j + 1] = key;
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, Math.max(80, 1000 - speed)));
  }

  if (setHighlighted) setHighlighted([]);
  return arr;
}
