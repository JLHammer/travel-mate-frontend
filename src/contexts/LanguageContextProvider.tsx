import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { LANGUAGES } from "../i18n/translations";
import type { Language } from "../types";
import type { ProviderProps } from "./ThemeModeProvider";

const STORAGE_KEY = "language";
const DEFAULT_LANGUAGE: Language = "da";

const isLanguage = (value: string | null | undefined): value is Language =>
  LANGUAGES.some(({ id }) => id === value);

const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {}
  const browser = navigator.languages
    .map((tag) => tag.split("-")[0].toLowerCase())
    .find(isLanguage);
  return browser ?? DEFAULT_LANGUAGE;
};

export const LanguageContextProvider = ({ children }: ProviderProps) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {}
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
