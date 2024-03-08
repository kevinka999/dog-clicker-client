import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Game } from "./pages";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "play",
      element: <Game />,
    },
  ]);

  return <RouterProvider router={router} />;
};
