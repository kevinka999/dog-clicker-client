import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { GlobalContext } from ".";
import { Dog } from "../types";

interface SocketContext {
  socket?: Socket;
  dogData?: Dog;
}

export const SocketContext = createContext({} as SocketContext);

export function SocketProvider() {
  const { userData } = useContext(GlobalContext);
  const [socket, setSocket] = useState<Socket>();
  const [dogData, setDogData] = useState<Dog>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !userData.dogId || !userData.nickname) navigate("/home");

    const socketConnection = io(import.meta.env.VITE_SERVER_URL, {
      extraHeaders: {
        "dog-identifier": userData?.dogId || "",
        "player-identifier": userData?.nickname || "",
      },
    });
    setSocket(socketConnection);

    window.addEventListener("beforeunload", () => {
      if (socket && socket.connected) socket?.disconnect();
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userData]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connected", (dogData: Dog) => {
      setDogData(dogData);
    });
  }, [socket]);

  if (!socket || !dogData) {
    <div>Loading..</div>;
  }

  return (
    <SocketContext.Provider value={{ socket, dogData }}>
      <Outlet />
    </SocketContext.Provider>
  );
}
