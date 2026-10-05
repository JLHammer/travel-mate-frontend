import styled from "styled-components";
import { ExternalLink } from "../ExternalLink";
import { tokens } from "../../../styles/theme";

const MapFrame = styled.iframe`
  display: block;
  width: 100%;
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.panel};
  box-shadow: ${({ theme }) => theme.shadows.card};

  height: ${tokens.mobile.sizes.mapHeight};

  ${tokens.media.tablet} {
    height: ${tokens.tablet.sizes.mapHeight};
  }

  ${tokens.media.desktop} {
    height: ${tokens.desktop.sizes.mapHeight};
  }
`;

const MapCaption = styled.p`
  margin-top: ${tokens.mobile.spacing.xs};
  color: ${({ theme }) => theme.colors.bodyText};
`;

type LocationMapProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export const LocationMap = ({ latitude, longitude, zoom }: LocationMapProps) => {
  const lngSpan = (360 / 2 ** zoom) * 2;
  const latSpan = lngSpan / 2;
  const bbox = [longitude - lngSpan, latitude - latSpan, longitude + lngSpan, latitude + latSpan]
    .map((value) => value.toFixed(5))
    .join(",");

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;

  return (
    <div>
      <MapFrame src={embedUrl} loading="lazy" />
      <MapCaption>
        Open a larger map in <ExternalLink href={fullMapUrl}>OpenStreetMap</ExternalLink>
      </MapCaption>
    </div>
  );
};
