import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SortingPage from "./pages/SortingPage";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/sorting", element: <SortingPage /> },
]);
