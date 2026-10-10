export type ThemeMode = "light" | "dark";

export type BadgeCategory = "historical" | "museum" | "park" | "attraction" | "landmark";

export interface ThemeFontSizes {
  body: string;
  h1: string;
  h2: string;
  h3: string;
  logo: string;
  footerLogo: string;
  footerText: string;
  heroText: string;
  toggle: string;
  navLink: string;
  formText: string;
  small: string;
  detailsText: string;
}

export interface ThemeLineHeights {
  body: string;
  h1: string;
  h2: string;
  h3: string;
  heroText: string;
  detailsText: string;
}

export interface ThemeSpacing {
  xxs: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
}

export interface ThemeLayout {
  contentWidth: string;
}

export interface ThemeSizes {
  headerHeight: string;
  heroHeight: string;
  heroTextWidth: string;
  searchBarWidth: string;
  searchBarHeight: string;
  buttonHeight: string;
  navItemHeight: string;
  favoriteButtonSize: string;
  pillHeight: string;
  logoIcon: string;
  headerIcon: string;
  headerChevron: string;
  cardImageHeight: string;
  cardImageHeightLarge: string;
  detailsImageHeight: string;
  mapHeight: string;
  flagWidth: string;
  flagWidthLarge: string;
  socialIcon: string;
  loader: string;
  cardRowHeight: string;
  carouselControlWidth: string;
  carouselChevron: string;
  carouselDot: string;
  carouselDotActive: string;
  cardMetaIcon: string;
  favoriteIcon: string;
  cardChevron: string;
  linkIcon: string;
  infoIconBox: string;
  infoIcon: string;
  formWidth: string;
  textareaHeight: string;
  toastWidth: string;
  toastCloseButton: string;
  toastCloseIcon: string;
}

export interface ThemeBreakpointTokens {
  fontSizes: ThemeFontSizes;
  lineHeights: ThemeLineHeights;
  spacing: ThemeSpacing;
  layout: ThemeLayout;
  sizes: ThemeSizes;
}

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primarySoft: string;
  contrast: string;
  accent: string;

  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderLight: string;

  headingText: string;
  bodyText: string;
  mutedText: string;
  placeholder: string;
  onPrimary: string;

  overlay: string;
  overlaySoft: string;
  overlaySoftBorder: string;
  scrim: string;
  onScrim: string;

  error: string;
  success: string;
  successSoft: string;

  badges: Record<BadgeCategory, { background: string; text: string }>;
}

export interface ThemeShadows {
  header: string;
  card: string;
  cardHover: string;
  search: string;
  textOnImage: string;
}

export interface ThemeBase {
  fonts: {
    heading: string;
    body: string;
  };

  fontWeights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };

  mobile: ThemeBreakpointTokens;
  tablet: ThemeBreakpointTokens;
  desktop: ThemeBreakpointTokens;

  radii: {
    inset: string;
    badge: string;
    button: string;
    input: string;
    card: string;
    panel: string;
    pill: string;
  };

  borders: {
    width: string;
    themeToggle: string;
    loader: string;
    focus: string;
  };

  transitions: {
    fast: string;
    normal: string;
  };

  zIndices: {
    dropdown: number;
    carouselControl: number;
    cardAction: number;
    header: number;
    skipLink: number;
  };

  breakpoints: {
    tablet: string;
    desktop: string;
  };

  media: {
    tablet: string;
    desktop: string;
    tabletOnly: string;
    hover: string;
  };
}

export interface Theme extends ThemeBase {
  mode: ThemeMode;
  colors: ThemeColors;
  shadows: ThemeShadows;
}
