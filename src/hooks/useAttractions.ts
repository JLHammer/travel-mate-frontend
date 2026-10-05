import { ATTRACTIONS_QUERY } from "../data/queries";
import type { Attraction, Language } from "../types";
import { useSanityQuery } from "./useSanityQuery";

export const useAttractions = (lang: Language = "en") =>
  useSanityQuery<Attraction[]>(ATTRACTIONS_QUERY, { lang });
