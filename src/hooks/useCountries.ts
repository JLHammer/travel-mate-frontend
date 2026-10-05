import { COUNTRIES_QUERY } from "../data/queries";
import type { Country, Language } from "../types";
import { useSanityQuery } from "./useSanityQuery";

export const useCountries = (lang: Language = "en") =>
  useSanityQuery<Country[]>(COUNTRIES_QUERY, { lang });
