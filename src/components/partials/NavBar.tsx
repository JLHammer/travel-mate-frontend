import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../data/routes";

const NavBarStyled = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  display: inline-block;
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} 0;
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

export const NavBar = () => (
  <NavBarStyled>
    <NavUl>
      {navLinks.map(({ to, label }) => (
        <NavLi key={to}>
          <NavBarLink to={to} end={to === home}>
            {label}
          </NavBarLink>
        </NavLi>
      ))}
    </NavUl>
  </NavBarStyled>
);
