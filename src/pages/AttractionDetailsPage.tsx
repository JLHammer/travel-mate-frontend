import { useParams } from "react-router-dom";
import { useAttraction } from "../hooks/useAttraction";
import { PageTitle } from "../components/ui/PageTitle";
import { Loader } from "../components/ui/Loader";
import { AttractionDetailsSection } from "../components/sections/AttractionDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const AttractionDetailsPage = () => {
  const { attractionSlug } = useParams();
  const { data: attraction, isLoading, error } = useAttraction(attractionSlug);

  if (isLoading) return <Loader />;

  if (error) {
    return <p>Could not load this attraction. Please try again later.</p>;
  }

  if (!attraction) return <NotFoundPage />;

  return (
    <>
      <PageTitle title={attraction.name ?? "Attraction"} />
      <AttractionDetailsSection attraction={attraction} />
    </>
  );
};
