import styled from "styled-components";
import { FooterNavBar } from "./FooterNavBar";
import { Logo } from "../ui/header/Logo";
import { SocialsList } from "../ui/SocialsList";

const FooterStyled = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.mobile.spacing.m};
  padding: ${({ theme }) => theme.mobile.spacing.l} 0;
`;

export const Footer = () => {
  return (
    <FooterStyled>
      <Logo iconVisible={false} />
      <FooterNavBar />
      <SocialsList />
    </FooterStyled>
  );
};
