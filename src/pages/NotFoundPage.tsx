import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { NotFoundSection } from "../components/sections/NotFoundSection";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t.notFound.title} />
      <NotFoundSection />
    </>
  );
};
