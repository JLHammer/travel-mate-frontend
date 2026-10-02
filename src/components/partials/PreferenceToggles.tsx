import styled from "styled-components";
import { LanguageToggle } from "../ui/header/LanguageToggle";
import { ThemeToggle } from "../ui/header/ThemeToggle";

const PreferenceTogglesStyled = styled.div`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.mobile.spacing.xs};
  align-items: center;
`;

export const PreferenceToggles = () => {
  return (
    <PreferenceTogglesStyled>
      <LanguageToggle />
      <ThemeToggle />
    </PreferenceTogglesStyled>
  );
};
