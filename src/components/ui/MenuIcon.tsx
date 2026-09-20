import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { forwardRef } from "react";
import { useAnimatedIcon } from "../../hooks/useAnimatedIcon";
import type { AnimatedIconHandle, AnimatedIconProps } from "../../types";

const LINES = [
  { id: 1, y: 6 },
  { id: 2, y: 12 },
  { id: 3, y: 18 },
];

const LINE_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  animate: (custom: number) => ({
    rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
    y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
    opacity: custom === 2 ? 0 : 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
};

const MenuIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const { controls, hoverProps } = useAnimatedIcon(ref, {
      onMouseEnter,
      onMouseLeave,
    });

    return (
      <div {...props} {...hoverProps}>
        <svg
          style={{ display: "block" }}
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {LINES.map(({ id, y }) => (
            <motion.line
              key={id}
              animate={controls}
              custom={id}
              initial="normal"
              variants={LINE_VARIANTS}
              x1="4"
              x2="20"
              y1={y}
              y2={y}
            />
          ))}
        </svg>
      </div>
    );
  },
);

MenuIcon.displayName = "MenuIcon";

export { MenuIcon };
