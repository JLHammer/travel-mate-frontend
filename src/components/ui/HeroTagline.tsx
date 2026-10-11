import styled from "styled-components";
import { tokens } from "../../styles/theme";

const CAVEAT_URL = "https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap";

const TABLET_OFFSET_X = "-7rem";
const TABLET_OFFSET_Y = "-5.25rem";

const HeroTaglineStyled = styled.p`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: flex-start;
  padding-left: ${tokens.mobile.spacing.l};
  color: ${({ theme }) => theme.colors.onScrim};
  font-family: "Caveat", cursive;
  font-weight: 500;
  font-size: 1.625rem;
  line-height: 0.95;
  text-shadow: ${({ theme }) => theme.shadows.textOnImage};
  transform: rotate(-8deg);
  pointer-events: none;

  ${tokens.media.tablet} {
    position: absolute;
    padding-left: 0;
    top: calc(50% - (${tokens.tablet.spacing.l} + ${tokens.tablet.sizes.searchBarHeight}) / 2);
    left: calc(${tokens.tablet.spacing.s} + ${tokens.tablet.sizes.heroTextWidth});
    right: 0;
    width: fit-content;
    margin-inline: auto;
    font-size: 2.125rem;
    transform: translate(${TABLET_OFFSET_X}, calc(-50% + ${TABLET_OFFSET_Y})) rotate(-8deg);
  }

  ${tokens.media.desktop} {
    top: 50%;
    left: auto;
    right: calc(1rem - min(18rem, max(0rem, (100vw - 78.125rem) / 2)));
    margin-inline: 0;
    transform: translateY(-50%) rotate(-8deg);
  }
`;

const TaglineSwoosh = styled.svg`
  width: 4.5rem;
  margin: 0.5rem 0 0 1.5rem;
`;

export const HeroTagline = ({ lines }: { lines: string[] }) => {
  return (
    <>
      <link rel="stylesheet" href={CAVEAT_URL} precedence="default" />
      <HeroTaglineStyled>
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <TaglineSwoosh viewBox="0 0 140 20">
          <path d="M2 18 Q60 0 138 6 Q62 4 4 20 Z" fill="currentColor" />
        </TaglineSwoosh>
      </HeroTaglineStyled>
    </>
  );
};
