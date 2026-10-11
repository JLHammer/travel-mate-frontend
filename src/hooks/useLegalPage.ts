import { LEGAL_PAGE_QUERY } from "../data/queries";
import type { LegalPageData } from "../types";
import { useLanguage } from "./useLanguage";
import { useSanityQuery } from "./useSanityQuery";

// Privacy policy and terms are two documents of the same type in the Studio
export type LegalPageId = "privacyPage" | "termsPage";

export const useLegalPage = (id: LegalPageId) => {
  const { language } = useLanguage();
  return useSanityQuery<LegalPageData | null>(LEGAL_PAGE_QUERY, { id, lang: language });
};
