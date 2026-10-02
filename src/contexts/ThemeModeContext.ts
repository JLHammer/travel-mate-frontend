import { createContext } from "react";
import type { ThemeMode } from "../types";

export type ThemeModeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);
