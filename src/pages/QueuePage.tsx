import Navbar from "../components/Navbar";

export default function QueuePage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Queue Visualization
        </h1>
        <p className="text-lg text-slate-300">Coming soon: Enqueue, Dequeue animations 🚀</p>
      </div>
    </>
  );
}
