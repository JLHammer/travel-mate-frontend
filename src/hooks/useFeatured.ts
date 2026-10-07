import { FEATURED_QUERY } from "../data/queries";
import type { Featured } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useFeatured = () => {
  const { language } = useLanguage();
  return useSanityQuery<Featured>(FEATURED_QUERY, { lang: language });
};
