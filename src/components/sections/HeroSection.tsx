import styled from "styled-components";
import heroImage from "../../assets/hero.webp";
import { SearchBar } from "../ui/SearchBar";

const HeroSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const HeroImageWrapper = styled.div`
  width: 100%;
  height: 40vh;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 85% center;
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.contrast};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const HeroText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  color: ${({ theme }) => theme.colors.text.body};
`;

const HeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
  position: absolute;
  width: 90%;
  top: 10%;
  left: 5%;
`;

export const HeroSection = () => {
  return (
    <HeroSectionStyled>
      <HeroContentWrapper>
        <HeroTitle>Explore the World with TravelMate</HeroTitle>
        <HeroText>Discover amazing places, cities and countries.</HeroText>
        <HeroText>Your next adventure is just a click away.</HeroText>
        <SearchBar />
      </HeroContentWrapper>
      <HeroImageWrapper>
        <HeroImage src={heroImage} alt="" />
      </HeroImageWrapper>
    </HeroSectionStyled>
  );
};
