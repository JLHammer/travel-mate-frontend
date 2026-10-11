import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../partials/Header";
import { Footer } from "../partials/Footer";
import { Loader } from "../ui/Loader";
import { MAIN_CONTENT_ID, SkipLink } from "../ui/SkipLink";
import { Toaster } from "../ui/Toaster";

const MainStyled = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainLayout = () => {
  return (
    <>
      <SkipLink />
      <Header />
      <MainStyled id={MAIN_CONTENT_ID} tabIndex={-1}>
        {/* Pages load on demand, so show the loader until the page's code has arrived */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </MainStyled>
      <Footer />
      <Toaster />
    </>
  );
};
