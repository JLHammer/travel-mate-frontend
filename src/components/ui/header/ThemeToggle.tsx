import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "../../../hooks/useThemeMode";
import { useTranslation } from "../../../hooks/useTranslation";
import { tokens } from "../../../styles/theme";

type ThemeToggleProps = {
  variant?: "button" | "slider";
};

const MODES = ["light", "dark"] as const;

const MODE_ICONS = { light: Sun, dark: Moon };

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1;
  border: ${tokens.borders.themeToggle} solid ${({ theme }) => theme.colors.primarySoft};
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.headingText};
  transition:
    background-color ${tokens.transitions.fast},
    color ${tokens.transitions.fast};

  svg {
    width: ${tokens.mobile.sizes.headerIcon};
    height: ${tokens.mobile.sizes.headerIcon};
  }

  svg {
    transition: fill ${tokens.transitions.fast};
  }

  ${tokens.media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.contrast};
      color: ${({ theme }) => theme.colors.accent};
    }

    &:hover svg {
      fill: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const ThemeIcon = styled(motion.span)`
  display: flex;
`;

const ThemePill = styled.fieldset`
  display: inline-flex;
  align-items: center;
  height: 100%;
  border-radius: ${tokens.radii.pill};
  border: ${tokens.borders.themeToggle} solid ${({ theme }) => theme.colors.primarySoft};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
`;

const ThemeThumb = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: ${tokens.radii.pill};
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.background : theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const ThemeOption = styled.label<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xxs};
  height: 100%;
  padding: 0 ${tokens.mobile.spacing.s};
  color: ${({ theme, $active }) => theme.colors[$active ? "headingText" : "bodyText"]};
  font-size: ${tokens.mobile.fontSizes.toggle};
  font-weight: ${tokens.fontWeights.medium};
  cursor: pointer;
  user-select: none;
  transition: color ${tokens.transitions.fast};

  > :not(${ThemeThumb}) {
    position: relative;
  }

  > svg {
    width: ${tokens.mobile.sizes.headerIcon};
    height: ${tokens.mobile.sizes.headerIcon};
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : "inherit")};
    fill: ${({ theme, $active }) => ($active ? theme.colors.accent : "none")};
    transition:
      color ${tokens.transitions.fast},
      fill ${tokens.transitions.fast};
  }

  ${tokens.media.hover} {
    &:hover > svg {
      color: ${({ theme }) => theme.colors.accent};
      fill: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const ThemeRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const ThemeSlider = () => {
  const { mode, setMode } = useThemeMode();
  const { t } = useTranslation();

  return (
    <ThemePill>
      {MODES.map((option) => {
        const Icon = MODE_ICONS[option];
        const active = mode === option;

        return (
          <ThemeOption key={option} $active={active} title={t.theme.switchTo[option]}>
            <ThemeRadio
              type="radio"
              name="theme"
              value={option}
              checked={active}
              onChange={() => setMode(option)}
            />
            {active && <ThemeThumb layoutId="theme-thumb" />}
            <Icon />
            <span>{t.theme.label[option]}</span>
          </ThemeOption>
        );
      })}
    </ThemePill>
  );
};

const ThemeIconButton = () => {
  const { mode, setMode } = useThemeMode();
  const { t } = useTranslation();
  const next = mode === "light" ? "dark" : "light";

  return (
    <ThemeButton type="button" title={t.theme.switchTo[next]} onClick={() => setMode(next)}>
      <AnimatePresence mode="wait" initial={false}>
        <ThemeIcon
          key={next}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {next === "dark" ? <Moon /> : <Sun />}
        </ThemeIcon>
      </AnimatePresence>
    </ThemeButton>
  );
};

export const ThemeToggle = ({ variant = "button" }: ThemeToggleProps) =>
  variant === "slider" ? <ThemeSlider /> : <ThemeIconButton />;
