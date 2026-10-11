import { useTranslation } from "../../hooks/useTranslation";
import { LegalSection } from "./LegalSection";

export const PrivacySection = () => {
  const { t } = useTranslation();

  return <LegalSection id="privacyPage" title={t.nav.privacy} />;
};
