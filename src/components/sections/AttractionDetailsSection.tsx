import type { AttractionDetail } from "../../types";
import { usePaths } from "../../hooks/usePaths";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { placeInfo } from "../ui/details/placeInfo";
import { FavoriteButton } from "../ui/FavoriteButton";
import { CardSection } from "./CardSection";
import { DetailsSection } from "./DetailsSection";
import { useTranslation } from "../../hooks/useTranslation";

type AttractionDetailsSectionProps = {
  attraction: AttractionDetail;
};

export const AttractionDetailsSection = ({ attraction }: AttractionDetailsSectionProps) => {
  const { t } = useTranslation();
  const paths = usePaths();
  const { _id, name, image, description, address, latitude, longitude, website, city, related } =
    attraction;

  return (
    <>
      <DetailsSection
        backPath={paths.attractions}
        backLabel={t.details.backToAttractions}
        name={name}
        flagCode={city?.country?.code}
        image={image}
        description={description}
        info={placeInfo({ address, latitude, longitude, website }, t.details)}
        latitude={latitude}
        longitude={longitude}
        mapZoom={16}
        imageAction={<FavoriteButton attractionId={_id} variant="image" />}
      />

      {related.length > 0 && (
        <CardSection
          title={t.sections.moreAttractionsIn(city?.name ?? t.sections.thisCity)}
          linkPath={paths.attractions}
          linkLabel={t.sections.viewAllAttractions}
          carousel="mobile"
        >
          {related.map((other) => (
            <li key={other._id}>
              <AttractionCard attraction={{ ...other, city }} variant="detailed" />
            </li>
          ))}
        </CardSection>
      )}
    </>
  );
};
