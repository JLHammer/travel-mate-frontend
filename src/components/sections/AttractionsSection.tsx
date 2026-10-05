import { useAttractions } from "../../hooks/useAttractions";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { CardSection } from "./CardSection";

export const AttractionsSection = () => {
  const { data: attractions, isLoading, error } = useAttractions();

  if (error) {
    return <p>Could not load the attractions. Please try again later.</p>;
  }

  return (
    <CardSection title="Attractions" loading={isLoading}>
      {attractions?.map((attraction) => (
        <li key={attraction._id}>
          <AttractionCard attraction={attraction} />
        </li>
      ))}
    </CardSection>
  );
};
