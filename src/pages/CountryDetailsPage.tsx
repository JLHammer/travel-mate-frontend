import { useParams } from "react-router-dom";
import { useCountry } from "../hooks/useCountry";
import { PageTitle } from "../components/ui/PageTitle";
import { Loader } from "../components/ui/Loader";
import { CountryDetailsSection } from "../components/sections/CountryDetailsSection";
import { NotFoundPage } from "./NotFoundPage";

export const CountryDetailsPage = () => {
  const { countrySlug } = useParams();
  const { data: country, isLoading, error } = useCountry(countrySlug);

  if (isLoading) return <Loader />;

  if (error) {
    return <p>Could not load this country. Please try again later.</p>;
  }

  if (!country) return <NotFoundPage />;

  return (
    <>
      <PageTitle title={country.name ?? "Country"} />
      <CountryDetailsSection country={country} />
    </>
  );
};
