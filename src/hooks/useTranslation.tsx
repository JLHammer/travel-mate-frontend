import { translations } from "../i18n/translations";
import { useLanguage } from "./useLanguage";

export const useTranslation = () => {
  const { language } = useLanguage();
  return { t: translations[language], language };
};
