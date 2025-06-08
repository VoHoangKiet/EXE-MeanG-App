import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (token: string | null) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsLoggedIn = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    if (token) {
      router.replace("/(home)/clothes");
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const updateLoginState = async (token: string | null) => {
    if (token) {
      console.log("token", token);
      await AsyncStorage.setItem("accessToken", token);
      await checkIsLoggedIn();
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await checkIsLoggedIn();
    router.replace("/(auth)");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn: updateLoginState, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
