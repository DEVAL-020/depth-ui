import React, { useState } from "react";
import { Flame, ArrowRight, Zap, Check } from "lucide-react";

export interface RadiantButtonProps {
  children: React.ReactNode;
  variant?: "aurora" | "emerald" | "sunset" | "cyber" | "shimmer";
  onClick?: () => void;
  className?: string;
}

export const RadiantButton: React.FC<RadiantButtonProps> = ({
  children,
  variant = "aurora",
  onClick,
  className = "",
}) => {
  const variants = {
    aurora:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-900/30 hover:shadow-violet-700/40 border border-violet-400/30",
    emerald:
      "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg shadow-emerald-950/40 hover:shadow-emerald-700/40 border border-emerald-400/30",
    sunset:
      "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white shadow-lg shadow-rose-950/40 hover:shadow-rose-700/40 border border-rose-400/30",
    cyber:
      "bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/40 hover:shadow-cyan-700/40 border border-cyan-400/30",
    shimmer:
      "relative bg-zinc-900 text-white border border-zinc-700 hover:border-transparent hover:text-white group",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-95 ${variants[variant]} ${className}`}
    >
      {variant === "shimmer" && (
        <span className="absolute -inset-[1.5px] rounded-xl bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-[1px]" />
      )}
      {children}
    </button>
  );
};

export const RadiantButtonDemo: React.FC = () => {
  const [clicked, setClicked] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setClicked(name);
    setTimeout(() => setClicked(null), 1800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 sm:p-7 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-white">
          Radiant Gradient Action Buttons
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Vibrant, colorful action buttons with dynamic lighting and specular
          hover glows.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3.5 pt-2">
        <RadiantButton variant="aurora" onClick={() => handleClick("aurora")}>
          <Flame className="w-4 h-4" />
          <span>Aurora Glow</span>
        </RadiantButton>

        <RadiantButton variant="emerald" onClick={() => handleClick("emerald")}>
          <Zap className="w-4 h-4" />
          <span>Emerald Mint</span>
        </RadiantButton>

        <RadiantButton variant="sunset" onClick={() => handleClick("sunset")}>
          <span>Sunset Flame</span>
          <ArrowRight className="w-4 h-4" />
        </RadiantButton>

        <RadiantButton variant="cyber" onClick={() => handleClick("cyber")}>
          <span>Electric Cyan</span>
        </RadiantButton>

        <RadiantButton variant="shimmer" onClick={() => handleClick("shimmer")}>
          <span>Shimmer Border</span>
        </RadiantButton>
      </div>

      {clicked && (
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>
            Triggered <strong>{clicked}</strong> radiant action!
          </span>
        </div>
      )}
    </div>
  );
};

export default RadiantButtonDemo;
