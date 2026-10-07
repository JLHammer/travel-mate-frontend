import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { NavLinks } from "./NavLinks";
import { PreferenceToggles } from "./PreferenceToggles";
import { Logo } from "../ui/header/Logo";
import { BurgerMenu } from "../ui/header/BurgerMenu";
import { AuthLink } from "../ui/header/AuthLink";
import { tokens } from "../../styles/theme";

const HeaderStyled = styled.header`
  position: relative;
  z-index: ${tokens.zIndices.header};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.header};
`;

const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: ". logo actions";
  align-items: center;
  width: ${tokens.mobile.layout.contentWidth};
  height: ${tokens.mobile.sizes.headerHeight};
  column-gap: ${tokens.mobile.spacing.xs};
  padding: 0 ${tokens.mobile.spacing.s};

  ${tokens.media.tablet} {
    grid-template-areas: "logo toggles actions";
  }

  ${tokens.media.desktop} {
    grid-template-columns: auto 1fr auto auto;
    grid-template-areas: "logo nav toggles actions";
  }
`;

const LogoSlot = styled.div`
  grid-area: logo;
  justify-self: start;
`;

const DesktopNav = styled.nav`
  grid-area: nav;
  display: none;
  justify-self: center;

  ${tokens.media.desktop} {
    display: block;
  }
`;

const HeaderActions = styled.div`
  grid-area: actions;
  justify-self: end;
  display: flex;
  align-items: center;
  height: ${tokens.mobile.sizes.pillHeight};
  gap: ${tokens.mobile.spacing.xs};
`;

const HeaderToggles = styled.div`
  grid-area: toggles;
  display: none;
  height: ${tokens.mobile.sizes.pillHeight};

  ${tokens.media.tablet} {
    display: block;
  }
`;

const HeaderAuth = styled.div`
  display: none;

  ${tokens.media.tablet} {
    display: block;
  }
`;

const BurgerSlot = styled.div`
  ${tokens.media.desktop} {
    display: none;
  }
`;

export const Header = () => {
  const { pathname } = useLocation();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const toggle = () => setOpenedAt(open ? null : pathname);
  const close = () => setOpenedAt(null);

  return (
    <HeaderStyled>
      <HeaderBar>
        <LogoSlot>
          <Logo />
        </LogoSlot>
        <DesktopNav>
          <NavLinks variant="bar" />
        </DesktopNav>
        <HeaderToggles>
          <PreferenceToggles themeVariant="slider" />
        </HeaderToggles>
        <HeaderActions>
          <HeaderAuth>
            <AuthLink />
          </HeaderAuth>
          <BurgerSlot>
            <BurgerMenu open={open} onToggle={toggle} />
          </BurgerSlot>
        </HeaderActions>
      </HeaderBar>
      <NavBar open={open} onNavigate={close} />
    </HeaderStyled>
  );
};
