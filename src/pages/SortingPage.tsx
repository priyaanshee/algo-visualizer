import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { selectionSortSteps } from "../algorithms/selectionSort";
import { insertionSortSteps } from "../algorithms/insertionSort";
import { mergeSortSteps } from "../algorithms/mergeSort";
import { quickSortSteps } from "../algorithms/quickSort";
import { heapSortSteps } from "../algorithms/heapSort";

type Step = {
  array: number[];
  highlightedIndices: number[];
  line: number;
};

export default function SortingPage() {
  const [baseArray, setBaseArray] = useState<number[]>([5, 1, 4, 2, 8]);
  const [inputValue, setInputValue] = useState("5,1,4,2,8");

  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const [algorithm, setAlgorithm] = useState<
    "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap"
  >("bubble");

  const current: Step = steps.length
    ? steps[currentStep]
    : { array: baseArray, highlightedIndices: [], line: -1 };

  const maxVal = current.array.length ? Math.max(...current.array) : 1;

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const id = setTimeout(
      () => setCurrentStep((prev) => prev + 1),
      speed
    );
    return () => clearTimeout(id);
  }, [isPlaying, currentStep, steps, speed]);

  const parseInputToArray = (): number[] =>
    inputValue
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));

  const handleRandom = () => {
    const temp = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
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

    let allSteps: Step[] = [];
    if (algorithm === "bubble") allSteps = bubbleSortSteps(values);
    if (algorithm === "selection") allSteps = selectionSortSteps(values);
    if (algorithm === "insertion") allSteps = insertionSortSteps(values);
    if (algorithm === "merge") allSteps = mergeSortSteps(values);
    if (algorithm === "quick") allSteps = quickSortSteps(values);
    if (algorithm === "heap") allSteps = heapSortSteps(values);

    setSteps(allSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);
  const handleResume = () => steps.length && currentStep < steps.length - 1 && setIsPlaying(true);
  const handleStop = () => {
    setIsPlaying(false);
    setSteps([]);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-[#050010] text-white flex flex-col items-center px-6 py-6">
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
        Sorting Visualizer
      </h1>

      {/* Algorithm buttons */}
      <div className="flex gap-4 mb-5 flex-wrap justify-center">
        {["bubble","selection","insertion","merge","quick","heap"].map((a) => (
          <button
            key={a}
            onClick={() => { setAlgorithm(a as any); handleStop(); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
              algorithm === a
                ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.8)]"
                : "bg-[#09001b] border-purple-700/40 hover:border-purple-400"
            }`}
          >
            {a.toUpperCase()} SORT
          </button>
        ))}
      </div>

      {/* Input + controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6 w-full max-w-5xl">
        <button
          onClick={handleRandom}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold shadow-lg shadow-purple-500/40"
          disabled={isPlaying}
        >
          Random Array
        </button>

        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm mb-1">Enter array</label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isPlaying}
            className="w-full px-3 py-2 rounded-lg bg-[#0b0620] border border-purple-500/60"
          />
          <button
            onClick={handleApplyInput}
            disabled={isPlaying}
            className="mt-2 px-4 py-1 rounded-lg bg-purple-600 text-xs font-semibold"
          >
            Set as array
          </button>
        </div>

        <div className="flex flex-col items-start gap-1">
          <span className="text-sm">Speed</span>
          <input
            type="range"
            min={200}
            max={1200}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        <div className="flex gap-2">
          <button onClick={handleStart} disabled={isPlaying} className="px-4 py-2 rounded-xl bg-cyan-500 disabled:opacity-40">Play</button>
          <button onClick={handlePause} disabled={!isPlaying} className="px-4 py-2 rounded-xl bg-yellow-500 disabled:opacity-40">Pause</button>
          <button onClick={handleResume} disabled={isPlaying || !steps.length || currentStep >= steps.length - 1} className="px-4 py-2 rounded-xl bg-lime-500 disabled:opacity-40">Resume</button>
          <button onClick={handleStop} className="px-4 py-2 rounded-xl bg-red-500">Stop</button>
        </div>
      </div>

      {/* Bars + Sidebar layout */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">

        {/* Bars */}
        <div className="flex-1 flex flex-col items-center justify-end bg-[#090217] rounded-2xl p-4 shadow-[0_0_30px_rgba(168,85,247,0.35)]">
          <div className="flex items-end justify-center gap-2 w-full h-[260px]">
            {current.array.map((value, idx) => {
              const height = (value / maxVal) * 200;
              const hi = current.highlightedIndices.includes(idx);
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    style={{ height: `${height}px` }}
                    className={`w-6 rounded-t-xl transition-all duration-200 ${
                      hi
                        ? "bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.9)]"
                        : "bg-gradient-to-t from-purple-600 to-pink-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                    }`}
                  ></div>
                  <span className="mt-1 text-xs font-semibold">{value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar algorithm={algorithm} currentLine={current.line} />
      </div>
    </div>
  );
}
