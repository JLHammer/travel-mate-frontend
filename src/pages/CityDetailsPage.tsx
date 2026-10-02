import { useParams } from "react-router-dom";
import { PageTitle } from "../components/ui/PageTitle";

export const CityDetailsPage = () => {
  const { citySlug } = useParams();

  return (
    <>
      <PageTitle title={citySlug ?? "City"} />
      <section>
        <h1>{citySlug}</h1>
      </section>
    </>
  );
};
