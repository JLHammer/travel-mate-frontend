import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { NAV_LINKS, ROUTES } from "../../router/routes";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";

type NavLinksVariant = "menu" | "bar";

type NavLinksProps = {
  variant: NavLinksVariant;
  onNavigate?: () => void;
};

const NavUl = styled.ul<{ $variant: NavLinksVariant }>`
  display: flex;
  align-items: center;

  ${({ $variant }) =>
    $variant === "menu"
      ? css`
          width: 100%;
          flex-direction: column;
        `
      : css`
          gap: ${tokens.desktop.spacing.xxs};
        `}
`;

const NavLi = styled.li<{ $variant: NavLinksVariant }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${({ $variant }) =>
    $variant === "menu" &&
    css`
      width: 100%;
      margin: 0 0 0.1rem;
    `}
`;

const NavBarLink = styled(NavLink)<{ $variant: NavLinksVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${tokens.mobile.sizes.navItemHeight};
  font-size: ${tokens.mobile.fontSizes.navLink};
  text-decoration: none;
  transition: all 0.05s ease;

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }

  ${({ $variant }) =>
    $variant === "menu"
      ? css`
          width: 100%;

          &.active,
          &:hover {
            font-weight: ${tokens.fontWeights.semibold};
          }
        `
      : css`
          /* Fixed weight so neighbouring links don't shift on hover/active */
          padding: 0 ${tokens.desktop.spacing.s};
          border-radius: ${tokens.radii.button};
          font-weight: ${tokens.fontWeights.medium};
          white-space: nowrap;
        `}
`;

const { home, favorites } = ROUTES;

export const NavLinks = ({ variant, onNavigate }: NavLinksProps) => {
  const { t } = useTranslation();

  const links = [
    ...NAV_LINKS.map(({ path, key }) => ({ path, label: t.nav[key] })),
    { path: favorites, label: t.nav.favorites },
  ];

  return (
    <NavUl $variant={variant}>
      {links.map(({ path, label }) => (
        <NavLi key={path} $variant={variant}>
          <NavBarLink to={path} end={path === home} onClick={onNavigate} $variant={variant}>
            {label}
          </NavBarLink>
        </NavLi>
      ))}
    </NavUl>
  );
};
