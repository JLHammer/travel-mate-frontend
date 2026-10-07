import type { CityDetail } from "../../types";
import { ROUTES } from "../../router/routes";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { placeInfo } from "../ui/details/placeInfo";
import { CardSection } from "./CardSection";
import { DetailsSection } from "./DetailsSection";
import { useTranslation } from "../../hooks/useTranslation";

type CityDetailsSectionProps = {
  city: CityDetail;
};

export const CityDetailsSection = ({ city }: CityDetailsSectionProps) => {
  const { t } = useTranslation();
  const { name, image, description, latitude, longitude, website, country, attractions } = city;

  const address = [name, country?.name].filter(Boolean).join(", ");

  return (
    <>
      <DetailsSection
        backPath={ROUTES.cities}
        backLabel={t.details.backToCities}
        name={name}
        flagCode={country?.code}
        image={image}
        description={description}
        info={placeInfo({ address, latitude, longitude, website }, t.details)}
        latitude={latitude}
        longitude={longitude}
        mapZoom={12}
      />

      {attractions.length > 0 && (
        <CardSection
          title={t.sections.popularAttractionsIn(name ?? "")}
          linkPath={ROUTES.attractions}
          linkLabel={t.sections.viewAllAttractions}
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
