import { createContext, useContext, useState, ReactNode } from "react";

type AvatarContextType = {
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);
type AvatarProviderProps = {
  children: ReactNode;
};
export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};
