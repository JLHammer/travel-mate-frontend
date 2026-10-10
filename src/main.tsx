import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeModeProvider } from "./contexts/ThemeModeProvider.tsx";
import { LanguageContextProvider } from "./contexts/LanguageContextProvider.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { LikesProvider } from "./contexts/LikesProvider.tsx";
import { SiteSettingsProvider } from "./contexts/SiteSettingsProvider.tsx";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Outside LanguageContextProvider, since the language comes from the URL */}
    <BrowserRouter>
      <LanguageContextProvider>
        <ThemeModeProvider>
          {/* Inside ThemeModeProvider, since it uses the theme colors */}
          <GlobalStyle />
          {/* Inside LanguageContextProvider, since the menus are fetched in the current language */}
          <SiteSettingsProvider>
            <AuthProvider>
              {/* Inside AuthProvider, since likes are saved per user */}
              <LikesProvider>
                <App />
              </LikesProvider>
            </AuthProvider>
          </SiteSettingsProvider>
        </ThemeModeProvider>
      </LanguageContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
