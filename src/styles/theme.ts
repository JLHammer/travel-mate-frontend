export type ThemeMode = "light" | "dark";

export type BadgeCategory =
  "historical" | "museum" | "park" | "attraction" | "landmark";

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primarySoft: string;
  contrast: string;
  contrastHover: string;
  accent: string;

  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderLight: string;

  text: {
    heading: string;
    body: string;
    muted: string;
    placeholder: string;
    onPrimary: string;
    onContrast: string;
  };

  badge: Record<BadgeCategory, { background: string; text: string }>;

  overlay: string;
  overlaySoft: string;
}

export interface ThemeShadows {
  header: string;
  card: string;
  cardHover: string;
  search: string;
}

const lightColors: ThemeColors = {
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

  text: {
    heading: "#0f2440",
    body: "#475569",
    muted: "#64748b",
    placeholder: "#94a3b8",
    onPrimary: "#ffffff",
    onContrast: "#ffffff",
  },

  badge: {
    historical: { background: "#fdeed2", text: "#b45309" },
    museum: { background: "#e8d9fe", text: "#6d28d9" },
    park: { background: "#d1f0d6", text: "#15803d" },
    attraction: { background: "#cfe0fe", text: "#1d4ed8" },
    landmark: { background: "#fcdcda", text: "#b91c1c" },
  },

  overlay: "rgba(255, 255, 255, 0.85)",
  overlaySoft: "rgba(255, 255, 255, 0.6)",
};

const darkColors: ThemeColors = {
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

  text: {
    heading: "#f1f5f9",
    body: "#cbd5e1",
    muted: "#94a3b8",
    placeholder: "#64748b",
    onPrimary: "#ffffff",
    onContrast: "#0f2440",
  },

  badge: {
    historical: { background: "#3d2a0f", text: "#fbbf24" },
    museum: { background: "#2e1f5e", text: "#c4b5fd" },
    park: { background: "#11341f", text: "#86efac" },
    attraction: { background: "#172b4d", text: "#93c5fd" },
    landmark: { background: "#3f1717", text: "#fca5a5" },
  },

  overlay: "rgba(15, 23, 42, 0.75)",
  overlaySoft: "rgba(15, 23, 42, 0.5)",
};

const lightShadows: ThemeShadows = {
  header: "0 0.0625rem 0.1875rem rgba(15, 36, 64, 0.08)",
  card: "0 0.0625rem 0.1875rem rgba(15, 36, 64, 0.06)",
  cardHover: "0 0.5rem 1.25rem rgba(15, 36, 64, 0.12)",
  search: "0 0.5rem 1.5rem rgba(15, 36, 64, 0.14)",
};

const darkShadows: ThemeShadows = {
  header: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.4)",
  card: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.35)",
  cardHover: "0 0.5rem 1.25rem rgba(0, 0, 0, 0.5)",
  search: "0 0.5rem 1.5rem rgba(0, 0, 0, 0.55)",
};

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

  lineHeights: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
  },

  fontSizes: {
    xs: "0.875rem",
    s: "1rem",
    m: "1.25rem",
    l: "1.5rem",
    xl: "1.875rem",
    xxl: "2.625rem",
  },

  spacing: {
    xxs: "0.25rem",
    xs: "0.5rem",
    s: "0.75rem",
    m: "1rem",
    l: "1.5rem",
    xl: "2rem",
  },

  sizes: {
    headerHeight: "3.75rem",
    heroHeight: "16.875rem",
    searchBarHeight: "3rem",
    buttonHeight: "2.5rem",
    navItemHeight: "2.5rem",
    iconButtonSize: "2rem",
    pillHeight: "2.25rem",
    cardImageHeight: "6.25rem",
    cardImageHeightLarge: "10rem",
    detailImageHeight: "21.25rem",
    mapHeight: "21.875rem",
    flagWidth: "1.75rem",
    flagWidthLarge: "3.5rem",
  },

  maxWidths: {
    content: "78.125rem",
    heroText: "23.75rem",
  },

  radii: {
    s: "0.375rem",
    m: "0.625rem",
    l: "0.875rem",
    pill: "9999rem",
    round: "50%",
  },

  transitions: {
    fast: "150ms ease",
    normal: "250ms ease",
  },

  breakpoints: {
    mobile: "30rem",
    tablet: "48rem",
    desktop: "64rem",
  },
};

type Base = typeof base;

export interface Theme extends Base {
  mode: ThemeMode;
  colors: ThemeColors;
  shadows: ThemeShadows;
}

export const lightTheme: Theme = {
  ...base,
  mode: "light",
  colors: lightColors,
  shadows: lightShadows,
};

export const darkTheme: Theme = {
  ...base,
  mode: "dark",
  colors: darkColors,
  shadows: darkShadows,
};

export const themes: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const theme = lightTheme;
