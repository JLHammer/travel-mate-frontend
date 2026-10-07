import type { MouseEvent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "../../router/routes";
import { useTranslation } from "../../hooks/useTranslation";
import { LEGAL_LAST_UPDATED, type LegalDocument } from "../../i18n/legal";
import { tokens } from "../../styles/theme";
import { PageLayout, PageText } from "../layout/PageLayout";

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

const LegalList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xxs};
  padding-left: ${tokens.mobile.spacing.l};
  list-style: disc;
  font-size: ${tokens.mobile.fontSizes.detailsText};
  line-height: ${tokens.mobile.lineHeights.detailsText};

  & > li::marker {
    color: ${({ theme }) => theme.colors.primary};
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

type LegalSectionProps = {
  title: string;
  content: LegalDocument;
};

export const LegalSection = ({ title, content }: LegalSectionProps) => {
  const { t, language } = useTranslation();

  const lastUpdated = new Intl.DateTimeFormat(language, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(LEGAL_LAST_UPDATED));

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
      heading={content.title}
      intro={
        <>
          <LegalUpdated>
            {t.legal.lastUpdated}: <time dateTime={LEGAL_LAST_UPDATED}>{lastUpdated}</time>
          </LegalUpdated>
          <PageText>{content.intro}</PageText>
        </>
      }
    >
      <LegalBody>
        <LegalNav>
          <LegalNavTitle>{t.legal.overview}</LegalNavTitle>
          <LegalNavList>
            {content.sections.map(({ id, title }) => (
              <li key={id}>
                <LegalNavLink href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                  {title}
                </LegalNavLink>
              </li>
            ))}
          </LegalNavList>
        </LegalNav>

        <LegalArticle>
          {content.sections.map(({ id, title, paragraphs, list }, index) => (
            <LegalBlock key={id} id={id} tabIndex={-1}>
              <h2>
                {index + 1}. {title}
              </h2>
              {paragraphs.map((paragraph) => (
                <PageText key={paragraph}>{paragraph}</PageText>
              ))}
              {list && (
                <LegalList>
                  {list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </LegalList>
              )}
            </LegalBlock>
          ))}

          <ContactLink to={ROUTES.contact}>
            {t.legal.contactLink} <ArrowRight />
          </ContactLink>
        </LegalArticle>
      </LegalBody>
    </PageLayout>
  );
};
