import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS, ROUTES } from "../../router/routes";
import { PreferenceToggles } from "./PreferenceToggles";
import { tokens } from "../../styles/theme";

type NavBarProps = {
  open: boolean;
};

const NavBarStyled = styled.nav`
  width: 100%;
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

const NavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavLi = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 0 0.1rem;
`;

const NavBarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${tokens.mobile.sizes.navItemHeight};
  font-size: ${tokens.mobile.fontSizes.navLink};
  text-decoration: none;
  width: 100%;
  transition: all 0.05s ease;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${tokens.fontWeights.semibold};
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${tokens.fontWeights.semibold};
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }
`;

const { home } = ROUTES;

export const NavBar = ({ open }: NavBarProps) => {
  return (
    <NavBarStyled>
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
            <NavUl>
              {NAV_LINKS.map(({ path, label }) => (
                <NavLi key={path}>
                  <NavBarLink to={path} end={path === home}>
                    {label}
                  </NavBarLink>
                </NavLi>
              ))}
            </NavUl>
          </NavPanel>
        )}
      </AnimatePresence>
    </NavBarStyled>
  );
};
