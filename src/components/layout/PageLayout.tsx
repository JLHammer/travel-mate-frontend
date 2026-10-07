import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { PageTitle } from "../ui/PageTitle";
import { tokens } from "../../styles/theme";

const PageLayoutStyled = styled.div<{ $centerOnTablet: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.l};
  width: ${tokens.mobile.layout.contentWidth};
  padding: ${tokens.mobile.spacing.l} ${tokens.mobile.spacing.s};

  ${({ $centerOnTablet }) =>
    $centerOnTablet &&
    css`
      ${tokens.media.tabletOnly} {
        align-items: center;
      }
    `}
`;

const PageHeader = styled.header<{ $centerOnTablet: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.s};
  max-width: ${tokens.mobile.sizes.formWidth};

  ${({ $centerOnTablet }) =>
    $centerOnTablet &&
    css`
      ${tokens.media.tabletOnly} {
        align-items: center;
        text-align: center;
      }
    `}
`;

export const PageText = styled.p`
  font-size: ${tokens.mobile.fontSizes.detailsText};
  line-height: ${tokens.mobile.lineHeights.detailsText};
`;

type PageLayoutProps = {
  /** Browser tab title, also used as the h1 unless `heading` is set */
  title: string;
  heading?: string;
  intro?: ReactNode;
  children?: ReactNode;
  /** Centers the header and content between the tablet and desktop breakpoints */
  centerOnTablet?: boolean;
};

export const PageLayout = ({
  title,
  heading = title,
  intro,
  children,
  centerOnTablet = false,
}: PageLayoutProps) => {
  return (
    <PageLayoutStyled $centerOnTablet={centerOnTablet}>
      <PageTitle title={title} />
      <PageHeader $centerOnTablet={centerOnTablet}>
        <h1>{heading}</h1>
        {intro}
      </PageHeader>
      {children}
    </PageLayoutStyled>
  );
};
