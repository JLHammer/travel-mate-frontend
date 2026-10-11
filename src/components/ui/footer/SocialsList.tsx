import styled from "styled-components";
import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useSiteSettings } from "../../../hooks/useSiteSettings";
import { useTranslation } from "../../../hooks/useTranslation";
import { tokens } from "../../../styles/theme";
import type { SocialLink as SocialLinkData } from "../../../types";

// One entry per platform an editor can pick in the Studio
const PLATFORMS: Record<SocialLinkData["platform"], { name: string; Icon: IconType }> = {
  instagram: { name: "Instagram", Icon: FaInstagram },
  facebook: { name: "Facebook", Icon: FaFacebook },
  youtube: { name: "YouTube", Icon: FaYoutube },
  tiktok: { name: "TikTok", Icon: FaTiktok },
  x: { name: "X", Icon: FaXTwitter },
  linkedin: { name: "LinkedIn", Icon: FaLinkedin },
  pinterest: { name: "Pinterest", Icon: FaPinterest },
};

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
  const { t } = useTranslation();
  const { socials } = useSiteSettings();

  if (socials.length === 0) return null;

  return (
    <SocialsListStyled>
      {socials.map(({ _key, platform, url }) => (
        <li key={_key}>
          <SocialLink
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.nav.socialLink(PLATFORMS[platform].name)}
          >
            <SocialIcon as={PLATFORMS[platform].Icon} aria-hidden />
          </SocialLink>
        </li>
      ))}
    </SocialsListStyled>
  );
};
