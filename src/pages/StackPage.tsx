import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Ek step me kya store hoga (stack ki state + highlight + code line)
type Step = {
  stack: number[];
  highlightIndex: number | null; // kaunsa index highlight hai
  line: number;                  // pseudocode ki kaunsi line
  action: string;                // explanation text
  op: "push" | "pop" | "peek";   // kaunsa operation
};

// --- PSEUDOCODE LINES (sirf text) ---

const PUSH_CODE = [
  "procedure push(Stack, x):",
  "    top ← top + 1",
  "    Stack[top] ← x",
];

const POP_CODE = [
  "procedure pop(Stack):",
  "    if top = -1 return",
  "    x ← Stack[top]",
  "    top ← top - 1",
];

const PEEK_CODE = [
  "procedure peek(Stack):",
  "    if top = -1 return",
  "    return Stack[top]",
];

export default function StackPage() {
  // Jo actual stack hamare paas hai (last completed state)
  const [baseStack, setBaseStack] = useState<number[]>([]);

  // Input box mein jo value type kar rahe ho push ke liye
  const [valueInput, setValueInput] = useState("");

  // Har step ki list (animation ke liye)
  const [steps, setSteps] = useState<Step[]>([]);

  // Abhi kaunsa step dikha rahe hain (Prev / Next se change hota hai)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Agar steps hai to current step, warna null
  const currentStep: Step | null =
    steps.length > 0 ? steps[currentStepIndex] : null;

  // Screen pe jo stack dikh raha hai:
  // agar koi step chal raha hai to uska stack, warna baseStack
  const visibleStack = currentStep ? currentStep.stack : baseStack;

  // Top element & size
  const size = visibleStack.length;
  const topIndex = size - 1;
  const topElement = topIndex >= 0 ? visibleStack[topIndex] : null;

  // ---- Jab last step pe pahunchte hain to baseStack update kar do ----
  useEffect(() => {
    if (!steps.length) return;
    if (currentStepIndex === steps.length - 1) {
      setBaseStack(steps[currentStepIndex].stack);
    }
  }, [currentStepIndex, steps]);

  // ----------------- STEP GENERATORS -----------------

  // PUSH ke liye har step banate hain (line-by-line pseudocode)
  function buildPushSteps(oldStack: number[], value: number): Step[] {
    const steps: Step[] = [];
    const s0 = [...oldStack];

    // Line 0 → function call
    steps.push({
      stack: [...s0],
      highlightIndex: null,
      line: 0,
      action: `Calling push(${value})`,
      op: "push",
    });

    // Line 1 → top += 1 (conceptual)
    steps.push({
      stack: [...s0],
      highlightIndex: null,
      line: 1,
      action: "Increasing top pointer by 1",
      op: "push",
    });

    // Line 2 → Stack[top] = x (actual insertion)
    const s1 = [...s0, value];
    steps.push({
      stack: s1,
      highlightIndex: s1.length - 1,
      line: 2,
      action: `Inserted ${value} at the top of stack`,
      op: "push",
    });

    return steps;
  }

  // POP ke steps
  function buildPopSteps(oldStack: number[]): Step[] {
    const steps: Step[] = [];
    const s0 = [...oldStack];

    // Line 0 → function call
    steps.push({
      stack: [...s0],
      highlightIndex: null,
      line: 0,
      action: "Calling pop()",
      op: "pop",
    });

    // Agar empty stack hai
    if (!s0.length) {
      steps.push({
        stack: [...s0],
        highlightIndex: null,
        line: 1,
        action: "Stack is empty, nothing to pop.",
        op: "pop",
      });
      return steps;
    }

    // Line 1 → check empty
    steps.push({
      stack: [...s0],
      highlightIndex: null,
      line: 1,
      action: "Checking if stack is empty",
      op: "pop",
    });

    // Line 2 → x = Stack[top] (just highlight top)
    const topIdx = s0.length - 1;
    steps.push({
      stack: [...s0],
      highlightIndex: topIdx,
      line: 2,
      action: `Top element ${s0[topIdx]} will be removed`,
      op: "pop",
    });

    // Line 3 → top-- (actually remove)
    const s1 = s0.slice(0, -1);
    steps.push({
      stack: s1,
      highlightIndex: null,
      line: 3,
      action: "Top pointer moved down, element removed",
      op: "pop",
    });

    return steps;
  }

  // PEEK ke steps
  function buildPeekSteps(oldStack: number[]): Step[] {
    const steps: Step[] = [];
    const s0 = [...oldStack];

    // Line 0 → call
    steps.push({
      stack: [...s0],
      highlightIndex: null,
      line: 0,
      action: "Calling peek()",
      op: "peek",
    });

    // Agar empty
    if (!s0.length) {
      steps.push({
        stack: [...s0],
        highlightIndex: null,
        line: 1,
        action: "Stack is empty, no top element.",
        op: "peek",
      });
      return steps;
    }

    // Line 1 → check empty
    steps.push({
      stack: [...s0],
      highlightIndex: null,
      line: 1,
      action: "Checking if stack is empty",
      op: "peek",
    });

    // Line 2 → return Stack[top] (highlight only)
    const topIdx = s0.length - 1;
    steps.push({
      stack: [...s0],
      highlightIndex: topIdx,
      line: 2,
      action: `Top element is ${s0[topIdx]} (stack unchanged)`,
      op: "peek",
    });

    return steps;
  }

  // ----------------- BUTTON HANDLERS -----------------

  // Abhi jo stack dikh raha hai usse hi agla operation chale
  function getCurrentStack() {
    return steps.length ? steps[currentStepIndex].stack : baseStack;
  }

  // Push button click
  function handlePush() {
    if (!valueInput.trim()) return;
    const val = Number(valueInput.trim());
    if (Number.isNaN(val)) return;

    const startStack = getCurrentStack();
    const newSteps = buildPushSteps(startStack, val);

    setSteps(newSteps);
    setCurrentStepIndex(0);
    setValueInput("");
  }

  // Pop button click
  function handlePop() {
    const startStack = getCurrentStack();
    const newSteps = buildPopSteps(startStack);

    setSteps(newSteps);
    setCurrentStepIndex(0);
  }

  // Peek button click
  function handlePeek() {
    const startStack = getCurrentStack();
    const newSteps = buildPeekSteps(startStack);

    setSteps(newSteps);
    setCurrentStepIndex(0);
  }

  // Clear button (poori stack empty + steps reset)
  function handleClear() {
    setSteps([]);
    setCurrentStepIndex(0);
    setBaseStack([]);
  }

  // Prev / Next step buttons
  function handlePrev() {
    if (!steps.length || currentStepIndex === 0) return;
    setCurrentStepIndex(currentStepIndex - 1);
  }

  function handleNext() {
    if (!steps.length || currentStepIndex >= steps.length - 1) return;
    setCurrentStepIndex(currentStepIndex + 1);
  }

  // Kaunsa pseudocode dikhega
  let codeLines: string[] = [];
  if (currentStep?.op === "push") codeLines = PUSH_CODE;
  if (currentStep?.op === "pop") codeLines = POP_CODE;
  if (currentStep?.op === "peek") codeLines = PEEK_CODE;

  // ----------------- UI / JSX -----------------
  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-10 px-6">

        {/* Title + subtitle */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]">
            Stack Visualizer
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            Visualize <span className="text-pink-400 font-semibold">Push</span>,{" "}
            <span className="text-pink-400 font-semibold">Pop</span> and{" "}
            <span className="text-pink-400 font-semibold">Peek</span> step-by-step with
            highlighted pseudocode and a neon stack.
          </p>
        </header>

        {/* Control panel */}
        <section className="glass-panel flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Value to push"
              className="input-neon w-[150px]"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handlePush} className="btn-neon-primary">
              Push
            </button>
            <button onClick={handlePop} className="btn-neon-primary">
              Pop
            </button>
            <button onClick={handlePeek} className="btn-neon-primary">
              Peek
            </button>
            <button onClick={handleClear} className="btn-neon-ghost">
              Clear Stack
            </button>
          </div>
        </section>

        {/* Info chips */}
        <section className="flex flex-wrap gap-4 justify-center text-sm text-slate-200">
          <div className="info-chip">
            Size: <span className="text-pink-400 font-semibold">{size}</span>
          </div>
          <div className="info-chip">
            Top element:{" "}
            <span className="text-pink-400 font-semibold">
              {topElement !== null ? topElement : "None"}
            </span>
          </div>
        </section>

        {/* Main layout: stack + pseudocode */}
        <main className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">

          {/* LEFT: STACK VISUAL */}
          <div className="flex-1 neon-card flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs tracking-[0.3em] uppercase text-slate-300">
                Stack
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 border border-pink-500/40">
                LIFO
              </span>
            </div>

            <div className="relative w-full flex justify-center">
              {/* Top indicator arrow */}
              <div className="absolute -top-4 right-9 flex items-center gap-1">
                <span className="text-xs text-pink-300">TOP</span>
                <div className="w-6 h-[2px] bg-pink-400" />
              </div>

              <div className="stack-box">
                {visibleStack.length === 0 && (
                  <span className="text-slate-500 text-sm">Stack is empty</span>
                )}

                {/* Bottom se top tak dikhana (reverse order se map kar rahe) */}
                {visibleStack
  .map((val, idx) => ({ val, idx }))       // bottom → top order
  .slice()
  .reverse()                               // display top → bottom
  .map(({ val }, displayIndex) => {
    const highlightTopIndex = visibleStack.length - 1; // always real top
    const isHighlighted =
      currentStep && currentStep.highlightIndex === highlightTopIndex &&
      displayIndex === 0; // top block shown first

    return (
      <div
        key={displayIndex}
        className={`stack-item ${isHighlighted ? "stack-item-active" : ""}`}
      >
        {val}
      </div>
    );
  })}

              </div>
            </div>
          </div>

          {/* RIGHT: PSEUDOCODE + EXPLANATION + PREV/NEXT */}
          <div className="w-full md:w-80 neon-card flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-pink-300">
              {currentStep?.op === "push" && "PUSH — Pseudocode"}
              {currentStep?.op === "pop" && "POP — Pseudocode"}
              {currentStep?.op === "peek" && "PEEK — Pseudocode"}
              {!currentStep && "Operation Pseudocode"}
            </h2>

            {/* Pseudocode list */}
            {codeLines.length ? (
              <div className="space-y-1 text-sm font-mono">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded-md transition ${
                      currentStep && currentStep.line === i
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
                Perform any operation to see its pseudocode highlighted here.
              </p>
            )}

            {/* Explanation text */}
            <div className="mt-2 text-xs text-slate-300 bg-[#060012] rounded-lg p-2 border border-[#2b103f] min-h-[48px]">
              {currentStep ? currentStep.action : "No step selected."}
            </div>

            {/* Prev / Next buttons */}
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
                  : "No steps yet"}
              </span>

              <button
                onClick={handleNext}
                disabled={!steps.length || currentStepIndex >= steps.length - 1}
                className="step-button"
              >
                Next ➜
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
