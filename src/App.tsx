import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InterSectionObserver from "./components/InterSectionObserver/IntersectionObserver.tsx";
import MutationObserverC from "./components/MutationObserver/MutationObserver.tsx";
import ResizeObserverC from "./components/ResizeObserverC/ResizeObserverC.tsx";
import ReactBoundingClientRect from "./components/ReactBoundingClientRect/ReactBoundingClientRect.tsx";
import Article from "./components/Article/Article.tsx";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop.tsx";
import Register from "./components/auth/Register/Register.tsx";
import Login from "./components/auth/Login/Login.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <InterSectionObserver />
          </ProtectedRoute>
        ),
      },
      {
        path: "mutation-observer",
        element: (
          <ProtectedRoute>
            <MutationObserverC />
          </ProtectedRoute>
        ),
      },
      {
        path: "resize-observer",
        element: (
          <ProtectedRoute>
            <ResizeObserverC />
          </ProtectedRoute>
        ),
      },
      {
        path: "react-bounding-client-rect",
        element: (
          <ProtectedRoute>
            <ReactBoundingClientRect />
          </ProtectedRoute>
        ),
      },
      {
        path: "article",
        element: (
          <ProtectedRoute>
            <Article />
          </ProtectedRoute>
        ),
      },
      {
        path: "drag-and-drop",
        element: (
          <ProtectedRoute>
            <DragAndDrop />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
