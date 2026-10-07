import styled from "styled-components";
import { FooterNavBar } from "./FooterNavBar";
import { Logo } from "../ui/header/Logo";
import { SocialsList } from "../ui/footer/SocialsList";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";

const FooterStyled = styled.footer`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: ${tokens.borders.width} solid ${({ theme }) => theme.colors.borderLight};
  margin-top: ${tokens.mobile.spacing.xl};
  padding: ${tokens.mobile.spacing.l} ${tokens.mobile.spacing.m} ${tokens.mobile.spacing.xl};
`;

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: ${tokens.mobile.layout.contentWidth};
  gap: ${tokens.mobile.spacing.m};

  ${tokens.media.desktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${tokens.media.desktop} {
    flex-direction: row;
    gap: ${tokens.desktop.spacing.l};
  }
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${tokens.mobile.fontSizes.footerText};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.mobile.spacing.m};

  ${tokens.media.desktop} {
    flex-direction: row;
    gap: ${tokens.desktop.spacing.xl};
  }
`;

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterStyled>
      <FooterInner>
        <FooterBrand>
          <Logo iconVisible={false} variant="footer" />
          <Tagline>{t.footer.tagline}</Tagline>
        </FooterBrand>
        <FooterLinks>
          <FooterNavBar />
          <SocialsList />
        </FooterLinks>
      </FooterInner>
    </FooterStyled>
  );
};
