import { useState } from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { tokens } from "../../styles/theme";

const FavoriteButtonStyled = styled.button`
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

  ${tokens.media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.scrim};
    }
  }
`;

type FavoriteButtonProps = {
  isFavorite?: boolean;
};

export const FavoriteButton = ({ isFavorite = false }: FavoriteButtonProps) => {
  const [isActive, setIsActive] = useState(isFavorite);

  return (
    <FavoriteButtonStyled
      type="button"
      onClick={() => setIsActive((prev) => !prev)}
    >
      <Heart strokeWidth={2.5} fill={isActive ? "currentColor" : "none"} />
    </FavoriteButtonStyled>
  );
};
