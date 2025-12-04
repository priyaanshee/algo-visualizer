import { useState, useEffect } from "react";
import { bubbleCode } from "../pseudocode/bubbleCode";
import { selectionCode } from "../pseudocode/selectionCode";
import { insertionCode } from "../pseudocode/insertionCode";
import { mergeCode } from "../pseudocode/mergeCode";
import { quickCode } from "../pseudocode/quickCode";
import { heapCode } from "../pseudocode/heapCode";




type Step = {
  array: number[];
  highlightedIndices: number[];
  line: number; // which line of pseudocode is active
};

// --------- BUBBLE SORT PSEUDOCODE ---------
const bubbleCode = [
  "for i from 0 to n - 1:",
  "  for j from 0 to n - i - 2:",
  "    if arr[j] > arr[j + 1]:",
  "      swap arr[j], arr[j + 1]"
];

const selectionCode= [
  "for i from 0 to n - 1:",
  "minIndex = i",
  "for j from i + 1 to n - 1:",
    "if arr[j] < arr[minIndex]:",
      "minIndex = j",
  "swap arr[i], arr[minIndex]"
];

const insertionCode=[
  "for i from 1 to n - 1:"
  "key = arr[i]"
  "j = i - 1"
  "while j >= 0 and arr[j] > key:"
    "arr[j + 1] = arr[j]"
    "j = j - 1"
  "arr[j + 1] = key"
];

const mergeSort=[
  "function mergeSort(arr):"
  "if length(arr) <= 1:"
    "return arr"

  "mid = length(arr) / 2"
  "left = mergeSort(arr[0 ... mid])"
  "right = mergeSort(arr[mid ... end])"

  "return merge(left, right)"

"function merge(left, right):"
  "result = []"
  "while left and right exist:"
    "if left[0] <= right[0]:"
      "push left[0] to result"
      "remove it from left"
    "else:"
      "push right[0] to result"
      "remove it from right"
  "append remaining left + remaining right to result"
  "return result"

];

const quickCode = [
  "function quickSort(arr, low, high):",
  "  if low < high:",
  "    pivotIndex = partition(arr, low, high)",
  "    quickSort(arr, low, pivotIndex - 1)",
  "    quickSort(arr, pivotIndex + 1, high)",
  "",
  "function partition(arr, low, high):",
  "  pivot = arr[high]",
  "  i = low - 1",
  "  for j from low to high - 1:",
  "    if arr[j] <= pivot:",
  "      i = i + 1; swap arr[i], arr[j]",
  "  swap arr[i + 1], arr[high]",
  "  return i + 1"
];

const heapCode = [
  "function heapSort(arr):",
  "  buildMaxHeap(arr)",
  "  for i from n - 1 to 1:",
  "    swap arr[0], arr[i]",
  "    heapify(arr, 0, i)",
  "",
  "function buildMaxHeap(arr):",
  "  for i from n/2 down to 0:",
  "    heapify(arr, i, n)",
  "",
  "function heapify(arr, i, size):",
  "  left = 2i + 1",
  "  right = 2i + 2",
  "  largest = i",
  "  if left < size and arr[left] > arr[largest]: largest = left",
  "  if right < size and arr[right] > arr[largest]: largest = right",
  "  if largest != i: swap & heapify again"
];


// Generate all animation steps for bubble sort
function generateBubbleSteps(initial: number[]): Step[] {
  const steps: Step[] = [];
  let a = [...initial];
  const n = a.length;

  const push = (line: number, hi: number[]) => {
    steps.push({
      array: [...a],
      highlightedIndices: hi,
      line
    });
  };

  for (let i = 0; i < n - 1; i++) {
    push(0, [i]); // outer loop line
    for (let j = 0; j < n - i - 1; j++) {
      push(1, [j, j + 1]); // inner loop line
      push(2, [j, j + 1]); // comparison line
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        push(3, [j, j + 1]); // swap line
      }
    }
  }

  // final sorted state
  steps.push({
    array: [...a],
    highlightedIndices: [],
    line: -1
  });

  return steps;
}

