import { MainLayout } from "../components/layout/MainLayout";
import { CitiesSection } from "../components/sections/CitiesSection";

export const CitiesPage = () => {
  return (
    <MainLayout>
      <h1>Cities Page</h1>
      <CitiesSection />
    </MainLayout>
  );
};
