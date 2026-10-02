import { useParams } from "react-router-dom";
import { PageTitle } from "../components/ui/PageTitle";

export const CountryDetailsPage = () => {
  const { countrySlug } = useParams();

  return (
    <>
      <PageTitle title={countrySlug ?? "Country"} />
      <section>
        <h1>{countrySlug}</h1>
      </section>
    </>
  );
};
