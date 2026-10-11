import { usePaths } from "../../hooks/usePaths";
import { useTranslation } from "../../hooks/useTranslation";
import type { HomePageData } from "../../types";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { CityCard } from "../ui/cards/CityCard";
import { CountryCard } from "../ui/cards/CountryCard";
import { CardSection } from "./CardSection";

type FeaturedSectionProps = {
  data: HomePageData | null;
  loading: boolean;
  error: Error | null;
  onRetry: () => void;
};

export const FeaturedSection = ({ data, loading, error, onRetry }: FeaturedSectionProps) => {
  const { t } = useTranslation();
  const paths = usePaths();

  // One section holds the loader or the error until all three can be shown
  if (loading || error) {
    return (
      <CardSection
        title={t.nav.countries}
        linkPath={paths.countries}
        linkLabel={t.sections.viewAllCountries}
        loading={loading}
        errorMessage={error ? t.errors.featured : undefined}
        onRetry={onRetry}
      />
    );
  }

  // A deleted place leaves an empty reference behind until the editor removes it from the list
  const countries = (data?.countries?.items ?? []).filter((item) => item !== null);
  const cities = (data?.cities?.items ?? []).filter((item) => item !== null);
  const attractions = (data?.attractions?.items ?? []).filter((item) => item !== null);

  // A carousel is hidden when the editor leaves its list empty in the Studio
  return (
    <>
      {countries.length > 0 && (
        <CardSection
          title={data?.countries?.title ?? t.nav.countries}
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
          title={data?.cities?.title ?? t.nav.cities}
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
          title={data?.attractions?.title ?? t.nav.attractions}
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
