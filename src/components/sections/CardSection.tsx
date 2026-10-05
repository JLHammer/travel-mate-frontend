import { useEffect, useRef, useState, type ReactNode } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { tokens } from "../../styles/theme";
import { Loader } from "../ui/Loader";

const CardSectionStyled = styled.section`
  width: ${tokens.mobile.layout.contentWidth};
  padding: ${tokens.mobile.spacing.l} ${tokens.mobile.spacing.s};
`;

const CardSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.mobile.spacing.m};
  margin-bottom: ${tokens.mobile.spacing.m};
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${tokens.fontWeights.semibold};
  text-decoration: none;
  transition: color ${tokens.transitions.fast};

  gap: ${tokens.mobile.spacing.xxs};

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

const ViewAllNoun = styled.span`
  display: none;

  ${tokens.media.tablet} {
    display: inline;
  }
`;

const CardGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${tokens.mobile.spacing.s};

  ${tokens.media.tablet} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${tokens.tablet.spacing.s};
  }

  ${tokens.media.desktop} {
    grid-template-columns: repeat(5, 1fr);
    gap: ${tokens.desktop.spacing.s};
  }
`;

const CardRowLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${tokens.mobile.sizes.cardRowHeight};
  margin-block: ${tokens.mobile.spacing.xxs};
`;

const CarouselWrapper = styled.div<{ $mobileOnly: boolean }>`
  position: relative;
  margin-inline: calc(-1 * ${tokens.mobile.spacing.s});

  ${tokens.media.tablet} {
    ${({ $mobileOnly }) => $mobileOnly && "margin-inline: 0;"}
  }

  ${tokens.media.desktop} {
    margin-inline: 0;
  }
`;

const VISIBLE_CARDS = { mobile: 2.15, tablet: 3.15 };

const carousel = (t: typeof tokens.mobile, visible: number) => css`
  gap: ${t.spacing.s};
  padding: ${t.spacing.xxs} ${t.spacing.s};
  scroll-padding-inline: ${t.spacing.s};
  grid-auto-columns: calc((100% - ${Math.floor(visible)} * ${t.spacing.s}) / ${visible});
`;

const trackAsGrid = (columns: number, gap: string) => css`
  grid-auto-flow: row;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: ${gap};
  padding: 0;
  overflow-x: visible;
  scroll-snap-type: none;
`;

const CardTrack = styled.ul<{ $mobileOnly: boolean }>`
  display: grid;
  grid-auto-flow: column;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > li {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ${carousel(tokens.mobile, VISIBLE_CARDS.mobile)}

  ${tokens.media.tablet} {
    ${({ $mobileOnly }) =>
      $mobileOnly
        ? trackAsGrid(2, tokens.tablet.spacing.m)
        : carousel(tokens.tablet, VISIBLE_CARDS.tablet)}
  }

  ${tokens.media.desktop} {
    ${({ $mobileOnly }) =>
      $mobileOnly ? trackAsGrid(4, tokens.desktop.spacing.m) : trackAsGrid(5, tokens.desktop.spacing.s)}
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

const CarouselControl = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  ${({ $side }) => $side}: 0;
  z-index: ${tokens.zIndices.carouselControl};
  display: none;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.scrim};
  color: ${({ theme }) => theme.colors.onScrim};
  cursor: pointer;

  top: ${tokens.mobile.spacing.xxs};
  width: ${tokens.mobile.sizes.carouselControlWidth};
  height: ${tokens.mobile.sizes.cardImageHeight};

  & > svg {
    width: ${tokens.mobile.sizes.carouselChevron};
    height: ${tokens.mobile.sizes.carouselChevron};
  }

  ${tokens.media.tablet} {
    display: flex;
  }

  ${tokens.media.desktop} {
    display: none;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: ${tokens.mobile.spacing.xxs};
  margin-top: ${tokens.mobile.spacing.s};

  ${tokens.media.desktop} {
    display: none;
  }
`;

const CarouselDot = styled.span<{ $active: boolean }>`
  border-radius: ${tokens.radii.pill};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  transition:
    width ${tokens.transitions.normal},
    background-color ${tokens.transitions.normal};

  width: ${({ $active }) =>
    $active ? tokens.mobile.sizes.carouselDotActive : tokens.mobile.sizes.carouselDot};
  height: ${tokens.mobile.sizes.carouselDot};
`;

type CarouselState = {
  visibleCards: boolean[];
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

type CardCarouselProps = {
  mobileOnly: boolean;
  children: ReactNode;
};

const CardCarousel = ({ mobileOnly, children }: CardCarouselProps) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<CarouselState>({
    visibleCards: [],
    canScrollPrev: false,
    canScrollNext: false,
  });

  const measure = (track: HTMLUListElement) => {
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap) || 0;
    const cardWidth = (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
    const contentWidth =
      track.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    const step = cardWidth + gap;
    const cardsPerPage = step > 0 ? Math.max(1, Math.floor((contentWidth + gap) / step)) : 1;
    return { step, cardsPerPage };
  };

  const updateState = () => {
    const track = trackRef.current;
    if (!track) return;
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    const trackRect = track.getBoundingClientRect();
    const visibleCards = Array.from(track.children, (card) => {
      const { left, right, width } = card.getBoundingClientRect();
      const shown = Math.min(right, trackRect.right) - Math.max(left, trackRect.left);
      return width > 0 && shown / width >= 0.9;
    });

    setState({ visibleCards, canScrollPrev: !atStart, canScrollNext: !atEnd });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateState);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const { step, cardsPerPage } = measure(track);
    track.scrollBy({ left: direction * step * cardsPerPage });
  };

  return (
    <>
      <CarouselWrapper $mobileOnly={mobileOnly}>
        {state.canScrollPrev && (
          <CarouselControl type="button" $side="left" onClick={() => scrollByPage(-1)}>
            <ChevronLeft />
          </CarouselControl>
        )}
        <CardTrack ref={trackRef} $mobileOnly={mobileOnly} onScroll={updateState}>
          {children}
        </CardTrack>
        {state.canScrollNext && (
          <CarouselControl type="button" $side="right" onClick={() => scrollByPage(1)}>
            <ChevronRight />
          </CarouselControl>
        )}
      </CarouselWrapper>
      {(state.canScrollPrev || state.canScrollNext) && (
        <CarouselDots>
          {state.visibleCards.map((visible, card) => (
            <CarouselDot key={card} $active={visible} />
          ))}
        </CarouselDots>
      )}
    </>
  );
};

type CardSectionProps = {
  title: string;
  linkPath?: string;
  linkNoun?: string;
  carousel?: boolean | "mobile";
  loading?: boolean;
  children?: ReactNode;
};

export const CardSection = ({
  title,
  linkPath,
  linkNoun,
  carousel = false,
  loading = false,
  children,
}: CardSectionProps) => {
  return (
    <CardSectionStyled>
      <CardSectionHeader>
        <h2>{title}</h2>
        {linkPath && (
          <ViewAllLink to={linkPath}>
            View all{linkNoun && <ViewAllNoun> {linkNoun}</ViewAllNoun>} <ArrowRight />
          </ViewAllLink>
        )}
      </CardSectionHeader>
      {loading ? (
        <CardRowLoader>
          <Loader />
        </CardRowLoader>
      ) : carousel ? (
        <CardCarousel mobileOnly={carousel === "mobile"}>{children}</CardCarousel>
      ) : (
        <CardGrid>{children}</CardGrid>
      )}
    </CardSectionStyled>
  );
};
