import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import { MainLayout } from "../components/layout/MainLayout";
import { HomePage } from "../pages/HomePage";
import { CountriesPage } from "../pages/CountriesPage";
import { CountryDetailsPage } from "../pages/CountryDetailsPage";
import { CitiesPage } from "../pages/CitiesPage";
import { CityDetailsPage } from "../pages/CityDetailsPage";
import { AttractionsPage } from "../pages/AttractionsPage";
import { AttractionDetailsPage } from "../pages/AttractionDetailsPage";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { TermsPage } from "../pages/TermsPage";
import { LoginPage } from "../pages/LoginPage";
import { SearchPage } from "../pages/SearchPage";
import { NotFoundPage } from "../pages/NotFoundPage";

const {
  home,
  countries,
  countryDetails,
  cities,
  cityDetails,
  attractions,
  attractionDetails,
  about,
  contact,
  privacy,
  terms,
  login,
  search,
  notFound,
} = ROUTES;

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={home} element={<HomePage />} />
        <Route path={countries} element={<CountriesPage />} />
        <Route path={countryDetails} element={<CountryDetailsPage />} />
        <Route path={cities} element={<CitiesPage />} />
        <Route path={cityDetails} element={<CityDetailsPage />} />
        <Route path={attractions} element={<AttractionsPage />} />
        <Route path={attractionDetails} element={<AttractionDetailsPage />} />
        <Route path={about} element={<AboutPage />} />
        <Route path={contact} element={<ContactPage />} />
        <Route path={privacy} element={<PrivacyPage />} />
        <Route path={terms} element={<TermsPage />} />
        <Route path={search} element={<SearchPage />} />
        <Route path={login} element={<LoginPage />} />
        <Route path={notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
