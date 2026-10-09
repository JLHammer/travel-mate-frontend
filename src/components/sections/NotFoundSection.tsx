import styled from "styled-components";
import { Link } from "react-router-dom";
import { usePaths } from "../../hooks/usePaths";
import { useTranslation } from "../../hooks/useTranslation";
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
  const { t } = useTranslation();
  const paths = usePaths();

  return (
    <NotFoundSectionStyled>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <HomeLink to={paths.home}>{t.notFound.backHome}</HomeLink>
    </NotFoundSectionStyled>
  );
};
