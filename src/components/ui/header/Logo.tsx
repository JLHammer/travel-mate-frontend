import { useRef } from "react";
import styled from "styled-components";
import { AirplaneIcon } from "../icons/AirplaneIcon";
import type { AnimatedIconHandle } from "../../../types";

type LogoProps = {
  iconVisible?: boolean;
};

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.mobile.spacing.xs};
`;

const LogoLink = styled.a`
  text-decoration: none;
  width: fit-content;
  padding: 0 ${({ theme }) => theme.mobile.spacing.xs};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.mobile.spacing.xs};
`;

const LogoIcon = styled(AirplaneIcon)`
  color: ${({ theme }) => theme.colors.headingText};
`;

const LogoText = styled.p`
  color: ${({ theme }) => theme.colors.headingText};
  font-size: ${({ theme }) => theme.mobile.fontSizes.logo};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const LogoSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Logo = ({ iconVisible = true }: LogoProps) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <LogoContainer>
      <LogoLink
        href="/"
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
      >
        <LogoWrapper>
          {iconVisible && <LogoIcon ref={iconRef} size={32} />}
          <LogoText>
            Travel<LogoSpan>Mate</LogoSpan>
          </LogoText>
        </LogoWrapper>
      </LogoLink>
    </LogoContainer>
  );
};
