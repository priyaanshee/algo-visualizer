export async function mergeSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  setHighlighted?: (indices: number[]) => void
): Promise<number[]> {
  async function merge(
    left: number[],
    right: number[],
    startIndex: number
  ): Promise<number[]> {
    let result: number[] = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (setHighlighted)
        setHighlighted([startIndex + i, startIndex + j + left.length]);
      await new Promise((res) =>
        setTimeout(res, Math.max(80, 1000 - speed))
      );

      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }

      const updated = [
        ...array.slice(0, startIndex),
        ...result,
        ...left.slice(i),
        ...right.slice(j),
        ...array.slice(startIndex + left.length + right.length)
      ];
      setArray(updated);
      array = updated;
    }

    result = [...result, ...left.slice(i), ...right.slice(j)];

    const updated = [
      ...array.slice(0, startIndex),
      ...result,
      ...array.slice(startIndex + left.length + right.length)
    ];
    setArray(updated);
    array = updated;

    await new Promise((res) =>
      setTimeout(res, Math.max(80, 1000 - speed))
    );

    return result;
  }

  async function divide(arr: number[], startIndex: number): Promise<number[]> {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await divide(arr.slice(0, mid), startIndex);
    const right = await divide(arr.slice(mid), startIndex + mid);
    return merge(left, right, startIndex);
  }

  const sorted = await divide(array, 0);
  if (setHighlighted) setHighlighted([]);
  return sorted;
}
