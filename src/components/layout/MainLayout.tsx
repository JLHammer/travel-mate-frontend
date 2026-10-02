import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../partials/Header";
import { Footer } from "../partials/Footer";

const MainStyled = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainLayout = () => {
  return (
    <>
      <Header />
      <MainStyled>
        <Outlet />
      </MainStyled>
      <Footer />
    </>
  );
};
