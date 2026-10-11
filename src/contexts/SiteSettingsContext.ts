import { createContext } from "react";
import type { NavItem, SocialLink } from "../types";

export type SiteSettingsContextValue = {
  headerLinks: NavItem[];
  footerLinks: NavItem[];
  footerTagline: string | null;
  socials: SocialLink[];
};

export const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);
