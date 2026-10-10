import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest, logoutRequest, refreshRequest } from "../utils/authApi";
import type { User } from "../types";
import type { ProviderProps } from "./ThemeModeProvider";

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    refreshRequest().then((data) => {
      if (cancelled) return;
      setUser(data?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password);
    if (!data) return null;

    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    setUser(null);
    await logoutRequest();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
