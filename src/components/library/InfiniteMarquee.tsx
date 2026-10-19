import React from "react";
import { motion } from "framer-motion";
import { Layers, Palette, Zap, Box, Code2, Check, Shield } from "lucide-react";

export interface MarqueeItem {
  name: string;
  icon: React.ElementType;
}

export interface InfiniteMarqueeProps {
  items?: MarqueeItem[];
  speed?: number;
  tilt?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

const defaultMarqueeItems: MarqueeItem[] = [
  { name: "Accessible", icon: Shield },
  { name: "Customizable", icon: Layers },
  { name: "Type Safe", icon: Code2 },
  { name: "Keyboard Nav", icon: Box },
  { name: "Self-Contained", icon: Check },
  { name: "Light & Dark", icon: Palette },
  { name: "Production Ready", icon: Zap },
];

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items = defaultMarqueeItems,
  speed = 25,
  tilt = false,
  pauseOnHover = true,
  className = "",
}) => {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-3 ${
        tilt ? "transform -rotate-1 skew-x-1" : ""
      } ${className}`}
    >
      {/* Left and Right Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#09090b] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#09090b] to-transparent" />

      {/* Infinite Rolling Track */}
      <motion.div
        className="flex items-center gap-3 w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#121215] border border-zinc-800 text-zinc-300 text-xs font-medium select-none shadow-xs"
            >
              <Icon className="w-3.5 h-3.5 text-zinc-400" />
              <span>{item.name}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
export default InfiniteMarquee;
