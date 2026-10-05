import { Globe, LocateFixed, MapPin } from "lucide-react";
import { ExternalLink } from "../ExternalLink";
import type { InfoItem } from "./InfoList";

type PlaceInfoFields = {
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  website?: string | null;
};

export const placeInfo = ({ address, latitude, longitude, website }: PlaceInfoFields) => {
  const items: InfoItem[] = [];

  if (address) {
    items.push({ icon: <MapPin />, label: "Address", value: address });
  }

  if (latitude != null && longitude != null) {
    items.push({
      icon: <LocateFixed />,
      label: "Coordinates",
      value: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    });
  }

  if (website) {
    items.push({
      icon: <Globe />,
      label: "Website",
      value: (
        <ExternalLink href={website} primary>
          {website}
        </ExternalLink>
      ),
    });
  }

  return items;
};
