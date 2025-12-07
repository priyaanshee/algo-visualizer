import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Hero from "./components/Hero";

import SortingPage from "./pages/SortingPage";
import SearchingPage from "./pages/SearchingPage";
import StackPage from "./pages/StackPage";
import QueuePage from "./pages/QueuePage";
import LinkedListPage from "./pages/LinkedListPage";
import TreePage from "./pages/TreePage";
import GraphPage from "./pages/GraphPage";
import DPPage from "./pages/DPPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "/sorting", element: <SortingPage /> },
      { path: "/searching", element: <SearchingPage /> },
      
  { path: "/stack", element: <StackPage /> },
  { path: "/queue", element: <QueuePage /> },
  { path: "/linkedlist", element: <LinkedListPage /> },
  { path: "/tree", element: <TreePage /> },
  { path: "/graph", element: <GraphPage /> },
  { path: "/dp", element: <DPPage /> },
    ],
  },
]);
