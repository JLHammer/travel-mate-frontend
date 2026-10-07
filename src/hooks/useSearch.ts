import { SEARCH_QUERY } from "../data/queries";
import type { SearchData } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useSearch = () => {
  const { language } = useLanguage();
  return useSanityQuery<SearchData>(SEARCH_QUERY, { lang: language });
};
