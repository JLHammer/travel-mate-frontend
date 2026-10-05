import styled from "styled-components";
import { socials } from "../../../data/socials";
import { tokens } from "../../../styles/theme";

const SocialsListStyled = styled.ul`
  display: flex;
  justify-content: center;
  gap: ${tokens.mobile.spacing.l};
`;

const SocialLink = styled.a`
  display: flex;
  color: ${({ theme }) => theme.colors.headingText};
  transition: color ${tokens.transitions.fast};

  ${tokens.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialIcon = styled.svg`
  width: ${tokens.mobile.sizes.socialIcon};
  height: ${tokens.mobile.sizes.socialIcon};
`;

export const SocialsList = () => {
  return (
    <SocialsListStyled>
      {socials.map(({ name, href, Icon }) => (
        <li key={name}>
          <SocialLink href={href} target="_blank" rel="noopener noreferrer">
            <SocialIcon as={Icon} />
          </SocialLink>
        </li>
      ))}
    </SocialsListStyled>
  );
};
