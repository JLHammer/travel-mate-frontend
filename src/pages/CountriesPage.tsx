import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { CountriesSection } from "../components/sections/CountriesSection";

export const CountriesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t.nav.countries} />
      <CountriesSection />
    </>
  );
};
