import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { FavoritesSection } from "../components/sections/FavoritesSection";

export const FavoritesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t.favorites.title} />
      <FavoritesSection />
    </>
  );
};
