import { Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { SEGMENTS } from "./routes";
import { LANGUAGES } from "../i18n/translations";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../components/layout/MainLayout";
import { HomePage } from "../pages/HomePage";

// The home page is where most visits start, so it's in the main bundle
// The rest load when they're opened, so the first visit downloads less
const CountriesPage = lazy(() =>
  import("../pages/CountriesPage").then((m) => ({ default: m.CountriesPage })),
);
const CountryDetailsPage = lazy(() =>
  import("../pages/CountryDetailsPage").then((m) => ({ default: m.CountryDetailsPage })),
);
const CitiesPage = lazy(() =>
  import("../pages/CitiesPage").then((m) => ({ default: m.CitiesPage })),
);
const CityDetailsPage = lazy(() =>
  import("../pages/CityDetailsPage").then((m) => ({ default: m.CityDetailsPage })),
);
const AttractionsPage = lazy(() =>
  import("../pages/AttractionsPage").then((m) => ({ default: m.AttractionsPage })),
);
const AttractionDetailsPage = lazy(() =>
  import("../pages/AttractionDetailsPage").then((m) => ({ default: m.AttractionDetailsPage })),
);
const AboutPage = lazy(() => import("../pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() =>
  import("../pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const PrivacyPage = lazy(() =>
  import("../pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })),
);
const TermsPage = lazy(() => import("../pages/TermsPage").then((m) => ({ default: m.TermsPage })));
const LoginPage = lazy(() => import("../pages/LoginPage").then((m) => ({ default: m.LoginPage })));
const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage").then((m) => ({ default: m.FavoritesPage })),
);
const SearchPage = lazy(() =>
  import("../pages/SearchPage").then((m) => ({ default: m.SearchPage })),
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

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
