import { COUNTRY_DETAIL_QUERY } from "../data/queries";
import type { CountryDetail, Language } from "../types";
import { useSanityQuery } from "./useSanityQuery";

export const useCountry = (slug: string | undefined, lang: Language = "en") =>
  useSanityQuery<CountryDetail | null>(COUNTRY_DETAIL_QUERY, { slug: slug ?? "", lang });
