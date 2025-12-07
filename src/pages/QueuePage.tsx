import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

type Step = {
  queue: number[];
  highlightIndex: number | null;
  line: number;
  action: string;
  op: "enqueue" | "dequeue" | "peek";
};

const ENQUEUE_CODE = [
  "procedure enqueue(Queue, x):",
  "    rear ← rear + 1",
  "    Queue[rear] ← x",
];

const DEQUEUE_CODE = [
  "procedure dequeue(Queue):",
  "    if Queue is empty return",
  "    x ← Queue[front]",
  "    front ← front + 1",
];

const PEEK_CODE = [
  "procedure peek(Queue):",
  "    if Queue is empty return",
  "    return Queue[front]",
];

export default function QueuePage() {
  const [baseQueue, setBaseQueue] = useState<number[]>([]);
  const [valueInput, setValueInput] = useState("");

  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps.length ? steps[currentStepIndex] : null;
  const visibleQueue = currentStep ? currentStep.queue : baseQueue;

  const size = visibleQueue.length;
  const frontValue = visibleQueue.length ? visibleQueue[0] : null;
  const rearValue =
    visibleQueue.length ? visibleQueue[visibleQueue.length - 1] : null;

  // jab last step pe pahunch jao → actual queue update
  useEffect(() => {
    if (!steps.length) return;
    if (currentStepIndex === steps.length - 1) {
      setBaseQueue(steps[currentStepIndex].queue);
    }
  }, [currentStepIndex, steps]);

  // ---------- STEP BUILDERS ----------

  function buildEnqueueSteps(oldQueue: number[], value: number): Step[] {
    const q0 = [...oldQueue];
    const result: Step[] = [];

    result.push({
      queue: [...q0],
      highlightIndex: null,
      line: 0,
      action: `Calling enqueue(${value})`,
      op: "enqueue",
    });

    result.push({
      queue: [...q0],
      highlightIndex: null,
      line: 1,
      action: "Increasing rear pointer",
      op: "enqueue",
    });

    const q1 = [...q0, value];

    result.push({
      queue: q1,
      highlightIndex: q1.length - 1,
      line: 2,
      action: `Inserted ${value} at the rear`,
      op: "enqueue",
    });

    return result;
  }

  function buildDequeueSteps(oldQueue: number[]): Step[] {
    const q0 = [...oldQueue];
    const result: Step[] = [];

    result.push({
      queue: [...q0],
      highlightIndex: null,
      line: 0,
      action: "Calling dequeue()",
      op: "dequeue",
    });

    if (!q0.length) {
      result.push({
        queue: [...q0],
        highlightIndex: null,
        line: 1,
        action: "Queue is empty — nothing to dequeue",
        op: "dequeue",
      });
      return result;
    }

    result.push({
      queue: [...q0],
      highlightIndex: null,
      line: 1,
      action: "Checking if queue is empty",
      op: "dequeue",
    });

    result.push({
      queue: [...q0],
      highlightIndex: 0,
      line: 2,
      action: `Front element ${q0[0]} will be removed`,
      op: "dequeue",
    });

    const q1 = q0.slice(1);

    result.push({
      queue: q1,
      highlightIndex: null,
      line: 3,
      action: `Moved front pointer, removed ${q0[0]}`,
      op: "dequeue",
    });

    return result;
  }

  function buildPeekSteps(oldQueue: number[]): Step[] {
    const q0 = [...oldQueue];
    const result: Step[] = [];

    result.push({
      queue: [...q0],
      highlightIndex: null,
      line: 0,
      action: "Calling peek()",
      op: "peek",
    });

    if (!q0.length) {
      result.push({
        queue: [...q0],
        highlightIndex: null,
        line: 1,
        action: "Queue is empty — no front element",
        op: "peek",
      });
      return result;
    }

    result.push({
      queue: [...q0],
      highlightIndex: null,
      line: 1,
      action: "Checking if queue is empty",
      op: "peek",
    });

    result.push({
      queue: [...q0],
      highlightIndex: 0,
      line: 2,
      action: `Front element is ${q0[0]}`,
      op: "peek",
    });

    return result;
  }

  function getQueue() {
    return steps.length ? steps[currentStepIndex].queue : baseQueue;
  }

  // ---------- HANDLERS ----------

  function handleEnqueue() {
    if (!valueInput.trim()) return;
    const val = Number(valueInput);
    if (Number.isNaN(val)) return;

    setSteps(buildEnqueueSteps(getQueue(), val));
    setCurrentStepIndex(0);
    setValueInput("");
  }

  function handleDequeue() {
    setSteps(buildDequeueSteps(getQueue()));
    setCurrentStepIndex(0);
  }

  function handlePeek() {
    setSteps(buildPeekSteps(getQueue()));
    setCurrentStepIndex(0);
  }

  function handleClear() {
    setBaseQueue([]);
    setSteps([]);
    setCurrentStepIndex(0);
  }

  function handlePrev() {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
  }

  function handleNext() {
    if (steps.length && currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  }

  let codeLines: string[] = [];
  if (currentStep?.op === "enqueue") codeLines = ENQUEUE_CODE;
  if (currentStep?.op === "dequeue") codeLines = DEQUEUE_CODE;
  if (currentStep?.op === "peek") codeLines = PEEK_CODE;

  // ---------- UI ----------

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-10 px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]">
          Queue Visualizer
        </h1>

        {/* Controls */}
        <div className="glass-panel flex flex-wrap items-center justify-center gap-4 max-w-3xl w-full">
          <input
            type="number"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Value"
            className="input-neon w-[150px]"
          />
          <button onClick={handleEnqueue} className="btn-neon-primary">
            Enqueue
          </button>
          <button onClick={handleDequeue} className="btn-neon-primary">
            Dequeue
          </button>
          <button onClick={handlePeek} className="btn-neon-primary">
            Peek
          </button>
          <button onClick={handleClear} className="btn-neon-ghost">
            Clear Queue
          </button>
        </div>

        {/* Info chips */}
        <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-300">
          <div className="info-chip">
            Size: <span className="text-pink-400">{size}</span>
          </div>
          <div className="info-chip">
            Front:{" "}
            <span className="text-pink-400">
              {frontValue !== null ? frontValue : "None"}
            </span>
          </div>
          <div className="info-chip">
            Rear:{" "}
            <span className="text-pink-400">
              {rearValue !== null ? rearValue : "None"}
            </span>
          </div>
        </div>

        {/* Layout: visual + code */}
        <div className="flex flex-col md:flex-row gap-10 max-w-5xl w-full">
          {/* VISUAL */}
          <div className="neon-card flex-1 flex flex-col items-center gap-6 py-8">
            <div className="text-xs uppercase tracking-widest text-slate-300">
              Queue (FIFO)
            </div>

            <div className="queue-box">
              {/* FRONT / REAR LABELS */}

              {visibleQueue.length > 1 && (
                <>
                  <span className="queue-label queue-label-front">
                    FRONT →
                  </span>
                  <span className="queue-label queue-label-rear">
                    ← REAR
                  </span>
                </>
              )}

              {visibleQueue.length === 1 && (
                <span className="queue-label queue-label-center">
                  FRONT &amp; REAR ↓
                </span>
              )}

              {/* Elements */}
              <div className="flex gap-4 items-center justify-center">
                {visibleQueue.length === 0 && (
                  <span className="text-slate-500 text-sm">
                    Queue is empty
                  </span>
                )}

                {visibleQueue.map((val, index) => (
                  <div
                    key={index}
                    className={`queue-item ${
                      currentStep?.highlightIndex === index
                        ? "queue-item-active"
                        : ""
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PSEUDOCODE PANEL */}
          <div className="neon-card w-full md:w-80 flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-pink-300">
              {currentStep?.op === "enqueue" && "ENQUEUE — Pseudocode"}
              {currentStep?.op === "dequeue" && "DEQUEUE — Pseudocode"}
              {currentStep?.op === "peek" && "PEEK — Pseudocode"}
              {!currentStep && "Operation Pseudocode"}
            </h2>

            {codeLines.length ? (
              <div className="space-y-1 text-sm font-mono">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded-md transition ${
                      currentStep?.line === i
                        ? "bg-pink-500/25 border border-pink-400 text-pink-100 shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                        : "text-slate-200"
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                Perform an operation to highlight pseudocode.
              </p>
            )}

            <div className="mt-2 text-xs text-slate-300 bg-[#060012] rounded-lg p-2 border border-[#2b103f] min-h-[48px]">
              {currentStep ? currentStep.action : "No step selected."}
            </div>

            <div className="flex justify-between items-center mt-3">
              <button
                onClick={handlePrev}
                disabled={!steps.length || currentStepIndex === 0}
                className="step-button"
              >
                ⬅ Prev
              </button>
              <span className="text-xs text-slate-400">
                {steps.length
                  ? `Step ${currentStepIndex + 1} / ${steps.length}`
                  : "No steps"}
              </span>
              <button
                onClick={handleNext}
                disabled={
                  !steps.length || currentStepIndex >= steps.length - 1
                }
                className="step-button"
              >
                Next ➜
              </button>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <footer className="max-w-4xl text-center text-slate-400 text-sm leading-relaxed mt-6 pb-12">
          <span className="text-pink-400 font-semibold">Queue</span> is a
          linear data structure that follows the{" "}
          <span className="text-purple-400 font-bold">
            FIFO — First In, First Out
          </span>{" "}
          principle.
          <br />
          The first inserted element is always the first removed.
          <br />
          Queues appear in{" "}
          <span className="text-pink-300">
            OS scheduling, printers, networking, task queues, BFS traversal
          </span>{" "}
          and many more places.
        </footer>
      </div>
    </>
  );
}
