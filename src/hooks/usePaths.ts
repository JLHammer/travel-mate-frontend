import { useMemo } from "react";
import { localizedPaths } from "../router/routes";
import { useLanguage } from "./useLanguage";

// All paths in the current language, like paths.countries → "/lande"
export const usePaths = () => {
  const { language } = useLanguage();
  return useMemo(() => localizedPaths(language), [language]);
};
