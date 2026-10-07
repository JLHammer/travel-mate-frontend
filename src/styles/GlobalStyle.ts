import { createGlobalStyle } from "styled-components";
import { preflight } from "./preflight";
import { tokens } from "./theme";

export const GlobalStyle = createGlobalStyle`
  ${preflight}

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    ::before,
    ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    font-family: ${tokens.fonts.body};
    font-size: ${tokens.mobile.fontSizes.body};
    color: ${({ theme }) => theme.colors.bodyText};
  }

  #root {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  :focus-visible {
    outline: ${tokens.borders.focus} solid ${({ theme }) => theme.colors.primary};
    outline-offset: ${tokens.borders.focus};
  }

  main:focus {
    outline: none;
  }

  section {
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${tokens.fonts.heading};
    color: ${({ theme }) => theme.colors.headingText};
    text-wrap: balance;
  }

  h1 {
    font-size: ${tokens.mobile.fontSizes.h1};
    font-weight: ${tokens.fontWeights.bold};
    line-height: ${tokens.mobile.lineHeights.h1};
  }

  h2 {
    font-size: ${tokens.mobile.fontSizes.h2};
    font-weight: ${tokens.fontWeights.bold};
    line-height: ${tokens.mobile.lineHeights.h2};
  }

  h3 {
    font-size: ${tokens.mobile.fontSizes.h3};
    font-weight: ${tokens.fontWeights.semibold};
    line-height: ${tokens.mobile.lineHeights.h3};
  }

  p {
    text-wrap: pretty;
  }

  a {
    text-decoration: underline;
  }
`;
