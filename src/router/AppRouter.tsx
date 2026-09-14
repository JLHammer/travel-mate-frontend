import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CountriesPage } from "../pages/CountriesPage";
import { CitiesPage } from "../pages/CitiesPage";
import { PlacesPage } from "../pages/PlacesPage";
import { AboutPage } from "../pages/AboutPage";
import { ROUTES } from "../data/routes";

const { home, countries, cities, places, about } = ROUTES;

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={home} element={<HomePage />} />
      <Route path={countries} element={<CountriesPage />} />
      <Route path={cities} element={<CitiesPage />} />
      <Route path={places} element={<PlacesPage />} />
      <Route path={about} element={<AboutPage />} />
    </Routes>
  );
};
