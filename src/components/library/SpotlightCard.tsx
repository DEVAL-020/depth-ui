import React, { useRef, useState } from "react";
import { Terminal, Cpu } from "lucide-react";

export interface SpotlightCardProps {
  title?: string;
  description?: string;
  spotlightColor?: string;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title = "Interactive Spotlight",
  description = "Subtle radial illumination tracking cursor movement across card borders and surfaces.",
  spotlightColor = "rgba(255, 255, 255, 0.06)",
  badge = "Card",
  className = "",
  children,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-2xl border border-zinc-800 bg-[#121215] p-6 overflow-hidden transition-colors hover:border-zinc-700 shadow-sm ${className}`}
    >
      {/* Background radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-200"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />

      {/* Border glow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200"
        style={{
          opacity,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          maskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
            <Cpu className="w-4 h-4 text-zinc-300" />
          </div>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
            {badge}
          </span>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white mb-1 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
        </div>

        {children ? (
          <div>{children}</div>
        ) : (
          <div className="rounded-lg bg-[#18181b] border border-zinc-800 p-2.5 font-mono text-xs text-zinc-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>spotlight: &quot;cursor-track&quot;;</span>
            </div>
            <span className="text-[10px] text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
              ACTIVE
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default SpotlightCard;
