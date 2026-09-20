import { useState } from "react";
import type { ThemeMode } from "../../styles/theme";

export const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>("light");

  return (
    <>
      <fieldset>
        <legend>Choose Theme</legend>

        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={mode === "light"}
            onChange={() => setMode("light")}
          />
          <span>☀️ Light</span>
        </label>

        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={mode === "dark"}
            onChange={() => setMode("dark")}
          />
          <span>🌙 Dark</span>
        </label>
      </fieldset>
    </>
  );
};
