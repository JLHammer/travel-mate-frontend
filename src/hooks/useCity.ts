import { CITY_DETAIL_QUERY } from "../data/queries";
import type { CityDetail } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useCity = (slug: string | undefined) => {
  const { language } = useLanguage();
  return useSanityQuery<CityDetail | null>(CITY_DETAIL_QUERY, { slug: slug ?? "", lang: language });
};
