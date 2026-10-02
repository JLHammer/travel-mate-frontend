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
    logo: "2.5rem",
    heroText: "1rem",
    toggle: "1rem",
    formText: "1rem",
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
    heroHeight: "16.875rem",
    heroTextWidth: "min(100%, 23.75rem)",
    searchBarWidth: "min(100%, 25rem)",
    searchBarHeight: "3rem",
    buttonHeight: "2.5rem",
    navItemHeight: "2.5rem",
    favoriteButtonSize: "2rem",
    pillHeight: "2.25rem",
    cardImageHeight: "6.25rem",
    cardImageHeightLarge: "10rem",
    detailsImageHeight: "21.25rem",
    mapHeight: "21.875rem",
    flagWidth: "1.75rem",
    flagWidthLarge: "3.5rem",
    socialIcon: "1.25rem",
    loader: "3rem",
  },
} satisfies ThemeBreakpointTokens;

const tablet = {
  ...mobile,
  fontSizes: {
    ...mobile.fontSizes,
  },
  sizes: {
    ...mobile.sizes,
  },
} satisfies ThemeBreakpointTokens;

const desktop = {
  ...tablet,
  fontSizes: {
    ...tablet.fontSizes,
  },
  sizes: {
    ...tablet.sizes,
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

  overlay: "rgba(255, 255, 255, 0.85)",
  overlaySoft: "rgba(255, 255, 255, 0.6)",

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

  overlay: "rgba(15, 23, 42, 0.75)",
  overlaySoft: "rgba(15, 23, 42, 0.5)",

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

const base = {
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
    round: "50%",
  },

  borders: {
    width: "1px",
    themeToggle: "2px",
    loader: "3px",
  },

  transitions: {
    fast: "150ms ease",
    normal: "250ms ease",
  },

  zIndices: {
    dropdown: 1,
    header: 5,
    modal: 10,
  },

  breakpoints,

  media: {
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    hover: `@media (hover: hover)`,
  },
} satisfies ThemeBase;

export const lightTheme = {
  ...base,
  mode: "light" as ThemeMode,
  colors: lightColors,
  shadows: lightShadows,
} satisfies Theme;

export const darkTheme = {
  ...base,
  mode: "dark" as ThemeMode,
  colors: darkColors,
  shadows: darkShadows,
} satisfies Theme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} satisfies Record<ThemeMode, Theme>;
