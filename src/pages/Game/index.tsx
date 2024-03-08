import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  const { userData } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !userData.dogId || !userData.nickname) navigate("/");
  }, [userData]);

  return (
    <div className="flex flex-col">
      <span className="text-white">{userData?.dogId}</span>
      <span className="text-white">{userData?.nickname}</span>
    </div>
  );
};
