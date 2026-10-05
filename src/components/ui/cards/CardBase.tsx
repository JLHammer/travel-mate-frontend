import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { tokens } from "../../../styles/theme";

const CardWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const CardBaseStyled = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.card};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: box-shadow ${tokens.transitions.normal};
`;

const CardLink = styled(Link)`
  display: block;
  height: 100%;
  text-decoration: none;

  ${tokens.media.hover} {
    &:hover ${CardBaseStyled} {
      box-shadow: ${({ theme }) => theme.shadows.cardHover};
    }
  }
`;

const imageHeight = css<{ $large: boolean }>`
  height: ${tokens.mobile.sizes.cardImageHeight};

  ${tokens.media.tablet} {
    height: ${({ $large }) =>
      $large ? tokens.tablet.sizes.cardImageHeightLarge : tokens.tablet.sizes.cardImageHeight};
  }
`;

const CardImage = styled.img<{ $large: boolean }>`
  width: 100%;
  object-fit: cover;
  ${imageHeight}
`;

const CardImagePlaceholder = styled.div<{ $large: boolean }>`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  ${imageHeight}
`;

const CardBody = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xxs};
  padding: ${tokens.mobile.spacing.s};
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xs};
`;

const CardAction = styled.div`
  position: absolute;
  z-index: ${tokens.zIndices.cardAction};
  top: ${tokens.borders.width};
  right: ${tokens.borders.width};
`;

const smallText = css`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${tokens.mobile.fontSizes.small};
  line-height: ${tokens.mobile.lineHeights.body};
`;

export const CardDescription = styled.p<{ $lines?: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $lines = 2 }) => $lines};
  line-clamp: ${({ $lines = 2 }) => $lines};
  overflow: hidden;
  ${smallText}
`;

export const CardMeta = styled.p`
  display: flex;
  align-items: center;
  ${smallText}
  gap: ${tokens.mobile.spacing.xxs};

  & > svg {
    flex-shrink: 0;
    width: ${tokens.mobile.sizes.cardMetaIcon};
    height: ${tokens.mobile.sizes.cardMetaIcon};
  }
`;

type CardBaseProps = {
  to: string;
  title: ReactNode;
  imageUrl: string | null;
  imageAlt: string;
  action?: ReactNode;
  largeImage?: boolean;
  children?: ReactNode;
};

export const CardBase = ({
  to,
  title,
  imageUrl,
  imageAlt,
  action,
  largeImage = false,
  children,
}: CardBaseProps) => {
  return (
    <CardWrapper>
      <CardLink to={to}>
        <CardBaseStyled>
          {imageUrl ? (
            <CardImage src={imageUrl} alt={imageAlt} $large={largeImage} />
          ) : (
            <CardImagePlaceholder $large={largeImage} />
          )}
          <CardBody>
            <CardTitle>{title}</CardTitle>
            {children}
          </CardBody>
        </CardBaseStyled>
      </CardLink>
      {action && <CardAction>{action}</CardAction>}
    </CardWrapper>
  );
};
