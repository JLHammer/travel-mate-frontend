import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { useHomePage } from "../hooks/useHomePage";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturedSection } from "../components/sections/FeaturedSection";

// One fetch for the whole page, so the hero and the carousels arrive together
export const HomePage = () => {
  const { t } = useTranslation();
  const { data, isLoading, error, refetch } = useHomePage();

  return (
    <>
      <PageTitle title={t.nav.home} />
      <HeroSection hero={data?.hero ?? null} loading={isLoading} />
      <FeaturedSection data={data} loading={isLoading} error={error} onRetry={refetch} />
    </>
  );
};
