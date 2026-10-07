import { useTranslation } from "../../hooks/useTranslation";
import { LegalSection } from "./LegalSection";

export const TermsSection = () => {
  const { t } = useTranslation();

  return <LegalSection title={t.nav.terms} content={t.terms} />;
};
