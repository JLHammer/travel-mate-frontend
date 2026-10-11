import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageContext, type AlternatePaths } from "./LanguageContext";
import { isLanguage } from "../i18n/translations";
import { languageOfPath, translatePath } from "../router/routes";
import type { Language } from "../types";
import type { ProviderProps } from "./ThemeModeProvider";

const STORAGE_KEY = "language";
const DEFAULT_LANGUAGE: Language = "da";

// Used on pages whose URL has no section, like "/" and 404s
const getPreferredLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {}
  const browser = navigator.languages
    .map((tag) => tag.split("-")[0].toLowerCase())
    .find(isLanguage);
  return browser ?? DEFAULT_LANGUAGE;
};

// Language comes from the section name in the URL (/lande is Danish), so links and reloads keep it
export const LanguageContextProvider = ({ children }: ProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [preferred, setPreferred] = useState<Language>(getPreferredLanguage);
  const [alternatePaths, setAlternatePaths] = useState<AlternatePaths | null>(null);

  const fromUrl = languageOfPath(location.pathname);
  const language = fromUrl ?? preferred;
  // Remember the language so "/" stays in it afterwards
  if (fromUrl && fromUrl !== preferred) setPreferred(fromUrl);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {}
  }, [language]);

  // Go to the same page in the other language
  // Detail pages know their exact path, other pages only swap the section, and "/" stays the same
  const setLanguage = useCallback(
    (next: Language) => {
      setPreferred(next);
      const current = location.pathname + location.search;
      const target = alternatePaths?.[next] ?? translatePath(current, next);
      if (target === current) return;

      const state = location.state as { from?: string } | null;
      navigate(target, {
        // Keep the login redirect, in the new language too
        state: state?.from ? { ...state, from: translatePath(state.from, next) } : state,
      });
    },
    [alternatePaths, location, navigate],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, setAlternatePaths }}>
      {children}
    </LanguageContext.Provider>
  );
};
