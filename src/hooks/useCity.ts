import { CITY_DETAIL_QUERY } from "../data/queries";
import type { CityDetail, Language } from "../types";
import { useSanityQuery } from "./useSanityQuery";

export const useCity = (slug: string | undefined, lang: Language = "en") =>
  useSanityQuery<CityDetail | null>(CITY_DETAIL_QUERY, { slug: slug ?? "", lang });
