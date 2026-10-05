import { ATTRACTION_DETAIL_QUERY } from "../data/queries";
import type { AttractionDetail, Language } from "../types";
import { useSanityQuery } from "./useSanityQuery";

export const useAttraction = (slug: string | undefined, lang: Language = "en") =>
  useSanityQuery<AttractionDetail | null>(ATTRACTION_DETAIL_QUERY, { slug: slug ?? "", lang });
