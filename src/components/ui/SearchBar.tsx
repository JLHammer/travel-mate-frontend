import styled from "styled-components";
import { Search } from "lucide-react";

const SearchBarStyled = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.mobile.spacing.xs};
  width: 100%;
  max-width: ${({ theme }) => theme.mobile.sizes.searchBarWidth};
  padding: ${({ theme }) => theme.mobile.spacing.xxs};
  border: ${({ theme }) => theme.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.input};
  background-color: ${({ theme }) => theme.colors.background};
`;

const SearchBarIconContainer = styled.div`
  display: flex;
  align-self: center;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.mobile.spacing.xs};
`;

const SearchBarInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.bodyText};
  font-size: ${({ theme }) => theme.mobile.fontSizes.formText};
  width: 100%;
`;

const SearchBarButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  outline: none;
  padding: ${({ theme }) => theme.mobile.spacing.xs} ${({ theme }) => theme.mobile.spacing.l};
  border-radius: ${({ theme }) => theme.radii.inset};
  font-size: ${({ theme }) => theme.mobile.fontSizes.formText};
  cursor: pointer;
  transition: background-color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const SearchBar = () => {
  return (
    <SearchBarStyled>
      <SearchBarIconContainer>
        <Search size={20} />
      </SearchBarIconContainer>
      <SearchBarInput type="text" placeholder="Search..." name="search-input" />
      <SearchBarButton type="submit">Search</SearchBarButton>
    </SearchBarStyled>
  );
};
