import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeModeProvider } from "./contexts/ThemeModeProvider.tsx";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      {/* Inside ThemeModeProvider, since it uses the theme colors */}
      <GlobalStyle />
      <App />
    </ThemeModeProvider>
  </StrictMode>,
);
