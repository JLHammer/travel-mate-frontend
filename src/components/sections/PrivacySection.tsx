import { useTranslation } from "../../hooks/useTranslation";
import { LegalSection } from "./LegalSection";

export const PrivacySection = () => {
  const { t } = useTranslation();

  return <LegalSection title={t.nav.privacy} content={t.privacy} />;
};
