import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LANGUAGES } from "../i18n/translations";
import { localizedPaths } from "../router/routes";
import { useLanguage } from "./useLanguage";
import type { AlternatePaths } from "../contexts/LanguageContext";
import type { Language } from "../types";

type DetailPage = "country" | "city" | "attraction";

// Tells the language toggle where this detail page lives in the other languages.
// Returns the path to redirect to when the page was opened with another language's slug, else null
export const useLocalizedSlug = (
  slugs: Record<Language, string | null> | null | undefined,
  page: DetailPage,
) => {
  const { language, setAlternatePaths } = useLanguage();
  const { pathname } = useLocation();

  const alternatePaths = useMemo(() => {
    if (!slugs) return null;
    const paths: AlternatePaths = {};
    for (const { id } of LANGUAGES) {
      const slug = slugs[id];
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
