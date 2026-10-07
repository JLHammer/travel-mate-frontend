import { CITIES_QUERY } from "../data/queries";
import type { City } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useCities = () => {
  const { language } = useLanguage();
  return useSanityQuery<City[]>(CITIES_QUERY, { lang: language });
};
