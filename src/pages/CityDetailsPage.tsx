import { Navigate, useParams } from "react-router-dom";
import { useCity } from "../hooks/useCity";
import { useLocalizedSlug } from "../hooks/useLocalizedSlug";
import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { Loader } from "../components/ui/Loader";
import { CityDetailsSection } from "../components/sections/CityDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const CityDetailsPage = () => {
  const { citySlug } = useParams();
  const { t } = useTranslation();
  const { data: city, isLoading, error } = useCity(citySlug);
  // Not while loading, since city still holds the previous page then
  const redirect = useLocalizedSlug(isLoading ? null : city?.slugs, "city");

  if (isLoading) return <Loader />;

  if (error) {
    return <p>{t.errors.city}</p>;
  }

  if (!city) return <NotFoundPage />;

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <PageTitle title={city.name ?? t.fallback.city} />
      <CityDetailsSection city={city} />
    </>
  );
};
