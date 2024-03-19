import { useContext, useEffect, useState } from "react";
import { AnimatedDog, LogChat, ProgressBar } from "../../components";
import { SocketContext } from "../../context";

export const Game = () => {
  const { socket, dogData } = useContext(SocketContext);
  const [chat, setChat] = useState<string[]>([]);
  const [localExp, setLocalExp] = useState<number>(0);

  useEffect(() => {
    if (!socket) return;

    socket.on("disconnected", (nickname: string) => {
      setChat((prev) => [...prev, `${nickname} left the lobby`]);
    });

    socket.on("newJoin", (nickname: string) => {
      setChat((prev) => [...prev, `${nickname} joined the lobby`]);
    });

    socket.on(
      "exp",
      (expGained: number, totalExp: number, nickname: string) => {
        setLocalExp(totalExp);
        setChat((prev) => [
          ...prev,
          `${nickname} ganhou ${expGained} de experiencia`,
        ]);
      }
    );
  }, [socket]);

  useEffect(() => {
    if (dogData && dogData?.exp !== localExp) setLocalExp(dogData.exp);
  }, [dogData]);

  function calculateExp(exp: number): { dogLevel: number; expLeft: number } {
    let level = 0;
    const lvlOneExpNeeded = 100;
    for (level; exp >= lvlOneExpNeeded * (level * 0.5); level++) {
      exp -= lvlOneExpNeeded * (level * 0.5);
    }

    return {
      dogLevel: level,
      expLeft: exp,
    };
  }

  const { dogLevel, expLeft } = calculateExp(localExp);
  const expToNextLevel = 100 * (dogLevel * 0.5);
  const progress = Math.round((expLeft / expToNextLevel) * 100);

  return (
    <div className="flex justify-center h-full w-full">
      <div className="flex flex-col items-center justify-between h-full w-[300px] py-8">
        <div className="flex flex-col gap-2 text-center w-[300px]">
          <h1 className="text-3xl text-white">{dogData?.identifier}</h1>
          <span className="text-xs text-stone-300 text-right">{`Lv. ${dogLevel}`}</span>
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
