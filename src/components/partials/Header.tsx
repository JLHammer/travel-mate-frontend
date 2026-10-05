import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { PreferenceToggles } from "./PreferenceToggles";
import { Logo } from "../ui/header/Logo";
import { BurgerMenu } from "../ui/header/BurgerMenu";
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
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "logo . actions";
  }
`;

const LogoSlot = styled.div`
  grid-area: logo;
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
  display: none;
  height: 100%;

  ${tokens.media.tablet} {
    display: block;
  }
`;

export const Header = () => {
  const { pathname } = useLocation();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const toggle = () => setOpenedAt(open ? null : pathname);

  return (
    <HeaderStyled>
      <HeaderBar>
        <LogoSlot>
          <Logo />
        </LogoSlot>
        <HeaderActions>
          <HeaderToggles>
            <PreferenceToggles />
          </HeaderToggles>
          <BurgerMenu open={open} onToggle={toggle} />
        </HeaderActions>
      </HeaderBar>
      <NavBar open={open} />
    </HeaderStyled>
  );
};
