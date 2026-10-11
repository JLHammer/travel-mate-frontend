import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { usePaths } from "../../hooks/usePaths";
import { tokens } from "../../styles/theme";
import type { RichText as RichTextValue, SitePage } from "../../types";
import { PageText } from "../layout/PageLayout";
import { ExternalLink } from "./ExternalLink";

const RichTextList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xxs};
  padding-left: ${tokens.mobile.spacing.l};
  list-style: disc;
  font-size: ${tokens.mobile.fontSizes.detailsText};
  line-height: ${tokens.mobile.lineHeights.detailsText};

  & > li::marker {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const inlineLinkStyles = css`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${tokens.fontWeights.semibold};
  transition: color ${tokens.transitions.fast};

  ${tokens.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;

const InlineLink = styled(Link)`
  ${inlineLinkStyles}
`;

const MailLink = styled.a`
  ${inlineLinkStyles}
`;

// Its own component, since the hook can't be called inside the components object
const PageLink = ({ page, children }: { page?: SitePage; children: ReactNode }) => {
  const paths = usePaths();
  return page ? <InlineLink to={paths[page]}>{children}</InlineLink> : <>{children}</>;
};

// Only what the rich text in the Studio allows: paragraphs, bullet lists and two kinds of links
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <PageText>{children}</PageText>,
  },
  list: {
    bullet: ({ children }) => <RichTextList>{children}</RichTextList>,
  },
  marks: {
    pageLink: ({ value, children }) => <PageLink page={value?.page}>{children}</PageLink>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      // An email address opens the mail app, so it shouldn't open a new tab too
      return href.startsWith("mailto:") ? (
        <MailLink href={href}>{children}</MailLink>
      ) : (
        <ExternalLink href={href} primary>
          {children}
        </ExternalLink>
      );
    },
  },
};

export const RichText = ({ value }: { value: RichTextValue | null }) =>
  value ? <PortableText value={value} components={components} /> : null;
