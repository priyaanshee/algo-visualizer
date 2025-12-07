export default function Hero() {
  return (
    <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-10 px-6">

      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        Algo Visualizer
      </h1>

      <p className="text-lg text-slate-300">
        Choose a topic to explore 👇
      </p>

      <div className="flex flex-col gap-6 text-center mt-4">

        <a href="/sorting" className="px-8 py-4 rounded-xl bg-purple-600 text-xl font-semibold hover:scale-110 transition">
          Sorting Algorithms
        </a>

        <a href="/searching" className="px-8 py-4 rounded-xl bg-pink-600 text-xl font-semibold hover:scale-110 transition">
          Searching Algorithms
        </a>

        <a href="/stack" className="px-8 py-4 rounded-xl bg-blue-600 text-xl font-semibold hover:scale-110 transition">
          Stack Visualization
        </a>

        <a href="/queue" className="px-8 py-4 rounded-xl bg-green-600 text-xl font-semibold hover:scale-110 transition">
          Queue Visualization
        </a>

        <a href="/linkedlist" className="px-8 py-4 rounded-xl bg-indigo-600 text-xl font-semibold hover:scale-110 transition">
          Linked List Visualization
        </a>

        <a href="/tree" className="px-8 py-4 rounded-xl bg-yellow-600 text-xl font-semibold hover:scale-110 transition">
          Tree / BST Visualization
        </a>

        <a href="/graph" className="px-8 py-4 rounded-xl bg-red-600 text-xl font-semibold hover:scale-110 transition">
          Graph Traversal (BFS / DFS)
        </a>

        <a href="/dp" className="px-8 py-4 rounded-xl bg-cyan-600 text-xl font-semibold hover:scale-110 transition">
          Dynamic Programming
        </a>
      </div>
    </div>
  );
}
