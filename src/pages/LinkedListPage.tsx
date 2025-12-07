import Navbar from "../components/Navbar";

export default function LinkedListPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Linked List Visualization
        </h1>
        <p className="text-lg text-slate-300">Coming soon: Insert, Delete, Reverse LL ✨</p>
      </div>
    </>
  );
}
