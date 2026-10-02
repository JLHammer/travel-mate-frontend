import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeModeContext } from "./ThemeModeContext";
import { themes } from "../styles/theme";
import type { ThemeMode } from "../types";

export type ProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "theme-mode";

const getInitialMode = (): ThemeMode => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeModeProvider = ({ children }: ProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
