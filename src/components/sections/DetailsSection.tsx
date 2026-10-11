import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { InfoList, type InfoItem } from "../ui/details/InfoList";
import { LocationMap } from "../ui/details/LocationMap";
import { tokens } from "../../styles/theme";
import { flagUrl } from "../../utils/flagUrl";
import { sanityImageProps } from "../../utils/imageUrl";
import type { SanityImage } from "../../types";
import { useTranslation } from "../../hooks/useTranslation";

const DetailsSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.l};
  width: ${tokens.mobile.layout.contentWidth};
  padding: ${tokens.mobile.spacing.l} ${tokens.mobile.spacing.s} 0;
`;

const DetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${tokens.mobile.spacing.s};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${tokens.fontWeights.semibold};
  text-decoration: none;
  transition: color ${tokens.transitions.fast};

  & > svg {
    width: ${tokens.mobile.sizes.headerChevron};
    height: ${tokens.mobile.sizes.headerChevron};
  }

  ${tokens.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;

const DetailsTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.s};
`;

const DetailsFlag = styled.img`
  flex-shrink: 0;
  width: ${tokens.mobile.sizes.flagWidthLarge};
`;

const DetailsBody = styled.div<{ $hasInfo: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "image" "text" "info";
  gap: ${tokens.mobile.spacing.l};

  ${tokens.media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas: ${({ $hasInfo }) =>
      $hasInfo ? `"image image" "text info"` : `"image image" "text text"`};
    align-items: start;
  }

  ${tokens.media.desktop} {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas: "image text" "image info";
    column-gap: ${tokens.desktop.spacing.l};
    row-gap: ${tokens.desktop.spacing.l};
  }
`;

const DetailsMedia = styled.div`
  position: relative;
  grid-area: image;
  align-self: start;
`;

const ImageAction = styled.div`
  position: absolute;
  z-index: ${tokens.zIndices.cardAction};
  top: 0;
  right: 0;
`;

const detailsImage = css`
  display: block;
  width: 100%;
  border-radius: ${tokens.radii.panel};
  box-shadow: ${({ theme }) => theme.shadows.card};
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};

  height: ${tokens.mobile.sizes.detailsImageHeight};

  ${tokens.media.tablet} {
    height: ${tokens.tablet.sizes.detailsImageHeight};
  }

  ${tokens.media.desktop} {
    height: auto;
    aspect-ratio: 3 / 2;
  }
`;

const DetailsImage = styled.img`
  ${detailsImage}
`;

const DetailsImagePlaceholder = styled.div`
  ${detailsImage}
`;

const DetailsDescription = styled.p`
  grid-area: text;
  font-size: ${tokens.mobile.fontSizes.detailsText};
  line-height: ${tokens.mobile.lineHeights.detailsText};
`;

const DetailsInfo = styled.div`
  grid-area: info;
`;

const MapBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.m};
  margin-top: ${tokens.mobile.spacing.m};
`;

const DETAILS_IMAGE_SIZES = `(min-width: ${tokens.breakpoints.desktop}) 55vw, 100vw`;

type DetailsSectionProps = {
  backPath: string;
  backLabel: string;
  name: string | null;
  flagCode?: string | null;
  image: SanityImage | null;
  description: string | null;
  info?: InfoItem[];
  latitude?: number | null;
  longitude?: number | null;
  mapZoom?: number;
  imageAction?: ReactNode;
};

export const DetailsSection = ({
  backPath,
  backLabel,
  name,
  flagCode,
  image,
  description,
  info = [],
  latitude,
  longitude,
  mapZoom = 12,
  imageAction,
}: DetailsSectionProps) => {
  const { t } = useTranslation();
  const hasInfo = info.length > 0;

  return (
    <DetailsSectionStyled>
      <DetailsHeader>
        <BackLink to={backPath}>
          <ArrowLeft /> {backLabel}
        </BackLink>
        <DetailsTitle>
          {flagCode && <DetailsFlag src={flagUrl(flagCode)} alt="" />}
          {name}
        </DetailsTitle>
      </DetailsHeader>

      <DetailsBody $hasInfo={hasInfo}>
        <DetailsMedia>
          {image ? (
            <DetailsImage
              {...sanityImageProps(image, DETAILS_IMAGE_SIZES)}
              alt={image.alt ?? name ?? ""}
            />
          ) : (
            <DetailsImagePlaceholder />
          )}
          {imageAction && <ImageAction>{imageAction}</ImageAction>}
        </DetailsMedia>
        {description && <DetailsDescription>{description}</DetailsDescription>}
        {hasInfo && (
          <DetailsInfo>
            <InfoList items={info} />
          </DetailsInfo>
        )}
      </DetailsBody>

      {latitude != null && longitude != null && (
        <MapBlock>
          <h2>{t.details.findOnMap}</h2>
          <LocationMap name={name ?? ""} latitude={latitude} longitude={longitude} zoom={mapZoom} />
        </MapBlock>
      )}
    </DetailsSectionStyled>
  );
};
