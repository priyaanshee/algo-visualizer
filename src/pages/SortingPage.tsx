import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { selectionSortSteps } from "../algorithms/selectionSort";
import { insertionSortSteps } from "../algorithms/insertionSort";
import { mergeSortSteps } from "../algorithms/mergeSort";
import { quickSortSteps } from "../algorithms/quickSort";
import { heapSortSteps } from "../algorithms/heapSort";

export default function SortingPage() {
  const [arr, setArr] = useState<number[]>([5, 1, 4, 2, 8]);
  const [input, setInput] = useState("5,1,4,2,8");
  const [steps, setSteps] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [algo, setAlgo] = useState<string>("bubble");

  const parse = () => input.split(",").map(v => Number(v.trim())).filter(v => !isNaN(v));

  const start = () => {
    const a = parse();
    if (!a.length) return;

    let st: any[] = [];
    if (algo === "bubble") st = bubbleSortSteps(a);
    if (algo === "selection") st = selectionSortSteps(a);
    if (algo === "insertion") st = insertionSortSteps(a);
    if (algo === "merge") st = mergeSortSteps(a);
    if (algo === "quick") st = quickSortSteps(a);
    if (algo === "heap") st = heapSortSteps(a);

    setSteps(st);
    setCurrent(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (current >= steps.length - 1) { setIsPlaying(false); return; }

    const id = setTimeout(() => setCurrent(p => p + 1), speed);
    return () => clearTimeout(id);
  }, [current, isPlaying, speed, steps]);

  const now = steps.length ? steps[current] : { array: arr, highlightedIndices: [] };
  const max = Math.max(...now.array, 1);

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen text-white bg-[#050010] flex flex-col items-center gap-6">

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Sorting Visualizer
        </h1>

        {/* Algorithm Buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          {["bubble", "selection", "insertion", "merge", "quick", "heap"].map(a => (
            <button
              key={a}
              onClick={() => { setAlgo(a); setSteps([]); setIsPlaying(false); }}
              className={`px-4 py-2 rounded-md font-semibold ${algo === a ? "bg-purple-600" : "bg-[#140428]"}`}
            >
              {a.toUpperCase()} SORT
            </button>
          ))}
        </div>

        {/* Input + Controls */}
        <div className="flex gap-4 flex-wrap justify-center max-w-3xl">
          <input value={input} disabled={isPlaying} onChange={e => setInput(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#13032b] min-w-[250px]" />
          <input type="range" min={200} max={1200} value={speed} onChange={e => setSpeed(Number(e.target.value))} />
          <button onClick={start} disabled={isPlaying} className="px-6 py-2 bg-cyan-500 rounded-md font-bold">
            PLAY ▶
          </button>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-2 bg-[#090217] p-6 rounded-2xl shadow-xl min-h-[260px]">
          {now.array.map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                style={{ height: `${(v / max) * 200}px` }}
                className={`w-6 rounded-t-xl transition ${
                  now.highlightedIndices.includes(i) ? "bg-yellow-400" : "bg-gradient-to-t from-purple-600 to-pink-400"
                }`}
              ></div>
              <span className="mt-1 text-xs">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
