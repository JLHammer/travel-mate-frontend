import { HOME_PAGE_QUERY } from "../data/queries";
import type { HomePageData } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useHomePage = () => {
  const { language } = useLanguage();
  return useSanityQuery<HomePageData | null>(HOME_PAGE_QUERY, { lang: language });
};
