import { SiteSettingsContext } from "./SiteSettingsContext";
import { SITE_SETTINGS_QUERY } from "../data/queries";
import { useLanguage } from "../hooks/useLanguage";
import { useSanityQuery } from "../hooks/useSanityQuery";
import { DEFAULT_FOOTER_LINKS, DEFAULT_HEADER_LINKS } from "../router/routes";
import type { NavItem, SiteSettingsResult, SitePage } from "../types";
import type { ProviderProps } from "./ThemeModeProvider";

type NavLinks = NonNullable<SiteSettingsResult["navigation"]>["header"];

// The editor's links, or the defaults if there's no navigation document.
// The Studio requires a page on every link, but a half-made one could still be published without
const toNavItems = (links: NavLinks, defaults: SitePage[]): NavItem[] =>
  links
    ? links.filter((link): link is NavItem => link.page !== null)
    : defaults.map((page) => ({ _key: page, page, label: null }));

// Fetches the content shown on every page once, instead of once per menu
export const SiteSettingsProvider = ({ children }: ProviderProps) => {
  const { language } = useLanguage();
  const { data, isLoading } = useSanityQuery<SiteSettingsResult>(SITE_SETTINGS_QUERY, {
    lang: language,
  });

  // Empty while loading, so the menus don't flash the default order before the editor's order.
  // If Sanity can't be reached, the default menus keep the site usable
  const navigation = data?.navigation;
  const headerLinks = isLoading ? [] : toNavItems(navigation?.header ?? null, DEFAULT_HEADER_LINKS);
  const footerLinks = isLoading ? [] : toNavItems(navigation?.footer ?? null, DEFAULT_FOOTER_LINKS);

  return (
    <SiteSettingsContext.Provider value={{ headerLinks, footerLinks }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
