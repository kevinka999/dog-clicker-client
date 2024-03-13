import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Game } from "./pages";
import { Template } from "./components";
import { GlobalProvider, SocketProvider } from "./context";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "play",
          element: <SocketProvider />,
          children: [
            {
              path: "",
              element: <Game />,
            },
          ],
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
