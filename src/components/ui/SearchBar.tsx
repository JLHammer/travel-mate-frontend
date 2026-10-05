import { useRef, useState, type FormEvent } from "react";
import styled from "styled-components";
import { ArrowRight, Search } from "lucide-react";
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

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (query.trim() === "") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  return (
    <SearchBarStyled onSubmit={handleSubmit}>
      <SearchBarIcon />
      <SearchBarInput
        ref={inputRef}
        type="search"
        enterKeyHint="search"
        placeholder="Search destinations..."
        name="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchBarButton type="submit">
        <SearchBarButtonIcon />
        <SearchBarButtonLabel>Search</SearchBarButtonLabel>
      </SearchBarButton>
    </SearchBarStyled>
  );
};
