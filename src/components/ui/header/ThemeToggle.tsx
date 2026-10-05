import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "../../../hooks/useThemeMode";
import { tokens } from "../../../styles/theme";

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1;
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

export const ThemeToggle = () => {
  const { mode, setMode } = useThemeMode();
  const next = mode === "light" ? "dark" : "light";

  return (
    <ThemeButton type="button" title={`Switch to ${next} mode`} onClick={() => setMode(next)}>
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
