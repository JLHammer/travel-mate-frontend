import { useParams } from "react-router-dom";
import { useCity } from "../hooks/useCity";
import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { Loader } from "../components/ui/Loader";
import { CityDetailsSection } from "../components/sections/CityDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const CityDetailsPage = () => {
  const { citySlug } = useParams();
  const { t } = useTranslation();
  const { data: city, isLoading, error } = useCity(citySlug);

  if (isLoading) return <Loader />;

  if (error) {
    return <p>{t.errors.city}</p>;
  }

  if (!city) return <NotFoundPage />;

  return (
    <>
      <PageTitle title={city.name ?? t.fallback.city} />
      <CityDetailsSection city={city} />
    </>
  );
};
