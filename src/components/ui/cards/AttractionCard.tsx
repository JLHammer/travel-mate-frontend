import styled from "styled-components";
import { MapPin } from "lucide-react";
import type { AttractionCardData, BadgeCategory } from "../../../types";
import { usePaths } from "../../../hooks/usePaths";
import { CardBase, CardDescription, CardMeta } from "./CardBase";
import { FavoriteButton } from "../FavoriteButton";
import { useTranslation } from "../../../hooks/useTranslation";
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
};

export const AttractionCard = ({
  attraction,
  variant = "featured",
}: AttractionCardProps) => {
  const { t } = useTranslation();
  const paths = usePaths();
  const { _id, name, slug, image, description, category, city } = attraction;

  const location = [city?.name, city?.country?.name].filter(Boolean).join(", ");

  return (
    <CardBase
      to={slug ? paths.attraction(slug) : paths.attractions}
      title={name}
      image={image}
      imageAlt={name ?? ""}
      action={<FavoriteButton attractionId={_id} />}
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
          <CategoryBadge $category={category}>{t.categories[category]}</CategoryBadge>
        </CategoryBadgeRow>
      )}
    </CardBase>
  );
};
