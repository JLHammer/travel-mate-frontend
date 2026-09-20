import { useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import type { ThemeMode } from "../../styles/theme";

const ThemePill = styled.fieldset`
  display: inline-flex;
  align-items: center;
  height: ${({ theme }) => theme.sizes.pillHeight};
  padding: 0.125rem ${({ theme }) => theme.spacing.xxs};
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
`;

const ThemeThumb = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.contrast};
`;

const ThemeOption = styled.label<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing.s};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.onContrast : theme.colors.text.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  user-select: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  > :not(${ThemeThumb}) {
    position: relative;
  }

  > svg {
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : "inherit")};
    fill: ${({ theme, $active }) => ($active ? theme.colors.accent : "none")};
    transition:
      color ${({ theme }) => theme.transitions.fast},
      fill ${({ theme }) => theme.transitions.fast};
  }
`;

const ThemeRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>("light");

  return (
    <ThemePill>
      <ThemeOption $active={mode === "light"}>
        <ThemeRadio
          type="radio"
          name="theme"
          value="light"
          checked={mode === "light"}
          onChange={() => setMode("light")}
        />
        {mode === "light" && <ThemeThumb layoutId="theme-thumb" />}
        <Sun size={16} />
        <span>Light</span>
      </ThemeOption>

      <ThemeOption $active={mode === "dark"}>
        <ThemeRadio
          type="radio"
          name="theme"
          value="dark"
          checked={mode === "dark"}
          onChange={() => setMode("dark")}
        />
        {mode === "dark" && <ThemeThumb layoutId="theme-thumb" />}
        <Moon size={16} />
        <span>Dark</span>
      </ThemeOption>
    </ThemePill>
  );
};
