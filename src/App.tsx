import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 bg-gray-50">
      
      {/* Logos section */}
      <div className="flex gap-10 items-center">
        <img src={viteLogo} className="h-20 w-20 animate-spin-slow drop-shadow-md" alt="Vite logo" />
        <img src={reactLogo} className="h-20 w-20 drop-shadow-md" alt="React logo" />
      </div>

      {/* Tailwind test text */}
      <h1 className="text-5xl font-extrabold text-purple-600 tracking-wide">
        Tailwind working 🎉
      </h1>
    </div>
  );
}

export default App;
