import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { InfoList, type InfoItem } from "../ui/details/InfoList";
import { LocationMap } from "../ui/details/LocationMap";
import { tokens } from "../../styles/theme";
import { flagUrl } from "../../utils/flagUrl";

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

const detailsImage = css`
  grid-area: image;
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

type DetailsSectionProps = {
  backPath: string;
  backNoun: string;
  name: string | null;
  flagCode?: string | null;
  imageUrl: string | null;
  description: string | null;
  info?: InfoItem[];
  latitude?: number | null;
  longitude?: number | null;
  mapZoom?: number;
};

export const DetailsSection = ({
  backPath,
  backNoun,
  name,
  flagCode,
  imageUrl,
  description,
  info = [],
  latitude,
  longitude,
  mapZoom = 12,
}: DetailsSectionProps) => {
  const hasInfo = info.length > 0;

  return (
    <DetailsSectionStyled>
      <DetailsHeader>
        <BackLink to={backPath}>
          <ArrowLeft /> Back to {backNoun}
        </BackLink>
        <DetailsTitle>
          {flagCode && <DetailsFlag src={flagUrl(flagCode)} alt="" />}
          {name}
        </DetailsTitle>
      </DetailsHeader>

      <DetailsBody $hasInfo={hasInfo}>
        {imageUrl ? <DetailsImage src={imageUrl} alt={name ?? ""} /> : <DetailsImagePlaceholder />}
        {description && <DetailsDescription>{description}</DetailsDescription>}
        {hasInfo && (
          <DetailsInfo>
            <InfoList items={info} />
          </DetailsInfo>
        )}
      </DetailsBody>

      {latitude != null && longitude != null && (
        <MapBlock>
          <h2>Find on the map</h2>
          <LocationMap latitude={latitude} longitude={longitude} zoom={mapZoom} />
        </MapBlock>
      )}
    </DetailsSectionStyled>
  );
};
