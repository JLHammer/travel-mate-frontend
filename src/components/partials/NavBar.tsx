import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { NavLinks } from "./NavLinks";
import { PreferenceToggles } from "./PreferenceToggles";
import { AuthLink } from "../ui/header/AuthLink";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";

type NavBarProps = {
  id: string;
  open: boolean;
  onNavigate: () => void;
};

const NavBarStyled = styled.nav`
  width: 100%;

  ${tokens.media.desktop} {
    display: none;
  }
`;

const NavPanel = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

const MenuToggles = styled.div`
  display: flex;
  justify-content: center;
  height: ${tokens.mobile.sizes.pillHeight};
  margin: ${tokens.mobile.spacing.xs} 0;

  ${tokens.media.tablet} {
    display: none;
  }
`;

const MenuAuth = styled.div`
  display: flex;
  justify-content: center;
  padding: ${tokens.mobile.spacing.xs} ${tokens.mobile.spacing.m};
  border-top: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};

  ${tokens.media.tablet} {
    display: none;
  }
`;

export const NavBar = ({ id, open, onNavigate }: NavBarProps) => {
  const { t } = useTranslation();

  return (
    <NavBarStyled id={id} aria-label={t.nav.menu}>
      <AnimatePresence initial={false}>
        {open && (
          <NavPanel
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <MenuToggles>
              <PreferenceToggles />
            </MenuToggles>
            <NavLinks variant="menu" onNavigate={onNavigate} />
            <MenuAuth>
              <AuthLink onNavigate={onNavigate} />
            </MenuAuth>
          </NavPanel>
        )}
      </AnimatePresence>
    </NavBarStyled>
  );
};
