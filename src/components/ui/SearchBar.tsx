import styled from "styled-components";

const SearchBarStyled = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.m};
`;

export const SearchBar = () => {
  return (
    <SearchBarStyled>
      <input type="text" placeholder="Search..." />
      <button type="submit">Search</button>
    </SearchBarStyled>
  );
};
