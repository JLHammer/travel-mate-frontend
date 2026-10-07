import styled from "styled-components";
import { ChevronRight, MapPin } from "lucide-react";
import type { CityCardData } from "../../../types";
import { ROUTES, cityPath } from "../../../router/routes";
import { CardBase, CardDescription, CardMeta } from "./CardBase";
import { tokens } from "../../../styles/theme";

const CityChevron = styled(ChevronRight)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedText};

  right: ${tokens.mobile.spacing.s};
  width: ${tokens.mobile.sizes.cardChevron};
  height: ${tokens.mobile.sizes.cardChevron};
`;

type CityCardProps = {
  city: CityCardData;
  variant?: "featured" | "detailed";
};

export const CityCard = ({ city, variant = "featured" }: CityCardProps) => {
  const { name, slug, image, description, country } = city;

  return (
    <CardBase
      to={slug ? cityPath(slug) : ROUTES.cities}
      title={name}
      image={image}
      imageAlt={name ?? ""}
      largeImage={variant === "detailed"}
    >
      {variant === "detailed" && description && (
        <CardDescription $lines={3}>{description}</CardDescription>
      )}
      {variant === "featured" && country?.name && (
        <CardMeta>
          <MapPin /> {country.name}
        </CardMeta>
      )}
      {variant === "featured" && <CityChevron />}
    </CardBase>
  );
};
