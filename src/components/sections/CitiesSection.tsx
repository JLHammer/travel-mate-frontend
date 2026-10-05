import { useCities } from "../../hooks/useCities";
import { CityCard } from "../ui/cards/CityCard";
import { CardSection } from "./CardSection";

export const CitiesSection = () => {
  const { data: cities, isLoading, error } = useCities();

  if (error) {
    return <p>Could not load the cities. Please try again later.</p>;
  }

  return (
    <CardSection title="Cities" loading={isLoading}>
      {cities?.map((city) => (
        <li key={city._id}>
          <CityCard city={city} />
        </li>
      ))}
    </CardSection>
  );
};
