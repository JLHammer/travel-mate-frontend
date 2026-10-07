import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { CitiesSection } from "../components/sections/CitiesSection";

export const CitiesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t.nav.cities} />
      <CitiesSection />
    </>
  );
};
