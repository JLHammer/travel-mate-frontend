import type { AttractionDetail } from "../../types";
import { ROUTES } from "../../router/routes";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { placeInfo } from "../ui/details/placeInfo";
import { CardSection } from "./CardSection";
import { DetailsSection } from "./DetailsSection";

type AttractionDetailsSectionProps = {
  attraction: AttractionDetail;
};

export const AttractionDetailsSection = ({ attraction }: AttractionDetailsSectionProps) => {
  const { name, imageUrl, description, address, latitude, longitude, website, city, related } =
    attraction;

  return (
    <>
      <DetailsSection
        backPath={ROUTES.attractions}
        backNoun="attractions"
        name={name}
        flagCode={city?.country?.code}
        imageUrl={imageUrl}
        description={description}
        info={placeInfo({ address, latitude, longitude, website })}
        latitude={latitude}
        longitude={longitude}
        mapZoom={16}
      />

      {related.length > 0 && (
        <CardSection
          title={`More places in ${city?.name ?? "this city"}`}
          linkPath={ROUTES.attractions}
          linkNoun="places"
          carousel="mobile"
        >
          {related.map((other) => (
            <li key={other._id}>
              <AttractionCard attraction={{ ...other, city }} variant="detailed" />
            </li>
          ))}
        </CardSection>
      )}
    </>
  );
};
