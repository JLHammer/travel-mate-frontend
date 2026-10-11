import type { MouseEvent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePaths } from "../../hooks/usePaths";
import { type LegalPageId, useLegalPage } from "../../hooks/useLegalPage";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";
import type { LegalPageData } from "../../types";
import { toAnchor } from "../../utils/toAnchor";
import { PageLayout, PageText } from "../layout/PageLayout";
import { ErrorState } from "../ui/ErrorState";
import { Loader } from "../ui/Loader";
import { RichText } from "../ui/RichText";

const LegalUpdated = styled.p`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${tokens.mobile.fontSizes.small};
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const LegalBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${tokens.mobile.spacing.l};

  ${tokens.media.desktop} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
    align-items: start;
    gap: ${tokens.desktop.spacing.xl};
  }
`;

const LegalNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.s};
  padding: ${tokens.mobile.spacing.m};
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.card};
  background-color: ${({ theme }) => theme.colors.surface};

  ${tokens.media.desktop} {
    position: sticky;
    top: ${tokens.desktop.spacing.l};
  }
`;

const LegalNavTitle = styled.h2`
  font-size: ${tokens.mobile.fontSizes.h3};
`;

const LegalNavList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xxs};
  padding-left: ${tokens.mobile.spacing.l};
  list-style: decimal;

  & > li::marker {
    color: ${({ theme }) => theme.colors.mutedText};
  }
`;

const LegalNavLink = styled.a`
  color: ${({ theme }) => theme.colors.bodyText};
  text-decoration: none;
  transition: color ${tokens.transitions.fast};

  ${tokens.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const LegalArticle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xl};
  padding: ${tokens.mobile.spacing.l};
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.panel};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};

  ${tokens.media.tablet} {
    padding: ${tokens.tablet.spacing.xl};
  }
`;

const LegalBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.s};
  scroll-margin-top: ${tokens.mobile.spacing.l};

  &:focus {
    outline: none;
  }
`;

const ContactLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
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

type LegalContentProps = {
  title: string;
  page: LegalPageData;
};

const LegalContent = ({ title, page }: LegalContentProps) => {
  const { t, language } = useTranslation();
  const paths = usePaths();

  // The heading becomes the id the overview links jump to
  const sections = (page.sections ?? []).map((section) => ({
    ...section,
    id: toAnchor(section.title ?? "") || section._key,
  }));

  const lastUpdated =
    page.lastUpdated &&
    new Intl.DateTimeFormat(language, { dateStyle: "long", timeZone: "UTC" }).format(
      new Date(page.lastUpdated),
    );

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView();
    target.focus({ preventScroll: true });
  };

  return (
    <PageLayout
      title={title}
      heading={page.title ?? title}
      intro={
        <>
          {lastUpdated && (
            <LegalUpdated>
              {t.legal.lastUpdated}: <time dateTime={page.lastUpdated ?? ""}>{lastUpdated}</time>
            </LegalUpdated>
          )}
          <PageText>{page.intro}</PageText>
        </>
      }
    >
      <LegalBody>
        <LegalNav>
          <LegalNavTitle>{t.legal.overview}</LegalNavTitle>
          <LegalNavList>
            {sections.map(({ _key, id, title }) => (
              <li key={_key}>
                <LegalNavLink href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                  {title}
                </LegalNavLink>
              </li>
            ))}
          </LegalNavList>
        </LegalNav>

        <LegalArticle>
          {sections.map(({ _key, id, title, body }, index) => (
            <LegalBlock key={_key} id={id} tabIndex={-1}>
              <h2>
                {index + 1}. {title}
              </h2>
              <RichText value={body} />
            </LegalBlock>
          ))}

          <ContactLink to={paths.contact}>
            {t.legal.contactLink} <ArrowRight />
          </ContactLink>
        </LegalArticle>
      </LegalBody>
    </PageLayout>
  );
};

type LegalSectionProps = {
  id: LegalPageId;
  title: string;
};

export const LegalSection = ({ id, title }: LegalSectionProps) => {
  const { t } = useTranslation();
  const { data: page, isLoading, error, refetch } = useLegalPage(id);

  if (isLoading) return <Loader />;

  // Missing document is an error too, the page should always be there
  if (error || !page) return <ErrorState message={t.errors.page} onRetry={refetch} />;

  return <LegalContent title={title} page={page} />;
};
