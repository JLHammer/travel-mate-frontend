import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";

type Language = "da" | "en";

const LANGUAGES: { id: Language; title: string }[] = [
  { id: "da", title: "Dansk" },
  { id: "en", title: "English" },
];

const LanguageWrapper = styled.div`
  position: relative;
`;

const LanguagePill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: ${({ theme }) => theme.sizes.pillHeight};
  padding: 0 ${({ theme }) => theme.spacing.s};
  border-radius: ${({ theme }) => theme.radii.m};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.text.heading};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
`;

const Chevron = styled(ChevronDown)<{ $open: boolean }>`
  transition: transform ${({ theme }) => theme.transitions.fast};
  transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);
`;

const LanguageList = styled(motion.ul)`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xxs});
  left: 0;
  z-index: 1;
  min-width: 100%;
  padding: ${({ theme }) => theme.spacing.xxs};
  border: 0.0625rem solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.m};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const LanguageOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.s};
  border-radius: ${({ theme }) => theme.radii.s};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.text.heading};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  transition: background-color ${({ theme }) => theme.transitions.fast};

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
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<Language>("da");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const select = (id: Language) => {
    setLanguage(id);
    setOpen(false);
  };

  return (
    <LanguageWrapper ref={wrapperRef}>
      <LanguagePill type="button" onClick={() => setOpen((prev) => !prev)}>
        <Globe size={18} />
        {language}
        <Chevron size={16} $open={open} />
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
                  onClick={() => select(id)}
                >
                  <OptionCode>{id}</OptionCode>
                  <OptionLabel>{title}</OptionLabel>
                  {id === language && <Check size={16} />}
                </LanguageOption>
              </li>
            ))}
          </LanguageList>
        )}
      </AnimatePresence>
    </LanguageWrapper>
  );
};
