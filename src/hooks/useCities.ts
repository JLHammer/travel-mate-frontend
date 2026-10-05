import { CITIES_QUERY } from "../data/queries";
import type { City, Language } from "../types";
import { useSanityQuery } from "./useSanityQuery";

export const useCities = (lang: Language = "en") => useSanityQuery<City[]>(CITIES_QUERY, { lang });
