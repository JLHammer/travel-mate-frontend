import type { ReactNode } from "react";
import styled from "styled-components";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { tokens } from "../../styles/theme";
import { useTranslation } from "../../hooks/useTranslation";
import { VisuallyHidden } from "./VisuallyHidden";

const ExternalLinkStyled = styled.a<{ $primary: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xxs};
  color: ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.headingText)};
  overflow-wrap: anywhere;
  transition: color ${tokens.transitions.fast};

  & > svg {
    flex-shrink: 0;
    width: ${tokens.mobile.sizes.linkIcon};
    height: ${tokens.mobile.sizes.linkIcon};
  }

  ${tokens.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;

type ExternalLinkProps = {
  href: string;
  primary?: boolean;
  children: ReactNode;
};

export const ExternalLink = ({ href, primary = false, children }: ExternalLinkProps) => {
  const { t } = useTranslation();

  return (
    <ExternalLinkStyled href={href} target="_blank" rel="noreferrer" $primary={primary}>
      {children}
      <ExternalLinkIcon aria-hidden />
      <VisuallyHidden> ({t.nav.newTab})</VisuallyHidden>
    </ExternalLinkStyled>
  );
};
