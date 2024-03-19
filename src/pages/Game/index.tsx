import { useContext, useEffect, useState } from "react";
import { AnimatedDog, LogChat, ProgressBar } from "../../components";
import { SocketContext } from "../../context";

export const Game = () => {
  const { socket, dogData } = useContext(SocketContext);
  const [chat, setChat] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!socket) return;

    socket.on("connected", (dog: any) => {
      console.log("connected", dog);
    });

    socket.on("disconnected", (nickname: string) => {
      setChat((prev) => [...prev, `${nickname} left the lobby`]);
    });

    socket.on("newJoin", (nickname: string) => {
      setChat((prev) => [...prev, `${nickname} joined the lobby`]);
    });

    socket.on("exp", (expGained: number, nickname: string) => {
      setProgress((prev) => {
        if (prev + expGained > 100) return 0;
        return prev + expGained;
      });

      setChat((prev) => [
        ...prev,
        `${nickname} ganhou ${expGained} de experiencia`,
      ]);
    });
  }, [socket]);

  return (
    <div className="flex justify-center h-full w-full">
      <div className="flex flex-col items-center justify-between h-full w-[300px] py-8">
        <div className="flex flex-col gap-2 text-center w-[300px]">
          <h1 className="text-3xl text-white">{dogData?.name}</h1>
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
        <LogChat chat={chat} />
      </div>
    </div>
  );
};
