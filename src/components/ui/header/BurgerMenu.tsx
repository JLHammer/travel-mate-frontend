import { useEffect, useRef } from "react";
import styled from "styled-components";
import { MenuIcon } from "../icons/MenuIcon";
import { useTranslation } from "../../../hooks/useTranslation";
import type { AnimatedIconHandle } from "../../../types";
import { tokens } from "../../../styles/theme";

type BurgerMenuProps = {
  open: boolean;
  controls: string;
  onToggle: () => void;
};

const BurgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  transition:
    background-color ${tokens.transitions.fast},
    color ${tokens.transitions.fast};

  width: ${tokens.mobile.sizes.pillHeight};
  height: ${tokens.mobile.sizes.pillHeight};

  svg {
    width: ${tokens.mobile.sizes.headerIcon};
    height: ${tokens.mobile.sizes.headerIcon};
  }

  ${tokens.media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.onPrimary};
    }
  }
`;

export const BurgerMenu = ({ open, controls, onToggle }: BurgerMenuProps) => {
  const { t } = useTranslation();
  const iconRef = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    if (open) iconRef.current?.startAnimation();
    else iconRef.current?.stopAnimation();
  }, [open]);

  return (
    // Label stays "Menu", aria-expanded tells if it's open
    <BurgerButton
      type="button"
      aria-label={t.nav.menu}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
    >
      <MenuIcon ref={iconRef} />
    </BurgerButton>
  );
};
