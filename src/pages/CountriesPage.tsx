import { MainLayout } from "../components/layout/MainLayout";
import { CountriesSection } from "../components/sections/CountriesSection";

export const CountriesPage = () => {
  return (
    <MainLayout>
      <h1>Countries Page</h1>
      <CountriesSection />
    </MainLayout>
  );
};
