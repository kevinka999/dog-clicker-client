import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { AnimatedDog } from "../../components";
import { LogChat } from "../../components/LogChat";

export const Game = () => {
  const [texts, setTexts] = useState<string[]>([]);

  const { userData } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !userData.dogId || !userData.nickname) navigate("/");
  }, [userData]);

  return (
    <div className="flex flex-col items-center justify-between h-screen py-8">
      <h1 className="text-3xl text-white mb-4">{userData?.dogId}</h1>
      <AnimatedDog
        onClick={() =>
          setTexts((prev) => [
            ...prev,
            `${userData?.nickname} ganhou 6 de experiencia`,
          ])
        }
      />
      <LogChat texts={texts} />
    </div>
  );
};
