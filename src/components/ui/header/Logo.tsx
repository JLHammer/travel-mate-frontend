import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AirplaneIcon } from "../icons/AirplaneIcon";
import type { AnimatedIconHandle } from "../../../types";
import { tokens } from "../../../styles/theme";
import { usePaths } from "../../../hooks/usePaths";

type LogoVariant = "header" | "footer";

type LogoProps = {
  iconVisible?: boolean;
  variant?: LogoVariant;
};

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${tokens.mobile.spacing.xs};
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${tokens.mobile.spacing.xs};
`;

const LogoIcon = styled(AirplaneIcon)`
  color: ${({ theme }) => theme.colors.headingText};

  & svg {
    width: ${tokens.mobile.sizes.logoIcon};
    height: ${tokens.mobile.sizes.logoIcon};
  }
`;

const LogoText = styled.p<{ $variant: LogoVariant }>`
  color: ${({ theme }) => theme.colors.headingText};
  font-weight: ${tokens.fontWeights.bold};
  letter-spacing: -0.02em;
  font-size: ${({ $variant }) =>
    $variant === "footer" ? tokens.mobile.fontSizes.footerLogo : tokens.mobile.fontSizes.logo};
`;

const LogoSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Logo = ({ iconVisible = true, variant = "header" }: LogoProps) => {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const paths = usePaths();

  return (
    <LogoContainer>
      <LogoLink
        to={paths.home}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
      >
        <LogoWrapper>
          {iconVisible && <LogoIcon ref={iconRef} />}
          <LogoText $variant={variant}>
            Travel<LogoSpan>Mate</LogoSpan>
          </LogoText>
        </LogoWrapper>
      </LogoLink>
    </LogoContainer>
  );
};
