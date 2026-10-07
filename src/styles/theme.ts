import type {
  Theme,
  ThemeBase,
  ThemeBreakpointTokens,
  ThemeColors,
  ThemeMode,
  ThemeShadows,
} from "../types";

const breakpoints = {
  tablet: "768px",
  desktop: "1024px",
} satisfies ThemeBase["breakpoints"];

const mobile = {
  fontSizes: {
    body: "0.875rem",
    h1: "2.625rem",
    h2: "1.25rem",
    h3: "1rem",
    logo: "1.625rem",
    footerLogo: "1.375rem",
    footerText: "0.8125rem",
    heroText: "1rem",
    toggle: "0.875rem",
    navLink: "1rem",
    formText: "1rem",
    small: "0.75rem",
    detailsText: "1rem",
  },

  lineHeights: {
    body: "1.5",
    h1: "1.15",
    h2: "1.3",
    h3: "1.3",
    heroText: "1.3",
    detailsText: "1.65",
  },

  spacing: {
    xxs: "0.25rem",
    xs: "0.5rem",
    s: "0.75rem",
    m: "1rem",
    l: "1.5rem",
    xl: "2rem",
  },

  layout: {
    contentWidth: "min(100%, 78.125rem)",
  },

  sizes: {
    headerHeight: "3.75rem",
    heroHeight: "23.75rem",
    heroTextWidth: "min(100%, 23.75rem)",
    searchBarWidth: "min(100%, 25rem)",
    searchBarHeight: "3rem",
    buttonHeight: "2.5rem",
    navItemHeight: "2.5rem",
    favoriteButtonSize: "2.25rem",
    pillHeight: "2.75rem",
    logoIcon: "2.125rem",
    headerIcon: "1.5rem",
    headerChevron: "1rem",
    cardImageHeight: "6.25rem",
    cardImageHeightLarge: "10rem",
    detailsImageHeight: "14.5rem",
    mapHeight: "17.5rem",
    flagWidth: "1.75rem",
    flagWidthLarge: "3.5rem",
    socialIcon: "1.375rem",
    loader: "3rem",
    cardRowHeight: "11.75rem",
    carouselControlWidth: "2.75rem",
    carouselChevron: "1.25rem",
    carouselDot: "0.375rem",
    carouselDotActive: "1.125rem",
    cardMetaIcon: "0.75rem",
    favoriteIcon: "1.25rem",
    cardChevron: "1rem",
    linkIcon: "0.875rem",
    infoIconBox: "2.5rem",
    infoIcon: "1.25rem",
    formWidth: "min(100%, 40rem)",
    textareaHeight: "10rem",
    toastWidth: "22.25rem",
    toastCloseButton: "1.75rem",
    toastCloseIcon: "1.125rem",
  },
} satisfies ThemeBreakpointTokens;

const tablet = {
  ...mobile,
  fontSizes: {
    ...mobile.fontSizes,
  },
  sizes: {
    ...mobile.sizes,
    heroHeight: "16.875rem",
    detailsImageHeight: "21.25rem",
    mapHeight: "18.5rem",
    toastWidth: "38rem",
  },
} satisfies ThemeBreakpointTokens;

const desktop = {
  ...tablet,
  fontSizes: {
    ...tablet.fontSizes,
  },
  sizes: {
    ...tablet.sizes,
    searchBarWidth: "min(100%, 32rem)",
    mapHeight: "21.875rem",
  },
} satisfies ThemeBreakpointTokens;

