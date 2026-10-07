import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeModeProvider } from "./contexts/ThemeModeProvider.tsx";
import { LanguageContextProvider } from "./contexts/LanguageContextProvider.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageContextProvider>
      <ThemeModeProvider>
        {/* Inside ThemeModeProvider, since it uses the theme colors */}
        <GlobalStyle />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeModeProvider>
    </LanguageContextProvider>
  </StrictMode>,
);
