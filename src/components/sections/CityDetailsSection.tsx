import type { CityDetail } from "../../types";
import { ROUTES } from "../../router/routes";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { placeInfo } from "../ui/details/placeInfo";
import { CardSection } from "./CardSection";
import { DetailsSection } from "./DetailsSection";

type CityDetailsSectionProps = {
  city: CityDetail;
};

export const CityDetailsSection = ({ city }: CityDetailsSectionProps) => {
  const { name, imageUrl, description, latitude, longitude, website, country, attractions } = city;

  const address = [name, country?.name].filter(Boolean).join(", ");

  return (
    <>
      <DetailsSection
        backPath={ROUTES.cities}
        backNoun="cities"
        name={name}
        flagCode={country?.code}
        imageUrl={imageUrl}
        description={description}
        info={placeInfo({ address, latitude, longitude, website })}
        latitude={latitude}
        longitude={longitude}
        mapZoom={12}
      />

      {attractions.length > 0 && (
        <CardSection
          title={`Popular places in ${name}`}
          linkPath={ROUTES.attractions}
          linkNoun="places"
          carousel="mobile"
        >
          {attractions.map((attraction) => (
            <li key={attraction._id}>
              <AttractionCard attraction={{ ...attraction, city }} variant="detailed" />
            </li>
          ))}
        </CardSection>
      )}
    </>
  );
};
