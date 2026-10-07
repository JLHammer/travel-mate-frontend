import type { CountryDetail } from "../../types";
import { ROUTES } from "../../router/routes";
import { CityCard } from "../ui/cards/CityCard";
import { CardSection } from "./CardSection";
import { DetailsSection } from "./DetailsSection";
import { useTranslation } from "../../hooks/useTranslation";

type CountryDetailsSectionProps = {
  country: CountryDetail;
};

export const CountryDetailsSection = ({ country }: CountryDetailsSectionProps) => {
  const { t } = useTranslation();
  const { name, code, image, description, cities } = country;

  return (
    <>
      <DetailsSection
        backPath={ROUTES.countries}
        backLabel={t.details.backToCountries}
        name={name}
        flagCode={code}
        image={image}
        description={description}
      />

      {cities.length > 0 && (
        <CardSection
          title={t.sections.popularCitiesIn(name ?? "")}
          linkPath={ROUTES.cities}
          linkLabel={t.sections.viewAllCities}
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
