import { useEffect, useRef } from "react";
import styled from "styled-components";
import { MenuIcon } from "./MenuIcon";
import type { AnimatedIconHandle } from "../../types";

type BurgerMenuProps = {
  open: boolean;
  onToggle: () => void;
  className?: string;
};

const BurgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.navItemHeight};
  height: ${({ theme }) => theme.sizes.navItemHeight};
  border-radius: ${({ theme }) => theme.radii.m};
  color: ${({ theme }) => theme.colors.text.heading};
`;

export const BurgerMenu = ({ open, onToggle, className }: BurgerMenuProps) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    if (open) iconRef.current?.startAnimation();
    else iconRef.current?.stopAnimation();
  }, [open]);

  return (
    <BurgerButton type="button" className={className} onClick={onToggle}>
      <MenuIcon ref={iconRef} size={32} />
    </BurgerButton>
  );
};
