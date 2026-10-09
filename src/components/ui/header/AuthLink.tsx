import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { LogIn, UserRound } from "lucide-react";
import { usePaths } from "../../../hooks/usePaths";
import { useTranslation } from "../../../hooks/useTranslation";
import { useAuth } from "../../../hooks/useAuth";
import { tokens } from "../../../styles/theme";

type AuthLinkProps = {
  onNavigate?: () => void;
};

const AuthLinkStyled = styled(Link)<{ $loggedIn: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.mobile.spacing.xs};
  height: ${tokens.mobile.sizes.pillHeight};
  padding: 0 ${tokens.mobile.spacing.l};
  border-radius: ${tokens.radii.button};
  font-size: ${tokens.mobile.fontSizes.navLink};
  font-weight: ${tokens.fontWeights.semibold};
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color ${tokens.transitions.fast},
    color ${tokens.transitions.fast};

  svg {
    width: ${tokens.mobile.sizes.favoriteIcon};
    height: ${tokens.mobile.sizes.favoriteIcon};
  }

  ${tokens.media.tablet} {
    padding: 0 ${tokens.tablet.spacing.m};
  }

  /* Logged out it's a call to action; logged in it's a quieter account link */
  ${({ theme, $loggedIn }) =>
    $loggedIn
      ? css`
          background-color: ${theme.colors.primarySoft};
          color: ${theme.colors.primary};

          ${tokens.media.hover} {
            &:hover {
              background-color: ${theme.colors.primary};
              color: ${theme.colors.onPrimary};
            }
          }
        `
      : css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.onPrimary};

          ${tokens.media.hover} {
            &:hover {
              background-color: ${theme.colors.primaryHover};
            }
          }
        `}
`;

export const AuthLink = ({ onNavigate }: AuthLinkProps) => {
  const { t } = useTranslation();
  const paths = usePaths();
  const { user } = useAuth();
  const Icon = user ? UserRound : LogIn;

  return (
    <AuthLinkStyled
      to={paths.login}
      onClick={onNavigate}
      $loggedIn={Boolean(user)}
    >
      <Icon aria-hidden />
      {user ? t.nav.profile : t.nav.login}
    </AuthLinkStyled>
  );
};
