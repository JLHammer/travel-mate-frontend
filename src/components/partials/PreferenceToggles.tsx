import styled from "styled-components";
import { LanguageToggle } from "../ui/LanguageToggle";
import { ThemeToggle } from "../ui/ThemeToggle";

const PreferenceTogglesStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
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
