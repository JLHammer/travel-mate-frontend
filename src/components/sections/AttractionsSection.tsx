import { useState } from "react";
import { useAttractions } from "../../hooks/useAttractions";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { SearchBar } from "../ui/SearchBar";
import { CardSection } from "./CardSection";
import { useTranslation } from "../../hooks/useTranslation";
import { matchesSearch } from "../../utils/matchesSearch";

export const AttractionsSection = () => {
  const { t } = useTranslation();
  const { data: attractions, isLoading, error } = useAttractions();
  const [query, setQuery] = useState("");

  if (error) {
    return <p>{t.errors.attractions}</p>;
  }

  const results = attractions?.filter((attraction) =>
    matchesSearch(query, [
      attraction.name,
      attraction.category && t.categories[attraction.category],
      attraction.city?.name,
      attraction.city?.country?.name,
      attraction.tagline,
    ]),
  );

  return (
    <CardSection
      title={t.nav.attractions}
      headingAs="h1"
      loading={isLoading}
      toolbar={<SearchBar value={query} onChange={setQuery} placeholder={t.search.attractions} />}
      emptyMessage={t.search.noResults}
    >
      {results?.map((attraction) => (
        <li key={attraction._id}>
          <AttractionCard attraction={attraction} />
        </li>
      ))}
    </CardSection>
  );
};
