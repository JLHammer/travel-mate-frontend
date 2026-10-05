import type { CountryDetail } from "../../types";
import { ROUTES } from "../../router/routes";
import { CityCard } from "../ui/cards/CityCard";
import { CardSection } from "./CardSection";
import { DetailsSection } from "./DetailsSection";

type CountryDetailsSectionProps = {
  country: CountryDetail;
};

export const CountryDetailsSection = ({ country }: CountryDetailsSectionProps) => {
  const { name, code, imageUrl, description, cities } = country;

  return (
    <>
      <DetailsSection
        backPath={ROUTES.countries}
        backNoun="countries"
        name={name}
        flagCode={code}
        imageUrl={imageUrl}
        description={description}
      />

      {cities.length > 0 && (
        <CardSection
          title={`Popular cities in ${name}`}
          linkPath={ROUTES.cities}
          linkNoun="cities"
          carousel="mobile"
        >
          {cities.map((city) => (
            <li key={city._id}>
              <CityCard city={city} variant="detailed" />
            </li>
          ))}
        </CardSection>
      )}
    </>
  );
};
