import { MainLayout } from "../components/layout/MainLayout";
import { PlacesSection } from "../components/sections/PlacesSection";

export const PlacesPage = () => {
  return (
    <MainLayout>
      <h1>Places Page</h1>
      <PlacesSection />
    </MainLayout>
  );
};
