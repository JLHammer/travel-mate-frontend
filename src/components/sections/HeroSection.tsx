import styled from "styled-components";
import heroImage from "../../assets/hero.webp";
import { SearchBar } from "../ui/SearchBar";
import { tokens } from "../../styles/theme";

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
  gap: ${tokens.mobile.spacing.s};
  padding: ${tokens.mobile.spacing.l};
  border: 1px solid ${({ theme }) => theme.colors.overlaySoftBorder};
  border-radius: ${tokens.radii.panel};
  background-color: ${({ theme }) => theme.colors.overlaySoft};
  backdrop-filter: blur(8px);

  ${tokens.media.tablet} {
    max-width: ${tokens.tablet.sizes.heroTextWidth};
    gap: ${tokens.tablet.spacing.xs};
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

export const HeroSection = () => {
  return (
    <HeroSectionStyled>
      <HeroImage src={heroImage} alt="" />
      <HeroContentWrapper>
        <HeroTextBox>
          <HeroTitle>Explore the World with TravelMate</HeroTitle>
          <HeroText>
            <HeroSentence>Discover amazing attractions, cities and countries.</HeroSentence>
            <HeroSentence>Your next adventure is just a click away.</HeroSentence>
          </HeroText>
        </HeroTextBox>
        <SearchBar />
      </HeroContentWrapper>
    </HeroSectionStyled>
  );
};
