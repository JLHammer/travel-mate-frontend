import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, ROUTES } from "../../router/routes";
import { BurgerMenu } from "../ui/header/BurgerMenu";
import { PreferenceToggles } from "./PreferenceToggles";

const NavBarStyled = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.mobile.spacing.xs};
  padding: ${({ theme }) => theme.mobile.spacing.xs} 0;
`;

const NavStripe = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.mobile.sizes.navItemHeight};
  display: flex;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.mobile.spacing.xs};
`;

const NavUl = styled(motion.ul)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
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
  height: ${({ theme }) => theme.mobile.sizes.navItemHeight};
  text-decoration: none;
  width: 100%;
  transition: all 0.05s ease;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }
`;

const { home } = ROUTES;

export const NavBar = () => {
  const { pathname } = useLocation();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const toggle = () => setOpenedAt(open ? null : pathname);

  return (
    <NavBarStyled>
      <NavStripe>
        <PreferenceToggles />
        <BurgerMenu open={open} onToggle={toggle} />
      </NavStripe>
      <AnimatePresence initial={false}>
        {open && (
          <NavUl
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {NAV_LINKS.map(({ path, label }) => (
              <NavLi key={path}>
                <NavBarLink to={path} end={path === home}>
                  {label}
                </NavBarLink>
              </NavLi>
            ))}
          </NavUl>
        )}
      </AnimatePresence>
    </NavBarStyled>
  );
};
