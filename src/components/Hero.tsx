export default function Hero() {
  return (
    <section className="w-full min-h-[85vh] flex flex-col justify-center items-center text-center gap-6 bg-gradient-to-b from-purple-50 to-white">
      <h1 className="text-6xl font-extrabold text-gray-800 leading-tight">
        Master <span className="text-purple-600">Algorithms</span> Visually
      </h1>

      <p className="text-xl text-gray-600 max-w-2xl">
        Learn how sorting and searching algorithms work with step-by-step animations and intuitive controls.
      </p>

      <div className="flex gap-6 mt-4">
        <button className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition">
          Start Visualizing
        </button>
        <button className="px-8 py-3 rounded-xl border border-purple-600 text-purple-600 font-semibold text-lg hover:bg-purple-600 hover:text-white transition">
          Algorithms List
        </button>
      </div>
    </section>
  );
}
