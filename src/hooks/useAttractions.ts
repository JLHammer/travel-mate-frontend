import { ATTRACTIONS_QUERY } from "../data/queries";
import type { Attraction } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

export const useAttractions = () => {
  const { language } = useLanguage();
  return useSanityQuery<Attraction[]>(ATTRACTIONS_QUERY, { lang: language });
};
