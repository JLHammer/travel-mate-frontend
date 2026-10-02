import styled from "styled-components";
import heroImage from "../assets/hero.webp";
import { SearchBar } from "../components/ui/SearchBar";
import { PageTitle } from "../components/ui/PageTitle";

const HeroSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const HeroImageWrapper = styled.div`
  width: 100%;
  height: 50vh;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 85% center;
`;

const HeroTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.mobile.spacing.xs};
  padding: ${({ theme }) => theme.mobile.spacing.m};
  border-radius: ${({ theme }) => theme.radii.panel};
  background-color: ${({ theme }) => theme.colors.overlaySoft};
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.contrast};
`;

const HeroText = styled.p`
  font-size: ${({ theme }) => theme.mobile.fontSizes.heroText};
  line-height: ${({ theme }) => theme.mobile.lineHeights.heroText};
  color: ${({ theme }) => theme.colors.bodyText};
`;

const HeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ theme }) => theme.mobile.spacing.m};
  text-align: left;
  position: absolute;
  width: 90%;
  top: 10%;
  left: 5%;
`;

export const HomePage = () => {
  return (
    <>
      <PageTitle title="Home" />
      <HeroSectionStyled>
        <HeroContentWrapper>
          <HeroTextBox>
            <HeroTitle>Explore the World with TravelMate</HeroTitle>
            <HeroText>Discover amazing attractions, cities and countries.</HeroText>
            <HeroText>Your next adventure is just a click away.</HeroText>
          </HeroTextBox>
          <SearchBar />
        </HeroContentWrapper>
        <HeroImageWrapper>
          <HeroImage src={heroImage} alt="" />
        </HeroImageWrapper>
      </HeroSectionStyled>
    </>
  );
};
