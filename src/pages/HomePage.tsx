import { PageTitle } from "../components/ui/PageTitle";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturedSection } from "../components/sections/FeaturedSection";

export const HomePage = () => {
  return (
    <>
      <PageTitle title="Home" />
      <HeroSection />
      <FeaturedSection />
    </>
  );
};
