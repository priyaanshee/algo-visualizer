import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Algorithms from "./components/Algorithms";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Algorithms />
      <div className="pt-20 min-h-screen flex flex-col justify-center items-center gap-8 bg-[#08080c]">

        {/* Logos */}
        <div className="flex gap-10 items-center">
          <img src={viteLogo} className="h-20 w-20 animate-spin-slow drop-shadow-md" alt="Vite logo" />
          <img src={reactLogo} className="h-20 w-20 drop-shadow-md" alt="React logo" />
        </div>

        {/* Tailwind test */}
        <h1 className="text-5xl font-extrabold text-purple-600 tracking-wide">
          Tailwind working 🎉
        </h1>
      </div>
    </>
  );
}

export default App;
