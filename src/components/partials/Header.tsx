import styled from "styled-components";
import { NavBar } from "./NavBar";
import { Logo } from "../ui/header/Logo";

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = () => {
  return (
    <HeaderStyled>
      <Logo />
      <NavBar />
    </HeaderStyled>
  );
};
