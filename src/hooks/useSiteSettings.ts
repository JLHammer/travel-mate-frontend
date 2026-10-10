import { useContext } from "react";
import { SiteSettingsContext } from "../contexts/SiteSettingsContext";

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used inside a SiteSettingsProvider");
  }
  return context;
};
