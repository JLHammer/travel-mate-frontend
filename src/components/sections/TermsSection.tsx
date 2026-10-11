import { useTranslation } from "../../hooks/useTranslation";
import { LegalSection } from "./LegalSection";

export const TermsSection = () => {
  const { t } = useTranslation();

  return <LegalSection id="termsPage" title={t.nav.terms} />;
};
