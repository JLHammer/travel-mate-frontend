import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FOOTER_LINKS } from "../../router/routes";

const FooterNavBarStyled = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.mobile.spacing.xs};
  padding: ${({ theme }) => theme.mobile.spacing.xs} 0;
`;

const FooterNavUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.mobile.spacing.l};
`;

const FooterNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.mutedText};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FooterNavBar = () => {
  return (
    <FooterNavBarStyled>
      <FooterNavUl>
        {FOOTER_LINKS.map(({ path, label }) => (
          <li key={path}>
            <FooterNavLink to={path}>{label}</FooterNavLink>
          </li>
        ))}
      </FooterNavUl>
    </FooterNavBarStyled>
  );
};
