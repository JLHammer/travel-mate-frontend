import { useState } from "react";
import { useCountries } from "../../hooks/useCountries";
import { CountryCard } from "../ui/cards/CountryCard";
import { SearchBar } from "../ui/SearchBar";
import { CardSection } from "./CardSection";
import { useTranslation } from "../../hooks/useTranslation";
import { matchesSearch } from "../../utils/matchesSearch";

export const CountriesSection = () => {
  const { t } = useTranslation();
  const { data: countries, isLoading, error } = useCountries();
  const [query, setQuery] = useState("");

  if (error) {
    return <p>{t.errors.countries}</p>;
  }

  const results = countries?.filter((country) =>
    matchesSearch(query, [country.name, country.tagline]),
  );

  return (
    <CardSection
      title={t.nav.countries}
      headingAs="h1"
      loading={isLoading}
      toolbar={<SearchBar value={query} onChange={setQuery} placeholder={t.search.countries} />}
      emptyMessage={t.search.noResults}
    >
      {results?.map((country) => (
        <li key={country._id}>
          <CountryCard country={country} />
        </li>
      ))}
    </CardSection>
  );
};
