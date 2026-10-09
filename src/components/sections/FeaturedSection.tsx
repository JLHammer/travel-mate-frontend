import { useFeatured } from "../../hooks/useFeatured";
import { usePaths } from "../../hooks/usePaths";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { CityCard } from "../ui/cards/CityCard";
import { CountryCard } from "../ui/cards/CountryCard";
import { CardSection } from "./CardSection";
import { useTranslation } from "../../hooks/useTranslation";

export const FeaturedSection = () => {
  const { t } = useTranslation();
  const paths = usePaths();
  const { data, isLoading, error, refetch } = useFeatured();

  // One section holds the loader or the error until all three can be shown
  if (isLoading || error) {
    return (
      <CardSection
        title={t.sections.popularCountries}
        linkPath={paths.countries}
        linkLabel={t.sections.viewAllCountries}
        loading={isLoading}
        errorMessage={error ? t.errors.featured : undefined}
        onRetry={refetch}
      />
    );
  }

  const countries = data?.countries ?? [];
  const cities = data?.cities ?? [];
  const attractions = data?.attractions ?? [];

  // A carousel is only shown when something of its type is marked as featured in Sanity
  return (
    <>
      {countries.length > 0 && (
        <CardSection
          title={t.sections.popularCountries}
          linkPath={paths.countries}
          linkLabel={t.sections.viewAllCountries}
          carousel
        >
          {countries.map((country) => (
            <li key={country._id}>
              <CountryCard country={country} />
            </li>
          ))}
        </CardSection>
      )}

      {cities.length > 0 && (
        <CardSection
          title={t.sections.popularCities}
          linkPath={paths.cities}
          linkLabel={t.sections.viewAllCities}
          carousel
        >
          {cities.map((city) => (
            <li key={city._id}>
              <CityCard city={city} />
            </li>
          ))}
        </CardSection>
      )}

      {attractions.length > 0 && (
        <CardSection
          title={t.sections.featuredAttractions}
          linkPath={paths.attractions}
          linkLabel={t.sections.viewAllAttractions}
          carousel
        >
          {attractions.map((attraction) => (
            <li key={attraction._id}>
              <AttractionCard attraction={attraction} />
            </li>
          ))}
        </CardSection>
      )}
    </>
  );
};
