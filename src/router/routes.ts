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
  { path: home, label: "Home" },
  { path: countries, label: "Countries" },
  { path: cities, label: "Cities" },
  { path: attractions, label: "Attractions" },
  { path: about, label: "About" },
] as const;

export const FOOTER_LINKS = [
  { path: about, label: "About" },
  { path: contact, label: "Contact" },
  { path: privacy, label: "Privacy" },
  { path: terms, label: "Terms" },
] as const;

export const countryPath = (countrySlug: string) =>
  generatePath(ROUTES.countryDetails, { countrySlug });

export const cityPath = (citySlug: string) => generatePath(ROUTES.cityDetails, { citySlug });

export const attractionPath = (attractionSlug: string) =>
  generatePath(ROUTES.attractionDetails, { attractionSlug });
