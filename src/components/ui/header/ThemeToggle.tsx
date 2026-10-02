import styled from "styled-components";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "../../../hooks/useThemeMode";

const ThemePill = styled.fieldset`
  display: inline-flex;
  align-items: center;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: ${({ theme }) => theme.borders.themeToggle} solid;
  border-color: ${({ theme }) => theme.colors.contrast};
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
  gap: ${({ theme }) => theme.mobile.spacing.xxs};
  height: 100%;
  padding: 0 ${({ theme }) => theme.mobile.spacing.s};
  color: ${({ theme, $active }) => theme.colors[$active ? "onContrast" : "bodyText"]};
  font-size: ${({ theme }) => theme.mobile.fontSizes.toggle};
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
  const { mode, setMode } = useThemeMode();

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
        <Sun size={24} />
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
        <Moon size={24} />
        <span>Dark</span>
      </ThemeOption>
    </ThemePill>
  );
};
