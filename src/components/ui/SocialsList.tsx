import styled from "styled-components";
import { socials } from "../../data/socials";

const SocialsListStyled = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.mobile.spacing.m};
`;

const SocialLink = styled.a`
  display: flex;
  color: ${({ theme }) => theme.colors.headingText};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialIcon = styled.svg`
  width: ${({ theme }) => theme.mobile.sizes.socialIcon};
  height: ${({ theme }) => theme.mobile.sizes.socialIcon};
`;

export const SocialsList = () => {
  return (
    <SocialsListStyled>
      {socials.map(({ name, href, Icon }) => (
        <li key={name}>
          <SocialLink href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
            <SocialIcon as={Icon} />
          </SocialLink>
        </li>
      ))}
    </SocialsListStyled>
  );
};
