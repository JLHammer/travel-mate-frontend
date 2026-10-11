import styled, { css } from "styled-components";
import { Heart } from "lucide-react";
import { useFavoriteToggle } from "../../hooks/useFavoriteToggle";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";

const FavoriteButtonStyled = styled.button<{ $variant: FavoriteButtonVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 calc(${tokens.radii.card} - ${tokens.borders.width}) 0 ${tokens.radii.card};
  background-color: ${({ theme }) => theme.colors.overlay};
  color: ${({ theme }) => theme.colors.onScrim};
  cursor: pointer;
  transition: background-color ${tokens.transitions.fast};

  width: ${tokens.mobile.sizes.favoriteButtonSize};
  height: ${tokens.mobile.sizes.favoriteButtonSize};

  & > svg {
    width: ${tokens.mobile.sizes.favoriteIcon};
    height: ${tokens.mobile.sizes.favoriteIcon};
  }

  &:disabled {
    cursor: wait;
  }

  ${tokens.media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.scrim};
    }
  }

  ${({ $variant }) =>
    $variant === "image" &&
    css`
      border-radius: 0 ${tokens.radii.panel} 0 ${tokens.radii.panel};
      width: ${tokens.mobile.sizes.pillHeight};
      height: ${tokens.mobile.sizes.pillHeight};

      & > svg {
        width: ${tokens.mobile.sizes.headerIcon};
        height: ${tokens.mobile.sizes.headerIcon};
      }
    `}
`;

type FavoriteButtonVariant = "card" | "image";

type FavoriteButtonProps = {
  attractionId: string;
  variant?: FavoriteButtonVariant;
};

export const FavoriteButton = ({ attractionId, variant = "card" }: FavoriteButtonProps) => {
  const { t } = useTranslation();
  const { liked, isPending, handleClick } = useFavoriteToggle(attractionId);
  const label = liked ? t.favorites.remove : t.favorites.add;

  return (
    <FavoriteButtonStyled
      type="button"
      $variant={variant}
      title={label}
      aria-label={label}
      aria-pressed={liked}
      onClick={handleClick}
      disabled={isPending}
    >
      <Heart strokeWidth={2.5} fill={liked ? "currentColor" : "none"} aria-hidden />
    </FavoriteButtonStyled>
  );
};
