import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { usePaths } from "../../hooks/usePaths";
import { useSiteSettings } from "../../hooks/useSiteSettings";
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
  const paths = usePaths();
  const { footerLinks } = useSiteSettings();

  return (
    <FooterNavBarStyled>
      <FooterNavUl>
        {footerLinks.map(({ _key, page, label }) => (
          <li key={_key}>
            <FooterNavLink to={paths[page]} end={page === "home"}>
              {label ?? t.nav[page]}
            </FooterNavLink>
          </li>
        ))}
      </FooterNavUl>
    </FooterNavBarStyled>
  );
};
