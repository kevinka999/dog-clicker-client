import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { AnimatedDog, LogChat, ProgressBar } from "../../components";

export const Game = () => {
  const [progress, setProgress] = useState<number>(0);
  const [texts, setTexts] = useState<string[]>([]);

  const { userData } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !userData.dogId || !userData.nickname) navigate("/");
  }, [userData]);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col items-center justify-between h-full w-[300px] py-8">
        <div className="flex flex-col gap-2 text-center w-[300px]">
          <h1 className="text-3xl text-white">{userData?.dogId}</h1>
          <span className="text-xs text-stone-300 text-right">Lv. 19</span>
          <ProgressBar percent={progress} />
        </div>

        <AnimatedDog
          onClick={() => {
            const exp = Math.floor(Math.random() * 11);
            setProgress((prev) => {
              if (prev + exp > 100) return 0;
              return prev + exp;
            });

            setTexts((prev) => [
              ...prev,
              `${userData?.nickname} ganhou ${exp} de experiencia`,
            ]);
          }}
        />
        <LogChat texts={texts} />
      </div>
    </div>
  );
};
