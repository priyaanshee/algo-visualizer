import React from "react";

interface Props {
  algorithm: string;
}

export default function Sidebar({ algorithm }: Props) {
  const code =
    algorithm === "bubble"
      ? bubbleCode
      : algorithm === "selection"
      ? selectionCode
      : algorithm === "insertion"
      ? insertionCode
      : algorithm === "merge"
      ? mergeCode
      : algorithm === "quick"
      ? quickCode
      : heapCode;

  return (
    <div className="w-[380px] h-[90vh] bg-[#0f0f13] text-white p-5 overflow-y-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Pseudo Code</h2>

      <pre className="text-lg leading-7 font-mono">
        {code.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </pre>
    </div>
  );
}
