import { Navigate, useParams } from "react-router-dom";
import { useAttraction } from "../hooks/useAttraction";
import { useLocalizedSlug } from "../hooks/useLocalizedSlug";
import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { Loader } from "../components/ui/Loader";
import { ErrorState } from "../components/ui/ErrorState";
import { AttractionDetailsSection } from "../components/sections/AttractionDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const AttractionDetailsPage = () => {
  const { attractionSlug } = useParams();
  const { t } = useTranslation();
  const { data: attraction, isLoading, error, refetch } = useAttraction(attractionSlug);
  // Not while loading, since attraction still holds the previous page then
  const redirect = useLocalizedSlug(isLoading ? null : attraction?.slugs, "attraction");

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorState message={t.errors.attraction} onRetry={refetch} />;
  }

  if (!attraction) return <NotFoundPage />;

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <PageTitle title={attraction.name ?? t.fallback.attraction} />
      <AttractionDetailsSection attraction={attraction} />
    </>
  );
};
