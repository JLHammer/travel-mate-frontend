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

const HeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
  position: absolute;
  top: 10%;
  left: 5%;
`;

export const HeroSection = () => {
  return (
    <HeroSectionStyled>
      <HeroContentWrapper>
        <h1>Explore the World with TravelMate</h1>
        <p>Discover amazing places, cities and countries.</p>
        <p>Your next adventure is just a click away.</p>
        <SearchBar />
      </HeroContentWrapper>
      <HeroImageWrapper>
        <HeroImage src={heroImage} alt="" />
      </HeroImageWrapper>
    </HeroSectionStyled>
  );
};
