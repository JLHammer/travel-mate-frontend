import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "../../../hooks/useLanguage";
import { useTranslation } from "../../../hooks/useTranslation";
import { LANGUAGES } from "../../../i18n/translations";
import type { Language } from "../../../types";
import { tokens } from "../../../styles/theme";

const LanguageWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const LanguagePill = styled.button<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 100%;
  border: ${tokens.borders.themeToggle} solid ${({ theme }) => theme.colors.primarySoft};
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme, $open }) => theme.colors[$open ? "headingText" : "surfaceMuted"]};
  color: ${({ theme, $open }) => theme.colors[$open ? "surfaceMuted" : "headingText"]};
  font-weight: ${tokens.fontWeights.semibold};
  text-transform: uppercase;
  transition:
    background-color ${tokens.transitions.fast},
    color ${tokens.transitions.fast};

  gap: ${tokens.mobile.spacing.xs};
  padding: 0 ${tokens.mobile.spacing.s};
  font-size: ${tokens.mobile.fontSizes.toggle};

  ${tokens.media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.headingText};
      color: ${({ theme }) => theme.colors.surfaceMuted};
    }
  }
`;

const LanguageLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xxs};

  & > svg {
    width: ${tokens.mobile.sizes.headerIcon};
    height: ${tokens.mobile.sizes.headerIcon};
  }
`;

const Chevron = styled(ChevronDown)<{ $open: boolean }>`
  width: ${tokens.mobile.sizes.headerChevron};
  height: ${tokens.mobile.sizes.headerChevron};
  transition: transform ${tokens.transitions.fast};
  transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);
`;

const LanguageList = styled(motion.ul)`
  position: absolute;
  top: calc(100% + ${tokens.mobile.spacing.xxs});
  left: 0;
  z-index: ${tokens.zIndices.dropdown};
  min-width: 100%;
  padding: ${tokens.mobile.spacing.xxs};
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.card};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const LanguageOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xs};
  width: 100%;
  padding: ${tokens.mobile.spacing.xs} ${tokens.mobile.spacing.s};
  border-radius: ${tokens.radii.inset};
  color: ${({ theme, $selected }) => theme.colors[$selected ? "primary" : "headingText"]};
  font-size: ${tokens.mobile.fontSizes.toggle};
  font-weight: ${tokens.fontWeights.medium};
  white-space: nowrap;
  transition: background-color ${tokens.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const OptionCode = styled.span`
  text-transform: uppercase;
`;

const OptionLabel = styled.span`
  flex: 1;
  color: ${({ theme }) => theme.colors.mutedText};
  font-weight: ${tokens.fontWeights.regular};
`;

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Escape closes it too, so keyboard users aren't stuck with it open
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const select = (id: Language) => {
    setLanguage(id);
    setOpen(false);
  };

  return (
    <LanguageWrapper ref={wrapperRef}>
      {/* The label keeps the visible code in it, so voice control users can say what they see */}
      <LanguagePill
        type="button"
        $open={open}
        aria-label={`${t.nav.language}, ${language.toUpperCase()}`}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <LanguageLabel>
          <Globe aria-hidden />
          {language}
        </LanguageLabel>
        <Chevron $open={open} aria-hidden />
      </LanguagePill>

      <AnimatePresence>
        {open && (
          <LanguageList
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {LANGUAGES.map(({ id, title }) => (
              <li key={id}>
                <LanguageOption
                  type="button"
                  $selected={id === language}
                  aria-current={id === language}
                  lang={id}
                  onClick={() => select(id)}
                >
                  <OptionCode>{id}</OptionCode>
                  <OptionLabel>{title}</OptionLabel>
                  {id === language && <Check size={16} aria-hidden />}
                </LanguageOption>
              </li>
            ))}
          </LanguageList>
        )}
      </AnimatePresence>
    </LanguageWrapper>
  );
};
