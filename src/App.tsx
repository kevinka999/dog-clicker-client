import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Game } from "./pages";
import { Template } from "./components";
import { GlobalProvider, SocketProvider } from "./context";

export const App = () => {
  const router = createBrowserRouter([
    {
      element: <Template />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/play",
          element: <SocketProvider />,
          children: [
            {
              path: "",
              element: <Game />,
            },
          ],
        },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);

  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};
