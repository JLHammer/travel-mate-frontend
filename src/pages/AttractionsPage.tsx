import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { AttractionsSection } from "../components/sections/AttractionsSection";

export const AttractionsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t.nav.attractions} />
      <AttractionsSection />
    </>
  );
};
