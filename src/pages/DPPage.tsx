import Navbar from "../components/Navbar";

export default function DPPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-cyan-500 bg-clip-text text-transparent">
          Dynamic Programming
        </h1>
        <p className="text-lg text-slate-300">Coming soon: DP table animation + Tabulation vs Memoization 🔥</p>
      </div>
    </>
  );
}
