import { useContext } from "react";
import { ThemeModeContext } from "../contexts/ThemeModeContext";

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used inside a ThemeModeProvider");
  }
  return context;
};
