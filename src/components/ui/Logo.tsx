import { useRef } from "react";
import styled from "styled-components";
import { AirplaneIcon } from "./AirplaneIcon";
import type { AnimatedIconHandle } from "../../types";

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

const LogoLink = styled.a`
  text-decoration: none;
  width: fit-content;
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LogoIcon = styled(AirplaneIcon)`
  color: ${({ theme }) => theme.colors.text.heading};
`;

const LogoText = styled.p`
  color: ${({ theme }) => theme.colors.text.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const LogoSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Logo = () => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <LogoContainer>
      <LogoLink
        href="/"
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
      >
        <LogoWrapper>
          <LogoIcon ref={iconRef} size={32} />
          <LogoText>
            Travel<LogoSpan>Mate</LogoSpan>
          </LogoText>
        </LogoWrapper>
      </LogoLink>
    </LogoContainer>
  );
};
