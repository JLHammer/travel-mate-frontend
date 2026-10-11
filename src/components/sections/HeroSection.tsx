import styled from "styled-components";
import heroImage from "../../assets/hero.webp";
import { SearchBar } from "../ui/SearchBar";
import { HeroTagline } from "../ui/HeroTagline";
import { tokens } from "../../styles/theme";
import type { HeroData } from "../../types";
import { sanityImageProps } from "../../utils/imageUrl";

const HeroSectionStyled = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: ${tokens.mobile.sizes.heroHeight};
  overflow: hidden;

  ${tokens.media.tablet} {
    min-height: ${tokens.tablet.sizes.heroHeight};
  }
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 85% center;

  ${({ theme }) => theme.mode === "dark" && "filter: brightness(0.75);"}
`;

const HeroContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${tokens.mobile.spacing.l};
  width: ${tokens.mobile.layout.contentWidth};
  padding: ${tokens.mobile.spacing.l} ${tokens.mobile.spacing.s};

  ${tokens.media.tablet} {
    justify-content: center;
    gap: ${tokens.tablet.spacing.l};
    padding: ${tokens.tablet.spacing.xl} ${tokens.tablet.spacing.s};
  }
`;

const HeroTextBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${tokens.mobile.sizes.searchBarWidth};
  gap: ${tokens.mobile.spacing.s};
  padding: ${tokens.mobile.spacing.l};
  border: 1px solid ${({ theme }) => theme.colors.overlaySoftBorder};
  border-radius: ${tokens.radii.panel};
  background-color: ${({ theme }) => theme.colors.overlaySoft};
  backdrop-filter: blur(8px);

  ${tokens.media.tablet} {
    max-width: ${tokens.tablet.sizes.searchBarWidth};
    gap: ${tokens.tablet.spacing.xs};
  }

  ${tokens.media.desktop} {
    padding: 0;
    border: none;
    background-color: transparent;
    backdrop-filter: none;
  }
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.contrast};
`;

const HeroText = styled.p`
  font-size: ${tokens.mobile.fontSizes.heroText};
  line-height: ${tokens.mobile.lineHeights.heroText};
  color: ${({ theme }) => theme.colors.headingText};

  ${tokens.media.tablet} {
    font-size: ${tokens.tablet.fontSizes.heroText};
    line-height: ${tokens.tablet.lineHeights.heroText};
  }
`;

const HeroSentence = styled.span`
  display: block;

  & + & {
    margin-top: ${tokens.mobile.spacing.xxs};
  }
`;

// Each line in the Studio becomes its own line here
const toLines = (text: string | null) =>
  (text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

type HeroSectionProps = {
  hero: HeroData | null;
  loading: boolean;
};

export const HeroSection = ({ hero, loading }: HeroSectionProps) => {
  const lines = toLines(hero?.text ?? null);
  const taglineLines = toLines(hero?.tagline ?? null);

  // No image while loading so the default photo doesn't flash first
  // Falls back to the default photo and the search bar if there's no home page in Sanity
  const image = hero?.image?.asset ? (
    <HeroImage {...sanityImageProps(hero.image, "100vw")} alt="" fetchPriority="high" />
  ) : (
    !loading && <HeroImage src={heroImage} alt="" />
  );

  return (
    <HeroSectionStyled>
      {image}
      <HeroContentWrapper>
        {hero?.title && (
          <HeroTextBox>
            <HeroTitle>{hero.title}</HeroTitle>
            {lines.length > 0 && (
              <HeroText>
                {lines.map((line) => (
                  <HeroSentence key={line}>{line}</HeroSentence>
                ))}
              </HeroText>
            )}
          </HeroTextBox>
        )}
        {taglineLines.length > 0 && <HeroTagline lines={taglineLines} />}
        <SearchBar />
      </HeroContentWrapper>
    </HeroSectionStyled>
  );
};
