import styled from "styled-components";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";

const NotFoundSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.mobile.spacing.m};
  padding: ${({ theme }) => theme.mobile.spacing.xl} ${({ theme }) => theme.mobile.spacing.m};
  text-align: center;
`;

const HomeLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: ${({ theme }) => theme.mobile.spacing.xs} ${({ theme }) => theme.mobile.spacing.l};
  border-radius: ${({ theme }) => theme.radii.button};
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const NotFoundSection = () => {
  return (
    <NotFoundSectionStyled>
      <h1>Page not found</h1>
      <p>We couldn't find the page you're looking for.</p>
      <HomeLink to={ROUTES.home}>Back to home</HomeLink>
    </NotFoundSectionStyled>
  );
};
