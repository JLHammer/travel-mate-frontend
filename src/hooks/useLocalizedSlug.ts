import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LANGUAGES } from "../i18n/translations";
import { localizedPaths } from "../router/routes";
import { useLanguage } from "./useLanguage";
import type { AlternatePaths } from "../contexts/LanguageContext";
import type { Language } from "../types";

type DetailPage = "country" | "city" | "attraction";

// Every language's slug, e.g. [{ language: "da", slug: "italien" }, { language: "en", slug: "italy" }]
type Slugs = { language: string | null; slug: string | null }[] | null | undefined;

// Tells the language toggle where this detail page lives in the other languages.
// Returns the path to redirect to when the page was opened with another language's slug, else null
export const useLocalizedSlug = (slugs: Slugs, page: DetailPage) => {
  const { language, setAlternatePaths } = useLanguage();
  const { pathname } = useLocation();

  const alternatePaths = useMemo(() => {
    if (!slugs) return null;
    const slugIn = (id: Language) => slugs.find((item) => item.language === id)?.slug;
    const paths: AlternatePaths = {};
    for (const { id } of LANGUAGES) {
      // Like the queries, use the English slug if the language has none
      const slug = slugIn(id) ?? slugIn("en");
      if (slug) paths[id] = localizedPaths(id)[page](slug);
    }
    return paths;
  }, [slugs, page]);

  useEffect(() => {
    setAlternatePaths(alternatePaths);
    return () => setAlternatePaths(null);
  }, [alternatePaths, setAlternatePaths]);

  const canonical = alternatePaths?.[language];
  return canonical && canonical !== pathname ? canonical : null;
};
