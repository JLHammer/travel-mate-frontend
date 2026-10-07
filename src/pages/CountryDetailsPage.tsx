import { useParams } from "react-router-dom";
import { useCountry } from "../hooks/useCountry";
import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { Loader } from "../components/ui/Loader";
import { CountryDetailsSection } from "../components/sections/CountryDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const CountryDetailsPage = () => {
  const { countrySlug } = useParams();
  const { t } = useTranslation();
  const { data: country, isLoading, error } = useCountry(countrySlug);

  if (isLoading) return <Loader />;

  if (error) {
    return <p>{t.errors.country}</p>;
  }

  if (!country) return <NotFoundPage />;

  return (
    <>
      <PageTitle title={country.name ?? t.fallback.country} />
      <CountryDetailsSection country={country} />
    </>
  );
};
