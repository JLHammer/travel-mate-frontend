import type { MouseEvent } from "react";
import styled from "styled-components";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";

export const MAIN_CONTENT_ID = "main-content";

const SkipLinkStyled = styled.a`
  position: fixed;
  top: ${tokens.mobile.spacing.s};
  left: ${tokens.mobile.spacing.s};
  z-index: ${tokens.zIndices.skipLink};
  padding: ${tokens.mobile.spacing.s} ${tokens.mobile.spacing.m};
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: ${tokens.fontWeights.semibold};
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform ${tokens.transitions.fast};

  &:focus {
    transform: translateY(0);
  }
`;

export const SkipLink = () => {
  const { t } = useTranslation();

  // Move focus to <main> without adding #main-content to the URL
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(MAIN_CONTENT_ID)?.focus();
  };

  return (
    <SkipLinkStyled href={`#${MAIN_CONTENT_ID}`} onClick={handleClick}>
      {t.nav.skipToContent}
    </SkipLinkStyled>
  );
};
