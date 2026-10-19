import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";

export interface DepthCard3DProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  interactive?: boolean;
  className?: string;
}

export const DepthCard3D: React.FC<DepthCard3DProps> = ({
  title = "Interactive 3D Layer",
  subtitle = "Parallax elevation with smooth spring dampening and dynamic specular glare.",
  tag = "3D Transform",
  interactive = true,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for natural dampening
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [14, -14]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-14, 14]),
    springConfig,
  );
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={`perspective-1000 py-4 px-2 flex items-center justify-center ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-sm rounded-2xl bg-[#121215] border border-zinc-800 p-6 shadow-xl transition-colors duration-200 hover:border-zinc-700"
      >
        {/* Subtle Specular Glare Layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-200 overflow-hidden"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 260px at ${gx} ${gy}, rgba(255, 255, 255, 0.08), transparent 70%)`,
            ),
          }}
        />

        {/* Floating Badge (Layer 1: translateZ 30px) */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative flex items-center justify-between mb-5 preserve-3d"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
            <Layers className="w-3 h-3 text-zinc-400" />
            {tag}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">60 FPS</span>
        </div>

        {/* Center Visual Canvas (Layer 2: translateZ 45px) */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="relative h-40 rounded-xl bg-[#18181b] border border-zinc-800 p-4 flex flex-col justify-between overflow-hidden mb-5 preserve-3d"
        >
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>PERSPECTIVE</span>
            <span className="text-zinc-400">READY</span>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-white shadow-sm">
              <Layers className="w-7 h-7 text-zinc-200" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-zinc-800/80 pt-2">
            <span>X: 14° TILT</span>
            <span>Y: 14° TILT</span>
            <span>Z: +45px</span>
          </div>
        </div>

        {/* Content Section (Layer 3: translateZ 20px) */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="preserve-3d space-y-1.5 mb-5"
        >
          <h3 className="text-base font-semibold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">{subtitle}</p>
        </div>

        {/* Action Button (Layer 4: translateZ 35px) */}
        <div style={{ transform: "translateZ(35px)" }} className="preserve-3d">
          <button className="w-full py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm">
            <span>Inspect Component</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default DepthCard3D;
