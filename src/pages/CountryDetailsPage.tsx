import { Navigate, useParams } from "react-router-dom";
import { useCountry } from "../hooks/useCountry";
import { useLocalizedSlug } from "../hooks/useLocalizedSlug";
import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { Loader } from "../components/ui/Loader";
import { ErrorState } from "../components/ui/ErrorState";
import { CountryDetailsSection } from "../components/sections/CountryDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const CountryDetailsPage = () => {
  const { countrySlug } = useParams();
  const { t } = useTranslation();
  const { data: country, isLoading, error, refetch } = useCountry(countrySlug);
  // Not while loading, since country still holds the previous page then
  const redirect = useLocalizedSlug(isLoading ? null : country?.slugs, "country");

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorState message={t.errors.country} onRetry={refetch} />;
  }

  if (!country) return <NotFoundPage />;

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <PageTitle title={country.name ?? t.fallback.country} />
      <CountryDetailsSection country={country} />
    </>
  );
};
