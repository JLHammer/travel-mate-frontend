import { useCountries } from "../../hooks/useCountries";
import { CountryCard } from "../ui/cards/CountryCard";
import { CardSection } from "./CardSection";

export const CountriesSection = () => {
  const { data: countries, isLoading, error } = useCountries();

  if (error) {
    return <p>Could not load the countries. Please try again later.</p>;
  }

  return (
    <CardSection title="Countries" loading={isLoading}>
      {countries?.map((country) => (
        <li key={country._id}>
          <CountryCard country={country} />
        </li>
      ))}
    </CardSection>
  );
};
