import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import { linearSearchSteps } from "../searchAlgorithms/linearSearch";
import { binarySearchSteps } from "../searchAlgorithms/binarySearch";
import { linearSearchCode } from "../pseudocode-search/linearSearchCode";
import { binarySearchCode } from "../pseudocode-search/binarySearchCode";
import type { SearchStep } from "../searchAlgorithms/types";

export default function SearchingPage() {
  const [baseArray, setBaseArray] = useState<number[]>([5, 1, 4, 2, 8]);
  const [inputValue, setInputValue] = useState("5,1,4,2,8");
  const [target, setTarget] = useState<number>(4);

  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [algorithm, setAlgorithm] = useState<"linear" | "binary">("linear");

  const current: SearchStep =
    steps.length > 0
      ? steps[currentStep]
      : { array: baseArray, highlighted: [], line: -1 };

  const maxVal = Math.max(...current.array, 1);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const id = setTimeout(() => setCurrentStep((p) => p + 1), speed);
    return () => clearTimeout(id);
  }, [isPlaying, currentStep, steps, speed]);

  const parseArray = () =>
    inputValue.split(",").map((v) => Number(v.trim())).filter((v) => !isNaN(v));

  const reset = () => {
    setSteps([]);
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleStart = () => {
    const arr = parseArray();
    if (!arr.length) return;

    const anim =
      algorithm === "linear"
        ? linearSearchSteps(arr, target)
        : binarySearchSteps(arr, target);

    setBaseArray(arr);
    setSteps(anim);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const code = algorithm === "linear" ? linearSearchCode : binarySearchCode;

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center px-6 py-6">

        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
          Searching Visualizer
        </h1>

        {/* Select algorithm */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-5 py-2 rounded-lg ${algorithm === "linear" ? "bg-pink-500" : "bg-[#0b0220]"}`}
            onClick={() => { setAlgorithm("linear"); reset(); }}
          >
            Linear Search
          </button>
          <button
            className={`px-5 py-2 rounded-lg ${algorithm === "binary" ? "bg-pink-500" : "bg-[#0b0220]"}`}
            onClick={() => { setAlgorithm("binary"); reset(); }}
          >
            Binary Search
          </button>
        </div>

        {/* Inputs */}
        <div className="flex gap-5 flex-wrap justify-center w-full max-w-4xl mb-6">
          <button
            disabled={isPlaying}
            onClick={() => {
              const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
              setBaseArray(arr);
              setInputValue(arr.join(","));
              reset();
            }}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold"
          >
            Random Array
          </button>

          <input
            disabled={isPlaying}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-3 py-2 bg-[#0b0220] rounded-lg w-[250px]"
          />

          <input
            disabled={isPlaying}
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="px-3 py-2 bg-[#0b0220] rounded-lg w-[120px]"
          />

          <input
            type="range"
            min={200}
            max={1200}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        {/* Animation Controls */}
        <div className="flex gap-3 mb-7">
          <button disabled={isPlaying} onClick={handleStart} className="px-4 py-2 bg-cyan-500 rounded-lg">Play</button>
          <button disabled={!isPlaying} onClick={() => setIsPlaying(false)} className="px-4 py-2 bg-yellow-500 rounded-lg">Pause</button>
          <button disabled={isPlaying || currentStep >= steps.length - 1} onClick={() => setIsPlaying(true)} className="px-4 py-2 bg-green-500 rounded-lg">Resume</button>
          <button onClick={reset} className="px-4 py-2 bg-red-500 rounded-lg">Stop</button>
        </div>

        {/* Bars + Code */}
        <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">

          {/* Bars */}
          <div className="flex flex-1 items-end justify-center gap-3 bg-[#09021a] p-5 rounded-xl">
            {current.array.map((v, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  style={{ height: `${(v / maxVal) * 200}px` }}
                  className={`w-8 rounded-t-xl transition-all ${
                    current.highlighted.includes(idx)
                      ? "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]"
                      : "bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.5)]"
                  }`}
                />
                <span className="mt-1 text-xs font-semibold">{v}</span>
              </div>
            ))}
          </div>

          {/* Pseudocode */}
          <div className="w-full md:w-72 bg-[#09021a] rounded-xl p-4">
            <h2 className="font-bold mb-3 text-lg">
              {algorithm === "linear" ? "Linear Search — Pseudocode" : "Binary Search — Pseudocode"}
            </h2>

            {code.map((line, idx) => (
              <div
                key={idx}
                className={`px-2 py-1 text-sm font-mono rounded-md ${
                  current.line === idx
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-100"
                    : "text-slate-200"
                }`}
              >
                {line}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
