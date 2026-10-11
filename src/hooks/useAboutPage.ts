import { ABOUT_PAGE_QUERY } from "../data/queries";
import type { AboutPageData } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useAboutPage = () => {
  const { language } = useLanguage();
  return useSanityQuery<AboutPageData | null>(ABOUT_PAGE_QUERY, { lang: language });
};
