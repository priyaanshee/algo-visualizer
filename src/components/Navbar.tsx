import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#080014] text-white border-b border-purple-800 fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-400">Algo Visualizer</h1>

        <div className="flex gap-6 text-lg font-medium">
          <Link to="/sorting" className="hover:text-purple-300 transition">
            Sorting
          </Link>
          <Link to="/searching" className="hover:text-purple-300 transition">
            Searching
          </Link>
        </div>
      </div>
    </nav>
  );
}
