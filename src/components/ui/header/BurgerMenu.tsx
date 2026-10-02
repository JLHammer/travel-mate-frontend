import { useEffect, useRef } from "react";
import styled from "styled-components";
import { MenuIcon } from "../icons/MenuIcon";
import type { AnimatedIconHandle } from "../../../types";

type BurgerMenuProps = {
  open: boolean;
  onToggle: () => void;
  className?: string;
};

const BurgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.mobile.sizes.navItemHeight};
  height: ${({ theme }) => theme.mobile.sizes.navItemHeight};
  border-radius: ${({ theme }) => theme.radii.button};
  color: ${({ theme }) => theme.colors.headingText};
`;

export const BurgerMenu = ({ open, onToggle, className }: BurgerMenuProps) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    if (open) iconRef.current?.startAnimation();
    else iconRef.current?.stopAnimation();
  }, [open]);

  return (
    <BurgerButton type="button" className={className} onClick={onToggle}>
      <MenuIcon ref={iconRef} size={40} />
    </BurgerButton>
  );
};
