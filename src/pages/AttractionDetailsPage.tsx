import { useParams } from "react-router-dom";
import { useAttraction } from "../hooks/useAttraction";
import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { Loader } from "../components/ui/Loader";
import { AttractionDetailsSection } from "../components/sections/AttractionDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const AttractionDetailsPage = () => {
  const { attractionSlug } = useParams();
  const { t } = useTranslation();
  const { data: attraction, isLoading, error } = useAttraction(attractionSlug);

  if (isLoading) return <Loader />;

  if (error) {
    return <p>{t.errors.attraction}</p>;
  }

  if (!attraction) return <NotFoundPage />;

  return (
    <>
      <PageTitle title={attraction.name ?? t.fallback.attraction} />
      <AttractionDetailsSection attraction={attraction} />
    </>
  );
};
