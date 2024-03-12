import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Game } from "./pages";
import { GlobalProvider, SocketProvider } from "./context";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <SocketProvider />,
      children: [
        {
          path: "play",
          element: <Game />,
        },
      ],
    },
  ]);

  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};
