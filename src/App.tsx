import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Game } from "./pages";
import { GlobalProvider } from "./context";

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

  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};
