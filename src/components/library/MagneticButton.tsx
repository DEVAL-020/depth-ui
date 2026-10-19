import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowRight } from "lucide-react";

export interface MagneticButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "glow" | "glass" | "neon";
  magneticStrength?: number;
  withConfetti?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children = "Explore Dimensional UI",
  variant = "primary",
  magneticStrength = 0.35,
  withConfetti = true,
  onClick,
  className = "",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Physics spring for magnetic pull
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * magneticStrength);
    y.set(distanceY * magneticStrength);

    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (withConfetti) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const originX = (rect.left + rect.width / 2) / window.innerWidth;
        const originY = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { x: originX, y: originY },
          colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
        });
      }
    }
    onClick?.();
  };

  const variantStyles = {
    primary:
      "bg-white text-black font-semibold hover:bg-zinc-200 shadow-sm border border-transparent",
    glow: "bg-zinc-900 text-zinc-200 border border-zinc-800 hover:bg-zinc-800 shadow-sm",
    glass:
      "bg-[#18181b] text-zinc-300 border border-zinc-800 hover:bg-zinc-800",
    neon: "bg-black text-white border border-zinc-700 hover:border-zinc-500",
  }[variant];

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium overflow-hidden cursor-pointer transition-colors duration-150 ${variantStyles} ${className}`}
    >
      {/* Dynamic Cursor Light Spot inside button */}
      {isHovered && (
        <span
          className="pointer-events-none absolute w-28 h-28 rounded-full bg-white/10 blur-lg -translate-x-1/2 -translate-y-1/2 transition-opacity"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </motion.button>
  );
};
export default MagneticButton;
