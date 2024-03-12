import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { AnimatedDog, LogChat, ProgressBar } from "../../components";
import { Socket, io } from "socket.io-client";

export const Game = () => {
  const [progress, setProgress] = useState<number>(0);
  const [texts, setTexts] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [dogInfo, setDogInfo] = useState<string>("Loading");

  const { userData } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !userData.dogId || !userData.nickname) navigate("/");

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

    socket.on("connected", (dogInfo: { name: string }) => {
      setDogInfo(dogInfo.name);
    });

    socket.on("newJoin", (nickname: string) => {
      setTexts((prev) => [...prev, `${nickname} entrou no lobby`]);
    });

    socket.on("exp", (expGained: number, nickname: string) => {
      setProgress((prev) => {
        if (prev + expGained > 100) return 0;
        return prev + expGained;
      });

      setTexts((prev) => [
        ...prev,
        `${nickname} ganhou ${expGained} de experiencia`,
      ]);
    });
  }, [socket]);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col items-center justify-between h-full w-[300px] py-8">
        <div className="flex flex-col gap-2 text-center w-[300px]">
          <h1 className="text-3xl text-white">{dogInfo}</h1>
          <span className="text-xs text-stone-300 text-right">Lv. 19</span>
          <ProgressBar percent={progress} />
        </div>
        <button onClick={() => socket?.disconnect()}>Desconectar</button>
        <AnimatedDog
          onClick={() => {
            if (!socket) return;
            socket?.emit("dogClicked");
          }}
        />
        <LogChat texts={texts} />
      </div>
    </div>
  );
};
