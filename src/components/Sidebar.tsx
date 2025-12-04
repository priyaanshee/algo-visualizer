import { bubbleCode } from "../pseudocode/bubbleCode";
import { selectionCode } from "../pseudocode/selectionCode";
import { insertionCode } from "../pseudocode/insertionCode";
import { mergeCode } from "../pseudocode/mergeCode";
import { quickCode } from "../pseudocode/quickCode";
import { heapCode } from "../pseudocode/heapCode";

type Props = {
  algorithm: string;
  currentLine: number;
};

export default function Sidebar({ algorithm, currentLine }: Props) {
  const code =
    algorithm === "bubble" ? bubbleCode :
    algorithm === "selection" ? selectionCode :
    algorithm === "insertion" ? insertionCode :
    algorithm === "merge" ? mergeCode :
    algorithm === "quick" ? quickCode :
    heapCode;

  return (
    <div className="w-full md:w-80 bg-[#090217] rounded-2xl p-4 shadow-[0_0_30px_rgba(56,189,248,0.3)] flex flex-col gap-3">
      <h2 className="font-semibold mb-1 text-lg">
        {algorithm.toUpperCase()} — Pseudocode
      </h2>

      <div className="space-y-1 text-sm font-mono">
        {code.map((line, idx) => (
          <div
            key={idx}
            className={`px-2 py-1 rounded-md ${
              currentLine === idx
                ? "bg-cyan-500/20 border border-cyan-400 text-cyan-100"
                : "bg-transparent text-slate-100"
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
