import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FOOTER_LINKS } from "../../router/routes";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";

const FooterNavBarStyled = styled.nav`
  display: flex;
  justify-content: center;
`;

const FooterNavUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${tokens.mobile.spacing.l};
  font-size: ${tokens.mobile.fontSizes.footerText};
`;

const FooterNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.mutedText};
  text-decoration: none;
  transition: color ${tokens.transitions.fast};

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${tokens.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const FooterNavBar = () => {
  const { t } = useTranslation();

  return (
    <FooterNavBarStyled>
      <FooterNavUl>
        {FOOTER_LINKS.map(({ path, key }) => (
          <li key={path}>
            <FooterNavLink to={path}>{t.nav[key]}</FooterNavLink>
          </li>
        ))}
      </FooterNavUl>
    </FooterNavBarStyled>
  );
};
