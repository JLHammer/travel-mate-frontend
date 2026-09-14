import { MainLayout } from "../components/layout/MainLayout";
import { AboutSection } from "../components/sections/AboutSection";

export const AboutPage = () => {
  return (
    <MainLayout>
      <h1>About Page</h1>
      <AboutSection />
    </MainLayout>
  );
};
