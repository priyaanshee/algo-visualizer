import Navbar from "../components/Navbar";

export default function GraphPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent">
          Graph Traversal Visualizer
        </h1>
        <p className="text-lg text-slate-300">Coming soon: BFS + DFS animations with nodes/edges ⚡</p>
      </div>
    </>
  );
}
