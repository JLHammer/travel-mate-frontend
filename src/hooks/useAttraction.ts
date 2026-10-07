import { ATTRACTION_DETAIL_QUERY } from "../data/queries";
import type { AttractionDetail } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useAttraction = (slug: string | undefined) => {
  const { language } = useLanguage();
  return useSanityQuery<AttractionDetail | null>(ATTRACTION_DETAIL_QUERY, {
    slug: slug ?? "",
    lang: language,
  });
};
