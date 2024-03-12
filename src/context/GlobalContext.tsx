import { ReactElement, createContext, useState } from "react";

type UserData = {
  dogId: string;
  nickname: string;
};

interface GlobalContextData {
  userData?: UserData;
  setUserData: (user: UserData) => void;
}

export const GlobalContext = createContext({} as GlobalContextData);

export function GlobalProvider({ children }: { children: ReactElement }) {
  const [userData, setUserData] = useState<UserData | undefined>();

  const handleSetUserData = (data: UserData) => setUserData(data);

  return (
    <GlobalContext.Provider
      value={{
        userData,
        setUserData: handleSetUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
