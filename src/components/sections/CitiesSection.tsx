import { useState } from "react";
import { useCities } from "../../hooks/useCities";
import { CityCard } from "../ui/cards/CityCard";
import { SearchBar } from "../ui/SearchBar";
import { CardSection } from "./CardSection";
import { useTranslation } from "../../hooks/useTranslation";
import { matchesSearch } from "../../utils/matchesSearch";

export const CitiesSection = () => {
  const { t } = useTranslation();
  const { data: cities, isLoading, error } = useCities();
  const [query, setQuery] = useState("");

  if (error) {
    return <p>{t.errors.cities}</p>;
  }

  const results = cities?.filter((city) =>
    matchesSearch(query, [city.name, city.country?.name, city.tagline]),
  );

  return (
    <CardSection
      title={t.nav.cities}
      headingAs="h1"
      loading={isLoading}
      toolbar={<SearchBar value={query} onChange={setQuery} placeholder={t.search.cities} />}
      emptyMessage={t.search.noResults}
    >
      {results?.map((city) => (
        <li key={city._id}>
          <CityCard city={city} />
        </li>
      ))}
    </CardSection>
  );
};
