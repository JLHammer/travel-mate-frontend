import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { CityCard } from "../ui/cards/CityCard";
import { CountryCard } from "../ui/cards/CountryCard";
import { SearchBar } from "../ui/SearchBar";
import { CardSection } from "./CardSection";
import { useTranslation } from "../../hooks/useTranslation";
import { matchesSearch } from "../../utils/matchesSearch";

export const SearchSection = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const hasQuery = query.trim() !== "";

  const setQuery = (value: string) => setSearchParams(value ? { q: value } : {}, { replace: true });

  if (error) {
    return <p>{t.errors.search}</p>;
  }

  const results = hasQuery ? data : null;

  const countries =
    results?.countries.filter((country) => matchesSearch(query, [country.name, country.tagline])) ??
    [];

  const cities =
    results?.cities.filter((city) =>
      matchesSearch(query, [city.name, city.country?.name, city.tagline]),
    ) ?? [];

  const attractions =
    results?.attractions.filter((attraction) =>
      matchesSearch(query, [
        attraction.name,
        attraction.category && t.categories[attraction.category],
        attraction.city?.name,
        attraction.city?.country?.name,
        attraction.tagline,
      ]),
    ) ?? [];

  const hasResults = countries.length + cities.length + attractions.length > 0;

  return (
    <>
      <CardSection
        title={hasQuery ? t.search.resultsFor(query.trim()) : t.search.title}
        headingAs="h1"
        loading={isLoading}
        toolbar={<SearchBar value={query} onChange={setQuery} />}
        emptyMessage={!hasQuery ? t.search.prompt : !hasResults ? t.search.noResults : undefined}
      />

      {countries.length > 0 && (
        <CardSection title={t.nav.countries}>
          {countries.map((country) => (
            <li key={country._id}>
              <CountryCard country={country} />
            </li>
          ))}
        </CardSection>
      )}

      {cities.length > 0 && (
        <CardSection title={t.nav.cities}>
          {cities.map((city) => (
            <li key={city._id}>
              <CityCard city={city} />
            </li>
          ))}
        </CardSection>
      )}

      {attractions.length > 0 && (
        <CardSection title={t.nav.attractions}>
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
