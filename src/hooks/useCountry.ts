import { COUNTRY_DETAIL_QUERY } from "../data/queries";
import type { CountryDetail } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useCountry = (slug: string | undefined) => {
  const { language } = useLanguage();
  return useSanityQuery<CountryDetail | null>(COUNTRY_DETAIL_QUERY, {
    slug: slug ?? "",
    lang: language,
  });
};
