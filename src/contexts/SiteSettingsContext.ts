import { createContext } from "react";
import type { NavItem } from "../types";

export type SiteSettingsContextValue = {
  headerLinks: NavItem[];
  footerLinks: NavItem[];
};

export const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);
