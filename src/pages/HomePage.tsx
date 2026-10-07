import { PageTitle } from "../components/ui/PageTitle";
import { useTranslation } from "../hooks/useTranslation";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturedSection } from "../components/sections/FeaturedSection";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t.nav.home} />
      <HeroSection />
      <FeaturedSection />
    </>
  );
};
