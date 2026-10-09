import { createContext } from "react";
import type { Language } from "../types";

// Where the current page lives in each language, e.g. { da: "/da/lande/italien", en: "/en/countries/italy" }
export type AlternatePaths = Partial<Record<Language, string>>;

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  setAlternatePaths: (paths: AlternatePaths | null) => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
