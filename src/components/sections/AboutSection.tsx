import type { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Globe,
  Heart,
  Landmark,
  Languages,
  MapPin,
  Moon,
  Search,
} from "lucide-react";
import { useAboutPage } from "../../hooks/useAboutPage";
import { usePaths } from "../../hooks/usePaths";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";
import type { AboutCardData, AboutPageData } from "../../types";
import { PageLayout, PageText } from "../layout/PageLayout";
import { ErrorState } from "../ui/ErrorState";
import { Loader } from "../ui/Loader";
import { RichText } from "../ui/RichText";

const AboutSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xl};
`;

const AboutOutro = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.m};
  max-width: ${tokens.mobile.sizes.formWidth};
`;

const AboutBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.m};
`;

const AboutGrid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${tokens.mobile.spacing.s};

  ${tokens.media.tablet} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${tokens.tablet.spacing.m};
  }
`;

const AboutCard = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.s};
  padding: ${tokens.mobile.spacing.l};
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.card};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const AboutIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};

  width: ${tokens.mobile.sizes.infoIconBox};
  height: ${tokens.mobile.sizes.infoIconBox};

  & > svg {
    width: ${tokens.mobile.sizes.infoIcon};
    height: ${tokens.mobile.sizes.infoIcon};
  }
`;

const AboutCardText = styled.p`
  flex-grow: 1;
`;

const AboutLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xxs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${tokens.fontWeights.semibold};
  text-decoration: none;
  transition: color ${tokens.transitions.fast};

  & > svg {
    width: ${tokens.mobile.sizes.linkIcon};
    height: ${tokens.mobile.sizes.linkIcon};
  }

  ${tokens.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;

// The icons an editor can pick for a card in the Studio
const ICONS: Record<NonNullable<AboutCardData["icon"]>, ReactNode> = {
  globe: <Globe />,
  building: <Building2 />,
  landmark: <Landmark />,
  mapPin: <MapPin />,
  heart: <Heart />,
  moon: <Moon />,
  languages: <Languages />,
  search: <Search />,
};

const AboutCards = ({ cards }: { cards: AboutCardData[] | null }) => {
  const paths = usePaths();

  return (
    <AboutGrid>
      {cards?.map(({ _key, icon, title, text, linkPage, linkLabel }) => (
        <AboutCard key={_key}>
          {icon && <AboutIcon>{ICONS[icon]}</AboutIcon>}
          <h3>{title}</h3>
          <AboutCardText>{text}</AboutCardText>
          {linkPage && linkLabel && (
            <AboutLink to={paths[linkPage]}>
              {linkLabel} <ArrowRight />
            </AboutLink>
          )}
        </AboutCard>
      ))}
    </AboutGrid>
  );
};

const AboutContent = ({ about }: { about: AboutPageData }) => {
  const { t } = useTranslation();
  const paths = usePaths();
  const { title, intro, explore, features, outro } = about;

  return (
    <PageLayout
      title={t.nav.about}
      heading={title ?? t.nav.about}
      intro={<RichText value={intro} />}
    >
      <AboutSections>
        {explore && (
          <AboutBlock>
            <h2>{explore.title}</h2>
            <AboutCards cards={explore.cards} />
          </AboutBlock>
        )}

        {features && (
          <AboutBlock>
            <h2>{features.title}</h2>
            <AboutCards cards={features.cards} />
          </AboutBlock>
        )}

        {outro && (
          <AboutOutro>
            <h2>{outro.title}</h2>
            <PageText>
              {outro.text}
              {outro.linkPage && outro.linkLabel && (
                <>
                  {" "}
                  <AboutLink to={paths[outro.linkPage]}>{outro.linkLabel}</AboutLink>.
                </>
              )}
            </PageText>
          </AboutOutro>
        )}
      </AboutSections>
    </PageLayout>
  );
};

export const AboutSection = () => {
  const { t } = useTranslation();
  const { data: about, isLoading, error, refetch } = useAboutPage();

  if (isLoading) return <Loader />;

  // A missing document is shown as an error too, since the page should always exist
  if (error || !about) return <ErrorState message={t.errors.page} onRetry={refetch} />;

  return <AboutContent about={about} />;
};