const lightColors = {
  primary: "#1268e9",
  primaryHover: "#0f57c5",
  primarySoft: "#e6f0fd",
  contrast: "#152f4c",
  contrastHover: "#0e2238",
  accent: "#fbbf24",

  background: "#f8fafc",
  surface: "#ffffff",
  surfaceMuted: "#f1f5f9",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",

  headingText: "#0f2440",
  bodyText: "#475569",
  mutedText: "#64748b",
  placeholder: "#94a3b8",
  onPrimary: "#ffffff",
  onContrast: "#ffffff",

  overlay: "rgba(15, 23, 42, 0.35)",
  overlaySoft: "rgba(255, 255, 255, 0.75)",
  overlaySoftBorder: "rgba(255, 255, 255, 0.6)",
  scrim: "rgba(8, 18, 32, 0.7)",
  onScrim: "#ffffff",

  error: "#b91c1c",
  success: "#15803d",
  successSoft: "#d1f0d6",

  badges: {
    historical: { background: "#fdeed2", text: "#b45309" },
    museum: { background: "#e8d9fe", text: "#6d28d9" },
    park: { background: "#d1f0d6", text: "#15803d" },
    attraction: { background: "#cfe0fe", text: "#1d4ed8" },
    landmark: { background: "#fcdcda", text: "#b91c1c" },
  },
} satisfies ThemeColors;

const darkColors = {
  primary: "#3b82f6",
  primaryHover: "#60a5fa",
  primarySoft: "#172b4d",
  contrast: "#e2e8f0",
  contrastHover: "#f8fafc",
  accent: "#f59e0b",

  background: "#0b1220",
  surface: "#111a2b",
  surfaceMuted: "#1b2536",
  border: "#243044",
  borderLight: "#1b2536",

  headingText: "#f1f5f9",
  bodyText: "#cbd5e1",
  mutedText: "#94a3b8",
  placeholder: "#64748b",
  onPrimary: "#ffffff",
  onContrast: "#0f2440",

  overlay: "rgba(0, 0, 0, 0.4)",
  overlaySoft: "rgba(15, 23, 42, 0.72)",
  overlaySoftBorder: "rgba(255, 255, 255, 0.12)",
  scrim: "rgba(0, 0, 0, 0.75)",
  onScrim: "#ffffff",

  error: "#fca5a5",
  success: "#86efac",
  successSoft: "#11341f",

  badges: {
    historical: { background: "#3d2a0f", text: "#fbbf24" },
    museum: { background: "#2e1f5e", text: "#c4b5fd" },
    park: { background: "#11341f", text: "#86efac" },
    attraction: { background: "#172b4d", text: "#93c5fd" },
    landmark: { background: "#3f1717", text: "#fca5a5" },
  },
} satisfies ThemeColors;

const lightShadows = {
  header: "0 1px 3px rgba(15, 36, 64, 0.08)",
  card: "0 1px 3px rgba(15, 36, 64, 0.06)",
  cardHover: "0 8px 20px rgba(15, 36, 64, 0.12)",
  search: "0 8px 24px rgba(15, 36, 64, 0.14)",
} satisfies ThemeShadows;

const darkShadows = {
  header: "0 1px 3px rgba(0, 0, 0, 0.4)",
  card: "0 1px 3px rgba(0, 0, 0, 0.35)",
  cardHover: "0 8px 20px rgba(0, 0, 0, 0.5)",
  search: "0 8px 24px rgba(0, 0, 0, 0.55)",
} satisfies ThemeShadows;

export const tokens = {
  fonts: {
    heading: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  mobile,
  tablet,
  desktop,

  radii: {
    inset: "6px",
    badge: "6px",
    button: "10px",
    input: "10px",
    card: "10px",
    panel: "14px",
    pill: "999px",
  },

  borders: {
    width: "1px",
    themeToggle: "2px",
    loader: "3px",
    focus: "2px",
  },

  transitions: {
    fast: "150ms ease",
    normal: "250ms ease",
  },

  zIndices: {
    dropdown: 1,
    carouselControl: 1,
    cardAction: 2,
    header: 5,
    modal: 10,
    skipLink: 20,
  },

  breakpoints,

  media: {
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    tabletOnly: `@media (${breakpoints.tablet} <= width < ${breakpoints.desktop})`,
    hover: `@media (hover: hover)`,
  },
} satisfies ThemeBase;

export const lightTheme = {
  ...tokens,
  mode: "light" as ThemeMode,
  colors: lightColors,
  shadows: lightShadows,
} satisfies Theme;

export const darkTheme = {
  ...tokens,
  mode: "dark" as ThemeMode,
  colors: darkColors,
  shadows: darkShadows,
} satisfies Theme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} satisfies Record<ThemeMode, Theme>;
