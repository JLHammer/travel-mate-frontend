import { generatePath } from "react-router-dom";

export const ROUTES = {
  home: "/",
  countries: "/countries",
  countryDetails: "/countries/:countrySlug",
  cities: "/cities",
  cityDetails: "/cities/:citySlug",
  attractions: "/attractions",
  attractionDetails: "/attractions/:attractionSlug",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  notFound: "*",
} as const;

const { home, countries, cities, attractions, about, contact, privacy, terms } = ROUTES;

export const NAV_LINKS = [
  { path: home, key: "home" },
  { path: countries, key: "countries" },
  { path: cities, key: "cities" },
  { path: attractions, key: "attractions" },
  { path: about, key: "about" },
] as const;

export const FOOTER_LINKS = [
  { path: about, key: "about" },
  { path: contact, key: "contact" },
  { path: privacy, key: "privacy" },
  { path: terms, key: "terms" },
] as const;

export const countryPath = (countrySlug: string) =>
  generatePath(ROUTES.countryDetails, { countrySlug });

export const cityPath = (citySlug: string) => generatePath(ROUTES.cityDetails, { citySlug });

export const attractionPath = (attractionSlug: string) =>
  generatePath(ROUTES.attractionDetails, { attractionSlug });
