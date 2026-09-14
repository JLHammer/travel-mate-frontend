import type { ReactNode } from "react";
import styled from "styled-components";
import { Header } from "../partials/Header";
import { NavBar } from "../partials/NavBar";
import { Footer } from "../partials/Footer";

type MainLayoutProps = {
  children?: ReactNode;
  pageTitle?: string;
};

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
`;

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <MainStyled>{children}</MainStyled>
      <Footer />
    </>
  );
};
