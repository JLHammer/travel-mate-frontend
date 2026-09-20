import styled from "styled-components";
import type { ReactNode } from "react";
import { Logo } from "../ui/Logo";
import { PreferenceToggles } from "./PreferenceToggles";

type HeaderProps = {
  children?: ReactNode;
};

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Header = ({ children }: HeaderProps) => {
  return (
    <HeaderStyled>
      <Logo />
      <PreferenceToggles />
      {children}
    </HeaderStyled>
  );
};
