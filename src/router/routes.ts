import { createSearchParams } from "react-router-dom";
import { LANGUAGES } from "../i18n/translations";
import type { Language } from "../types";

type Section =
  | "countries"
  | "cities"
  | "attractions"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "login"
  | "favorites"
  | "search";

// URL segment for each page in each language. ASCII only, so URLs never need percent-encoding
export const SEGMENTS: Record<Language, Record<Section, string>> = {
  da: {
    countries: "lande",
    cities: "byer",
    attractions: "sevaerdigheder",
    about: "om-os",
    contact: "kontakt",
    privacy: "privatliv",
    terms: "vilkaar",
    login: "log-ind",
    favorites: "favoritter",
    search: "soeg",
  },
  en: {
    countries: "countries",
    cities: "cities",
    attractions: "attractions",
    about: "about",
    contact: "contact",
    privacy: "privacy",
    terms: "terms",
    login: "login",
    favorites: "favorites",
    search: "search",
  },
  es: {
    countries: "paises",
    cities: "ciudades",
    attractions: "atracciones",
    about: "sobre-nosotros",
    contact: "contacto",
    privacy: "privacidad",
    terms: "terminos",
    login: "iniciar-sesion",
    favorites: "favoritos",
    search: "buscar",
  },
};

// Every path in one language, e.g. localizedPaths("da").country("italien") → "/lande/italien".
// The section names differ between languages, so the URL shows the language without a /da prefix
export const localizedPaths = (language: Language) => {
  const segment = SEGMENTS[language];
  const section = (key: Section) => `/${segment[key]}`;

  return {
    home: "/",
    countries: section("countries"),
    cities: section("cities"),
    attractions: section("attractions"),
    about: section("about"),
    contact: section("contact"),
    privacy: section("privacy"),
    terms: section("terms"),
    login: section("login"),
    favorites: section("favorites"),
    search: section("search"),
    country: (slug: string) => `${section("countries")}/${slug}`,
    city: (slug: string) => `${section("cities")}/${slug}`,
    attraction: (slug: string) => `${section("attractions")}/${slug}`,
    searchFor: (query: string) =>
      `${section("search")}?${createSearchParams({ q: query.trim() })}`,
  };
};

export const NAV_LINKS = ["home", "countries", "cities", "attractions", "about"] as const;

export const FOOTER_LINKS = ["about", "contact", "privacy", "terms"] as const;

const SECTIONS = Object.keys(SEGMENTS.en) as Section[];

// Which language and section a URL segment belongs to, e.g. "lande" → da/countries
const findSegment = (segment: string | undefined) => {
  for (const language of LANGUAGES.map(({ id }) => id)) {
    const section = SECTIONS.find((key) => SEGMENTS[language][key] === segment);
    if (section) return { language, section };
  }
  return null;
};

// The language a path is in, or null for pages without a section, like "/" and unknown paths
export const languageOfPath = (pathname: string) =>
  findSegment(pathname.split("/")[1])?.language ?? null;

// The same page in another language, e.g. /attractions/x?q=y → /sevaerdigheder/x?q=y.
// A slug is kept as it is, and the detail page then swaps it for the slug in the new language
export const translatePath = (url: string, language: Language) => {
  const [, segment, ...rest] = url.split("/");
  const match = findSegment(segment?.split(/[?#]/)[0]);
  if (!match) return url;

  const query = segment.slice(SEGMENTS[match.language][match.section].length);
  return ["", SEGMENTS[language][match.section] + query, ...rest].join("/");
};
