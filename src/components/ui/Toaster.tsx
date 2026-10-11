import type { CSSProperties } from "react";
import { X } from "lucide-react";
import { Toaster as SonnerToaster } from "sonner";
import { createGlobalStyle, useTheme } from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";

// Sonner sets --width inline, so point it at a variable we can change per breakpoint
const ToasterGlobalStyle = createGlobalStyle`
  [data-sonner-toaster] {
    --toast-width: ${tokens.mobile.sizes.toastWidth};

    ${tokens.media.tablet} {
      --toast-width: ${tokens.tablet.sizes.toastWidth};
    }
  }

  [data-sonner-toast] [data-title],
  [data-sonner-toast] [data-description] {
    text-wrap: balance;
  }

  /* One step more specific than Sonner's selectors, so these win no matter which stylesheet loads last */
  [data-sonner-toaster] [data-sonner-toast][data-styled="true"] {
    padding-right: calc(${tokens.mobile.spacing.xs} * 2 + ${tokens.mobile.sizes.toastCloseButton});
  }

  /* Plain X in the text color, error color on hover */
  [data-sonner-toaster] [data-sonner-toast][data-styled="true"] button[data-close-button] {
    left: auto;
    right: ${tokens.mobile.spacing.xs};
    top: 50%;
    transform: translateY(-50%);
    width: ${tokens.mobile.sizes.toastCloseButton};
    height: ${tokens.mobile.sizes.toastCloseButton};
    border: none;
    border-radius: ${tokens.radii.inset};
    background: transparent;
    color: inherit;
    box-shadow: none;
    transition: color ${tokens.transitions.fast};

    & > svg {
      width: ${tokens.mobile.sizes.toastCloseIcon};
      height: ${tokens.mobile.sizes.toastCloseIcon};
    }
  }

  [data-sonner-toaster] [data-sonner-toast][data-styled="true"] button[data-close-button]:hover {
    border: none;
    background: transparent;

    ${tokens.media.hover} {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const Toaster = () => {
  const { mode } = useThemeMode();
  const { t } = useTranslation();
  const { colors, shadows } = useTheme();

  const style = {
    "--normal-bg": colors.surface,
    "--normal-text": colors.headingText,
    "--normal-border": colors.border,
    "--success-bg": colors.successSoft,
    "--success-text": colors.success,
    "--success-border": colors.success,
    "--error-bg": colors.surface,
    "--error-text": colors.error,
    "--error-border": colors.error,
    "--info-bg": colors.primarySoft,
    "--info-text": colors.primary,
    "--info-border": colors.primary,
    "--border-radius": tokens.radii.panel,
    "--width": "var(--toast-width)",
  } as CSSProperties;

  return (
    <>
      <ToasterGlobalStyle />
      <SonnerToaster
        theme={mode}
        position="bottom-center"
        richColors
        closeButton
        icons={{ close: <X strokeWidth={2.5} /> }}
        style={style}
        toastOptions={{
          closeButtonAriaLabel: t.toast.close,
          style: {
            fontFamily: tokens.fonts.body,
            fontSize: tokens.mobile.fontSizes.formText,
            boxShadow: shadows.search,
          },
        }}
      />
    </>
  );
};
