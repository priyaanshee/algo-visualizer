import Navbar from "../components/Navbar";

export default function TreePage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-[#050010] text-white flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
          Tree / BST Visualization
        </h1>
        <p className="text-lg text-slate-300">Coming soon: Insert + Traversals (Inorder, Preorder, Postorder) 🌳</p>
      </div>
    </>
  );
}
