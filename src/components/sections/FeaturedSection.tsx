import { useFeatured } from "../../hooks/useFeatured";
import { ROUTES } from "../../router/routes";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { CityCard } from "../ui/cards/CityCard";
import { CountryCard } from "../ui/cards/CountryCard";
import { CardSection } from "./CardSection";
import { useTranslation } from "../../hooks/useTranslation";

export const FeaturedSection = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useFeatured();

  if (isLoading) {
    return (
      <CardSection
        title={t.sections.popularCountries}
        linkPath={ROUTES.countries}
        linkLabel={t.sections.viewAllCountries}
        loading
      />
    );
  }

  if (error) {
    return <p>{t.errors.featured}</p>;
  }

  return (
    <>
      <CardSection
        title={t.sections.popularCountries}
        linkPath={ROUTES.countries}
        linkLabel={t.sections.viewAllCountries}
        carousel
      >
        {data?.countries.map((country) => (
          <li key={country._id}>
            <CountryCard country={country} />
          </li>
        ))}
      </CardSection>

      <CardSection
        title={t.sections.popularCities}
        linkPath={ROUTES.cities}
        linkLabel={t.sections.viewAllCities}
        carousel
      >
        {data?.cities.map((city) => (
          <li key={city._id}>
            <CityCard city={city} />
          </li>
        ))}
      </CardSection>

      <CardSection
        title={t.sections.featuredAttractions}
        linkPath={ROUTES.attractions}
        linkLabel={t.sections.viewAllAttractions}
        carousel
      >
        {data?.attractions.map((attraction) => (
          <li key={attraction._id}>
            <AttractionCard attraction={attraction} />
          </li>
        ))}
      </CardSection>
    </>
  );
};
