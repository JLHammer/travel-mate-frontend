import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useFavoriteAttractions } from "../../hooks/useFavoriteAttractions";
import { useTranslation } from "../../hooks/useTranslation";
import { AttractionCard } from "../ui/cards/AttractionCard";
import { CardSection } from "./CardSection";
import { usePaths } from "../../hooks/usePaths";
import { tokens } from "../../styles/theme";

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${tokens.mobile.spacing.s};
  width: ${tokens.mobile.layout.contentWidth};
  padding: 0 ${tokens.mobile.spacing.s} ${tokens.mobile.spacing.l};
`;

const BrowseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xxs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${tokens.fontWeights.semibold};

  & > svg {
    width: ${tokens.mobile.sizes.linkIcon};
    height: ${tokens.mobile.sizes.linkIcon};
  }
`;

export const FavoritesSection = () => {
  const { t } = useTranslation();
  const paths = usePaths();
  const { attractions, isLoading, error } = useFavoriteAttractions();

  if (error) {
    return <p>{t.errors.attractions}</p>;
  }

  const isEmpty = !isLoading && attractions.length === 0;

  return (
    <>
      <CardSection title={t.favorites.title} headingAs="h1" loading={isLoading}>
        {attractions.map((attraction) => (
          <li key={attraction._id}>
            <AttractionCard attraction={attraction} />
          </li>
        ))}
      </CardSection>
      {isEmpty && (
        <EmptyState>
          <p>{t.favorites.empty}</p>
          <BrowseLink to={paths.attractions}>
            {t.favorites.browse} <ArrowRight />
          </BrowseLink>
        </EmptyState>
      )}
    </>
  );
};
