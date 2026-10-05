import { useParams } from "react-router-dom";
import { useCity } from "../hooks/useCity";
import { PageTitle } from "../components/ui/PageTitle";
import { Loader } from "../components/ui/Loader";
import { CityDetailsSection } from "../components/sections/CityDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const CityDetailsPage = () => {
  const { citySlug } = useParams();
  const { data: city, isLoading, error } = useCity(citySlug);

  if (isLoading) return <Loader />;

  if (error) {
    return <p>Could not load this city. Please try again later.</p>;
  }

  if (!city) return <NotFoundPage />;

  return (
    <>
      <PageTitle title={city.name ?? "City"} />
      <CityDetailsSection city={city} />
    </>
  );
};
