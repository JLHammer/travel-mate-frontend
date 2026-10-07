import { Globe, LocateFixed, MapPin } from "lucide-react";
import { ExternalLink } from "../ExternalLink";
import type { InfoItem } from "./InfoList";
import type { Dictionary } from "../../../i18n/translations";

type PlaceInfoFields = {
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  website?: string | null;
};

export const placeInfo = (
  { address, latitude, longitude, website }: PlaceInfoFields,
  labels: Dictionary["details"],
) => {
  const items: InfoItem[] = [];

  if (address) {
    items.push({ icon: <MapPin />, label: labels.address, value: address });
  }

  if (latitude != null && longitude != null) {
    items.push({
      icon: <LocateFixed />,
      label: labels.coordinates,
      value: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    });
  }

  if (website) {
    items.push({
      icon: <Globe />,
      label: labels.website,
      value: (
        <ExternalLink href={website} primary>
          {website}
        </ExternalLink>
      ),
    });
  }

  return items;
};
