import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../data/routes";

const NavBarStyled = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavLi = styled.li``;

const NavBarLink = styled(NavLink)`
  display: inline-block;

  &.active {
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
