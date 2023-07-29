"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the user info data
export interface UserInfoData {
  user_name: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  avatar: string | null;
}

// Define the shape of the context
export interface UserInfoContextType {
  userInfo: UserInfoData;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoData>>;
}

// Create the UserInfoContext
export const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined
);

// Create a custom hook to access the UserInfoContext
export function useUserInfo(): UserInfoContextType {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
}

// Create a UserInfoProvider component
export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfoData>({} as UserInfoData);

  useEffect(() => {
    const storedUserInfo = window.sessionStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        // Add more functions here if needed
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
