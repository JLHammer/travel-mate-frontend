import { useParams } from "react-router-dom";
import { PageTitle } from "../components/ui/PageTitle";

export const AttractionDetailsPage = () => {
  const { attractionSlug } = useParams();

  return (
    <>
      <PageTitle title={attractionSlug ?? "Attraction"} />
      <section>
        <h1>{attractionSlug}</h1>
      </section>
    </>
  );
};
