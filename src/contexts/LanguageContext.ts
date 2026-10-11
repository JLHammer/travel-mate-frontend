import { createContext } from "react";
import type { Language } from "../types";

// The current page's path in each language, like { da: "/lande/italien", en: "/countries/italy" }
export type AlternatePaths = Partial<Record<Language, string>>;

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  setAlternatePaths: (paths: AlternatePaths | null) => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
