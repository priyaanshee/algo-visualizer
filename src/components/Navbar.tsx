export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-600">Algo Visualizer</h1>

        <ul className="flex gap-8 text-lg font-medium">
          <li className="hover:text-purple-600 cursor-pointer transition">Home</li>
          <li className="hover:text-purple-600 cursor-pointer transition">Algorithms</li>
          <li className="hover:text-purple-600 cursor-pointer transition">Visualizer</li>
        </ul>
      </div>
    </nav>
  );
}
