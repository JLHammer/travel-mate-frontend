import { useAttractions } from "../../hooks/useAttractions";
import { useCities } from "../../hooks/useCities";
import { useCountries } from "../../hooks/useCountries";
import { ROUTES } from "../../router/routes";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { CityCard } from "../ui/cards/CityCard";
import { CountryCard } from "../ui/cards/CountryCard";
import { CardSection } from "./CardSection";

export const FeaturedSection = () => {
  const countries = useCountries();
  const cities = useCities();
  const attractions = useAttractions();

  if (countries.isLoading || cities.isLoading || attractions.isLoading) {
    return (
      <CardSection
        title="Popular Countries"
        linkPath={ROUTES.countries}
        linkNoun="countries"
        loading
      />
    );
  }

  if (countries.error || cities.error || attractions.error) {
    return <p>Could not load the featured destinations. Please try again later.</p>;
  }

  return (
    <>
      <CardSection
        title="Popular Countries"
        linkPath={ROUTES.countries}
        linkNoun="countries"
        carousel
      >
        {countries.data
          ?.filter((country) => country.featured)
          .map((country) => (
            <li key={country._id}>
              <CountryCard country={country} />
            </li>
          ))}
      </CardSection>

      <CardSection title="Popular Cities" linkPath={ROUTES.cities} linkNoun="cities" carousel>
        {cities.data
          ?.filter((city) => city.featured)
          .map((city) => (
            <li key={city._id}>
              <CityCard city={city} />
            </li>
          ))}
      </CardSection>

      <CardSection title="Featured Attractions" linkPath={ROUTES.attractions} linkNoun="attractions" carousel>
        {attractions.data
          ?.filter((attraction) => attraction.featured)
          .map((attraction) => (
            <li key={attraction._id}>
              <AttractionCard attraction={attraction} />
            </li>
          ))}
      </CardSection>
    </>
  );
};
