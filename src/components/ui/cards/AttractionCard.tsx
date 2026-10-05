import styled from "styled-components";
import { MapPin } from "lucide-react";
import type { AttractionCardData, BadgeCategory } from "../../../types";
import { ROUTES, attractionPath } from "../../../router/routes";
import { CardBase, CardDescription, CardMeta } from "./CardBase";
import { FavoriteButton } from "../FavoriteButton";
import { tokens } from "../../../styles/theme";

const CategoryBadgeRow = styled.div`
  display: flex;
  margin-top: auto;
  padding-top: ${tokens.mobile.spacing.xxs};
`;

const CategoryBadge = styled.span<{ $category: BadgeCategory }>`
  border-radius: ${tokens.radii.badge};
  background-color: ${({ theme, $category }) => theme.colors.badges[$category].background};
  color: ${({ theme, $category }) => theme.colors.badges[$category].text};
  font-weight: ${tokens.fontWeights.medium};
  text-transform: capitalize;

  padding: ${tokens.mobile.spacing.xxs} ${tokens.mobile.spacing.xs};
  font-size: ${tokens.mobile.fontSizes.small};
`;

type AttractionCardProps = {
  attraction: AttractionCardData;
  variant?: "featured" | "detailed";
  isFavorite?: boolean;
};

export const AttractionCard = ({
  attraction,
  variant = "featured",
  isFavorite = false,
}: AttractionCardProps) => {
  const { name, slug, imageUrl, description, category, city } = attraction;

  const location = [city?.name, city?.country?.name].filter(Boolean).join(", ");

  return (
    <CardBase
      to={slug ? attractionPath(slug) : ROUTES.attractions}
      title={name}
      imageUrl={imageUrl}
      imageAlt={name ?? ""}
      action={<FavoriteButton isFavorite={isFavorite} />}
      largeImage={variant === "detailed"}
    >
      {variant === "detailed" && description && (
        <CardDescription $lines={3}>{description}</CardDescription>
      )}
      {location && (
        <CardMeta>
          <MapPin /> {location}
        </CardMeta>
      )}
      {variant === "featured" && category && (
        <CategoryBadgeRow>
          <CategoryBadge $category={category}>{category}</CategoryBadge>
        </CategoryBadgeRow>
      )}
    </CardBase>
  );
};