export default function SortingPage() {
  // base unsorted array (whatever the user typed / random)
  const [baseArray, setBaseArray] = useState<number[]>([5, 1, 4, 2, 8]);
  const [inputValue, setInputValue] = useState("5,1,4,2,8");

  // steps + playback state
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // delay between steps (ms). Bigger = slower.
  const [speed, setSpeed] = useState(600);

  // which algorithm is selected (for now only bubble implemented)
  const [algorithm, setAlgorithm] = useState<"bubble" | "selection" | "insertion" | "merge">("bubble");
const [algorithm, setAlgorithm] = useState("bubble");

  // current frame to render
  const current: Step = steps.length
    ? steps[currentStep]
    : {
        array: baseArray,
        highlightedIndices: [],
        line: -1
      };

  const maxVal = current.array.length ? Math.max(...current.array) : 1;

  // ---------- PLAYBACK EFFECT (handles speed / pause / stop) ----------
  useEffect(() => {
    if (!isPlaying) return;
    if (!steps.length) {
      setIsPlaying(false);
      return;
    }
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const id = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(id);
  }, [isPlaying, currentStep, steps, speed]);

  // ---------- HELPERS ----------

  // Parse array from input textbox
  const parseInputToArray = (): number[] => {
    const values = inputValue
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));
    return values;
  };

  const handleRandom = () => {
    const len = 8;
    const temp = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setBaseArray(temp);
    setInputValue(temp.join(","));
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleApplyInput = () => {
    const values = parseInputToArray();
    if (!values.length) return;
    setBaseArray(values);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStart = () => {
    const values = parseInputToArray();
    if (!values.length) return;
    setBaseArray(values);

    if (algorithm === "bubble") {
      const allSteps = generateBubbleSteps(values);
      setSteps(allSteps);
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      // other algorithms will be wired here later
      const allSteps = generateBubbleSteps(values); // temporary so it still works
      setSteps(allSteps);
      setCurrentStep(0);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleResume = () => {
    if (steps.length && currentStep < steps.length - 1) {
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setSteps([]);
    setCurrentStep(0); // show unsorted base array again
  };

  return (
    <div className="min-h-screen bg-[#050010] text-white flex flex-col items-center px-6 py-6">
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
        Sorting Visualizer
      </h1>

      {/* Algorithm tabs */}
      <div className="flex gap-4 mb-5 flex-wrap justify-center">
        {[
          { id: "bubble", label: "Bubble Sort" },
          { id: "selection", label: "Selection Sort" },
          { id: "insertion", label: "Insertion Sort" },
          { id: "merge", label: "Merge Sort" }
        ].map((algo) => (
          <button
            key={algo.id}
            onClick={() => {
              setAlgorithm(algo.id as any);
              handleStop();
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
              algorithm === algo.id
                ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.8)]"
                : "bg-[#09001b] border-purple-700/40 hover:border-purple-400"
            }`}
          >
            {algo.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6 w-full max-w-5xl">
        <button
          onClick={handleRandom}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 font-semibold shadow-lg shadow-purple-500/40"
          disabled={isPlaying}
        >
          Random Array
        </button>

        <div className="flex-1 min-w-[230px]">
          <label className="block text-sm mb-1">
            Enter array (comma separated)
          </label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isPlaying}
            className="w-full px-3 py-2 rounded-lg bg-[#0b0620] border border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleApplyInput}
            disabled={isPlaying}
            className="mt-2 px-4 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold"
          >
            Set as array
          </button>
        </div>

        <div className="flex flex-col items-start gap-1">
          <span className="text-sm">Speed (slow → fast)</span>
          <input
            type="range"
            min={200}
            max={1200}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        {/* Playback controls */}
        <div className="flex gap-2">
          <button
            onClick={handleStart}
            disabled={isPlaying}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-sm font-semibold shadow shadow-cyan-500/40 disabled:opacity-40"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            disabled={!isPlaying}
            className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-sm font-semibold disabled:opacity-40"
          >
            Pause
          </button>
          <button
            onClick={handleResume}
            disabled={isPlaying || !steps.length || currentStep >= steps.length - 1}
            className="px-4 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-sm font-semibold disabled:opacity-40"
          >
            Resume
          </button>
          <button
            onClick={handleStop}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-sm font-semibold"
          >
            Stop
          </button>
        </div>
      </div>

      {/* Sorting buttons */}
<div className="flex gap-6 justify-center mt-6 flex-wrap">
  <button onClick={() => setAlgorithm("bubble")} className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold">
    Bubble Sort
  </button>

  <button onClick={() => setAlgorithm("selection")} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
    Selection Sort
  </button>

  <button onClick={() => setAlgorithm("insertion")} className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold">
    Insertion Sort
  </button>

  <button onClick={() => setAlgorithm("merge")} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
    Merge Sort
  </button>

  <button onClick={() => setAlgorithm("quick")} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold text-black">
    Quick Sort
  </button>

  <button onClick={() => setAlgorithm("heap")} className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold">
    Heap Sort
  </button>
</div>


     


      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Bars */}
        <div className="flex-1 flex flex-col items-center justify-end bg-[#090217] rounded-2xl p-4 shadow-[0_0_30px_rgba(168,85,247,0.35)]">
          <div className="flex items-end justify-center gap-2 w-full h-[260px]">
            {current.array.map((value, idx) => {
              const height = (value / maxVal) * 200;
              const isHighlighted = current.highlightedIndices.includes(idx);

              return (

                <div className="flex gap-6">
  <Sidebar algorithm={algorithm} />
  {/* animation area yaha hota hai */}
</div>

                <div key={idx} className="flex flex-col items-center">
                  <div
                    style={{ height: `${height}px` }}
                    className={`w-6 rounded-t-xl transition-all duration-200 ${
                      isHighlighted
                        ? "bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.9)]"
                        : "bg-gradient-to-t from-purple-600 to-pink-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                    }`}
                  ></div>
                  <span className="mt-1 text-xs font-semibold">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Code + explanation */}
        <div className="w-full md:w-80 bg-[#090217] rounded-2xl p-4 shadow-[0_0_30px_rgba(56,189,248,0.3)] flex flex-col gap-3">
          <h2 className="font-semibold mb-1 text-lg">
            {algorithm === "bubble" && "Bubble Sort (pseudo code)"}
            {algorithm === "selection" && "Selection Sort (coming soon)"}
            {algorithm === "insertion" && "Insertion Sort (coming soon)"}
            {algorithm === "merge" && "Merge Sort (coming soon)"}
          </h2>

          {/* For now we show bubble code for all; we’ll swap this per algorithm later */}
          <div className="space-y-1 text-sm font-mono">
            {bubbleCode.map((line, idx) => (
              <div
                key={idx}
                className={`px-2 py-1 rounded-md ${
                  current.line === idx
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-100"
                    : "bg-transparent text-slate-100"
                }`}
              >
                {line}
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-slate-300 bg-[#050012] rounded-lg p-2 border border-slate-700/60">
            {current.line === 0 && "Outer loop: each pass places one element at its correct position."}
            {current.line === 1 && "Inner loop: check each adjacent pair up to the unsorted boundary."}
            {current.line === 2 && "Condition: if left element > right element, we will swap them."}
            {current.line === 3 && "Swap: exchanging the two elements to move the larger one to the right."}
            {current.line === -1 && "Array is now sorted."}
          </div>
        </div>
      </div>
    </div>
  );
}
