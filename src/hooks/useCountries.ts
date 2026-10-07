import { COUNTRIES_QUERY } from "../data/queries";
import type { Country } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useCountries = () => {
  const { language } = useLanguage();
  return useSanityQuery<Country[]>(COUNTRIES_QUERY, { lang: language });
};
