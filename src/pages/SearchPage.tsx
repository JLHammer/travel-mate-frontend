import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { SearchSection } from "../components/sections/SearchSection";

export const SearchPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t.search.title} />
      <SearchSection />
    </>
  );
};
