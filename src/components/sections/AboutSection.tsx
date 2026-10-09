import type { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe, Heart, Landmark, MapPin, Moon } from "lucide-react";
import { usePaths } from "../../hooks/usePaths";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";
import { PageLayout, PageText } from "../layout/PageLayout";

const AboutContent = styled.div`
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

type AboutItem = {
  icon: ReactNode;
  title: string;
  text: string;
  link?: { path: string; label: string };
};

const exploreItems = [
  { key: "countries", icon: <Globe /> },
  { key: "cities", icon: <Building2 /> },
  { key: "attractions", icon: <Landmark /> },
] as const;

const featureItems = [
  { key: "map", icon: <MapPin /> },
  { key: "favourites", icon: <Heart /> },
  { key: "screens", icon: <Moon /> },
] as const;

const AboutCards = ({ items }: { items: AboutItem[] }) => (
  <AboutGrid>
    {items.map(({ icon, title, text, link }) => (
      <AboutCard key={title}>
        <AboutIcon>{icon}</AboutIcon>
        <h3>{title}</h3>
        <AboutCardText>{text}</AboutCardText>
        {link && (
          <AboutLink to={link.path}>
            {link.label} <ArrowRight />
          </AboutLink>
        )}
      </AboutCard>
    ))}
  </AboutGrid>
);

export const AboutSection = () => {
  const { t } = useTranslation();
  const paths = usePaths();

  const explore: AboutItem[] = exploreItems.map(({ key, icon }) => {
    const { title, text, link } = t.about.explore[key];
    return { icon, title, text, link: { path: paths[key], label: link } };
  });

  const features: AboutItem[] = featureItems.map(({ key, icon }) => ({
    icon,
    ...t.about.features[key],
  }));

  return (
    <PageLayout
      title={t.nav.about}
      heading={t.about.title}
      intro={
        <>
          <PageText>{t.about.intro1}</PageText>
          <PageText>{t.about.intro2}</PageText>
        </>
      }
    >
      <AboutContent>
        <AboutBlock>
          <h2>{t.about.exploreTitle}</h2>
          <AboutCards items={explore} />
        </AboutBlock>

        <AboutBlock>
          <h2>{t.about.featuresTitle}</h2>
          <AboutCards items={features} />
        </AboutBlock>

        <AboutOutro>
          <h2>{t.about.upToDateTitle}</h2>
          <PageText>
            {t.about.upToDateText} <AboutLink to={paths.contact}>{t.about.getInTouch}</AboutLink>.
          </PageText>
        </AboutOutro>
      </AboutContent>
    </PageLayout>
  );
};
