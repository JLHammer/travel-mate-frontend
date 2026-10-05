import styled from "styled-components";
import { LanguageToggle } from "../ui/header/LanguageToggle";
import { ThemeToggle } from "../ui/header/ThemeToggle";
import { tokens } from "../../styles/theme";

const PreferenceTogglesStyled = styled.div`
  height: 100%;
  display: flex;
  gap: ${tokens.mobile.spacing.xs};
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
