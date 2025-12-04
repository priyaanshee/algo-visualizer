import { useNavigate } from "react-router-dom";

const algorithms = [
  { name: "Sorting", desc: "Bubble, Merge, Quick, Insertion, Selection" },
  { name: "Searching", desc: "Linear & Binary Search" },
  { name: "Two Pointer", desc: "Pair sum, Palindrome, Reverse operations" },
  { name: "Sliding Window", desc: "Max sum subarray, longest substring" },
  { name: "Stack & Queue", desc: "Push, Pop, Enqueue, Dequeue animations" },
  { name: "Heap", desc: "Min/Max heap insert & delete visualization" },
  { name: "Tree Traversal", desc: "Inorder, Preorder, Postorder traversal" },
  { name: "Graph Traversal", desc: "DFS & BFS step-by-step animation" },
  { name: "Dynamic Programming", desc: "Knapsack, LCS, LIS explanations" },
  { name: "Pathfinding", desc: "Dijkstra & A* pathfinding visualizer" }
];

export default function Algorithms() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen bg-[#0e0e10] flex flex-col items-center py-24 gap-14">
      <h2 className="text-5xl font-extrabold text-white tracking-wide">
        Choose an <span className="text-purple-500 drop-shadow-[0_0_10px_#a855f7]">Algorithm</span>
      </h2>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 max-w-6xl w-full">
  {algorithms.map((algo, i) => (
    <div
      key={i}
      onClick={() => {
        if (algo.name === "Sorting") navigate("/sorting");
      }}
      className="border border-purple-500 rounded-2xl p-8 cursor-pointer bg-[#141418]
      hover:shadow-[0_0_25px_#a855f7] hover:border-purple-400 transition duration-300"
    >
      <h3 className="text-2xl font-bold text-white mb-3">{algo.name}</h3>
      <p className="text-gray-400 text-lg leading-relaxed">{algo.desc}</p>
    </div>
  ))}
</div>

    </section>
  );
}
