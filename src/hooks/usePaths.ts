import { useMemo } from "react";
import { localizedPaths } from "../router/routes";
import { useLanguage } from "./useLanguage";

// Every path in the current language, e.g. paths.countries → "/da/lande"
export const usePaths = () => {
  const { language } = useLanguage();
  return useMemo(() => localizedPaths(language), [language]);
};
