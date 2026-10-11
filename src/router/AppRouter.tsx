import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { SEGMENTS } from "./routes";
import { LANGUAGES } from "../i18n/translations";
import { ProtectedRoute } from "./ProtectedRoute";
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
import { FavoritesPage } from "../pages/FavoritesPage";
import { SearchPage } from "../pages/SearchPage";
import { NotFoundPage } from "../pages/NotFoundPage";

// Each language has its own section names, so /lande, /countries and /paises all show CountriesPage
export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {LANGUAGES.map(({ id }) => {
          const segment = SEGMENTS[id];

          return (
            <Fragment key={id}>
              <Route path={segment.countries} element={<CountriesPage />} />
              <Route path={`${segment.countries}/:countrySlug`} element={<CountryDetailsPage />} />
              <Route path={segment.cities} element={<CitiesPage />} />
              <Route path={`${segment.cities}/:citySlug`} element={<CityDetailsPage />} />
              <Route path={segment.attractions} element={<AttractionsPage />} />
              <Route
                path={`${segment.attractions}/:attractionSlug`}
                element={<AttractionDetailsPage />}
              />
              <Route path={segment.about} element={<AboutPage />} />
              <Route path={segment.contact} element={<ContactPage />} />
              <Route path={segment.privacy} element={<PrivacyPage />} />
              <Route path={segment.terms} element={<TermsPage />} />
              <Route path={segment.search} element={<SearchPage />} />
              <Route path={segment.login} element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path={segment.favorites} element={<FavoritesPage />} />
              </Route>
            </Fragment>
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
