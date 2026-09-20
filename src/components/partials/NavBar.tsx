import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../../data/routes";
import { BurgerMenu } from "../ui/BurgerMenu";

const NavBarStyled = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NavStripe = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: ${({ theme }) => theme.sizes.navItemHeight};
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
  height: ${({ theme }) => theme.sizes.navItemHeight};
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

const { home, countries, cities, places, about } = ROUTES;

const navLinks = [
  { to: home, label: "Home" },
  { to: countries, label: "Countries" },
  { to: cities, label: "Cities" },
  { to: places, label: "Places" },
  { to: about, label: "About" },
];

export const NavBar = () => {
  const { pathname } = useLocation();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const toggle = () => setOpenedAt(open ? null : pathname);

  return (
    <NavBarStyled>
      <NavStripe>
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
            {navLinks.map(({ to, label }) => (
              <NavLi key={to}>
                <NavBarLink to={to} end={to === home}>
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
