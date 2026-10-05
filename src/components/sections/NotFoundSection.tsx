import styled from "styled-components";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { tokens } from "../../styles/theme";

const NotFoundSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.mobile.spacing.m};
  padding: ${tokens.mobile.spacing.xl} ${tokens.mobile.spacing.m};
  text-align: center;
`;

const HomeLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: ${tokens.mobile.spacing.xs} ${tokens.mobile.spacing.l};
  border-radius: ${tokens.radii.button};
  text-decoration: none;
  transition: background-color ${tokens.transitions.fast};

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
