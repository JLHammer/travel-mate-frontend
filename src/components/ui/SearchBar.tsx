import { useRef, useState, type FormEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { usePaths } from "../../hooks/usePaths";
import { tokens } from "../../styles/theme";

const SearchBarStyled = styled.form`
  display: flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xs};
  width: 100%;
  max-width: ${tokens.mobile.sizes.searchBarWidth};
  height: ${tokens.mobile.sizes.searchBarHeight};
  padding: ${tokens.mobile.spacing.xxs};
  padding-left: ${tokens.mobile.spacing.m};
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.input};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.search};

  /* The input has no outline, so the focus ring goes on the whole bar */
  &:has(input:focus-visible) {
    outline: ${tokens.borders.focus} solid ${({ theme }) => theme.colors.primary};
    outline-offset: ${tokens.borders.focus};
  }

  ${tokens.media.desktop} {
    max-width: ${tokens.desktop.sizes.searchBarWidth};
  }
`;

const SearchBarIcon = styled(Search)`
  flex-shrink: 0;
  width: ${tokens.mobile.sizes.headerIcon};
  height: ${tokens.mobile.sizes.headerIcon};
  padding: ${tokens.mobile.spacing.xxs};
  color: ${({ theme }) => theme.colors.headingText};
`;

const SearchBarInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.bodyText};
  font-size: ${tokens.mobile.fontSizes.formText};
  text-overflow: ellipsis;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    text-overflow: ellipsis;
  }

  /* Replace the native clear button with an X in the theme's error color */
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    width: 1em;
    height: 1em;
    margin-left: ${tokens.mobile.spacing.xs};
    background-color: ${({ theme }) => theme.colors.error};
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M18 6 6 18M6 6l12 12'/%3E%3C/svg%3E")
      center / contain no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M18 6 6 18M6 6l12 12'/%3E%3C/svg%3E")
      center / contain no-repeat;
    cursor: pointer;
  }

  /* Override autofill colors so it looks the same as normal typing */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.bodyText};
    caret-color: ${({ theme }) => theme.colors.bodyText};
    box-shadow: 0 0 0 100vmax ${({ theme }) => theme.colors.surface} inset;
    transition: background-color 0s 600000s;
  }
`;

const SearchBarButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${tokens.mobile.sizes.buttonHeight};
  height: ${tokens.mobile.sizes.buttonHeight};
  border: none;
  border-radius: ${tokens.radii.inset};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${tokens.mobile.fontSizes.formText};
  font-weight: ${tokens.fontWeights.semibold};
  cursor: pointer;
  transition: background-color ${tokens.transitions.fast};

  ${tokens.media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  ${tokens.media.tablet} {
    width: auto;
    padding: 0 ${tokens.tablet.spacing.xl};
  }
`;

const SearchBarButtonIcon = styled(ArrowRight)`
  width: ${tokens.mobile.sizes.headerIcon};
  height: ${tokens.mobile.sizes.headerIcon};

  ${tokens.media.tablet} {
    display: none;
  }
`;

const SearchBarButtonLabel = styled.span`
  display: none;

  ${tokens.media.tablet} {
    display: inline;
  }
`;

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  const { t } = useTranslation();
  const paths = usePaths();
  const [localQuery, setLocalQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const isLive = onChange !== undefined;
  const query = value ?? localQuery;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLive) {
      inputRef.current?.blur();
    } else if (query.trim() === "") {
      inputRef.current?.focus();
    } else {
      navigate(paths.searchFor(query));
    }
  };

  return (
    <SearchBarStyled onSubmit={handleSubmit}>
      <SearchBarIcon />
      <SearchBarInput
        ref={inputRef}
        type="search"
        enterKeyHint="search"
        placeholder={placeholder ?? t.search.placeholder}
        name="search-input"
        value={query}
        onChange={(e) => (isLive ? onChange(e.target.value) : setLocalQuery(e.target.value))}
      />
      <SearchBarButton type="submit">
        <SearchBarButtonIcon />
        <SearchBarButtonLabel>{t.search.button}</SearchBarButtonLabel>
      </SearchBarButton>
    </SearchBarStyled>
  );
};
