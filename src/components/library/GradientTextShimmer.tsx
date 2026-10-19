import React, { useState } from "react";
import { Sliders, Play, Pause, Copy, Check } from "lucide-react";

export interface GradientTextShimmerProps {
  text?: string;
  theme?: "cyan" | "violet" | "emerald" | "amber";
  speed?: number;
  isPaused?: boolean;
}

const THEMES = {
  cyan: {
    name: "Cyber Cyan",
    gradient: "from-zinc-400 via-cyan-300 via-white to-zinc-400",
    border: "border-cyan-500/30",
    glow: "rgba(6,182,212,0.15)",
  },
  violet: {
    name: "Neon Violet",
    gradient: "from-zinc-400 via-violet-300 via-white to-zinc-400",
    border: "border-violet-500/30",
    glow: "rgba(139,92,246,0.15)",
  },
  emerald: {
    name: "Matrix Emerald",
    gradient: "from-zinc-400 via-emerald-300 via-white to-zinc-400",
    border: "border-emerald-500/30",
    glow: "rgba(16,185,129,0.15)",
  },
  amber: {
    name: "Sunset Amber",
    gradient: "from-zinc-400 via-amber-300 via-white to-zinc-400",
    border: "border-amber-500/30",
    glow: "rgba(245,158,11,0.15)",
  },
};

export const GradientTextShimmerDemo: React.FC = () => {
  const [text, setText] = useState("Build Faster with Production UI Primitives");
  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof THEMES>("cyan");
  const [speed, setSpeed] = useState<number>(3);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeTheme = THEMES[selectedTheme];

  const tailwindSnippet = `className="inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,#a1a1aa,45%,#fff,55%,#a1a1aa)] bg-[length:250%_100%] animate-shimmer"`;

  const copyClasses = () => {
    navigator.clipboard.writeText(tailwindSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Interactive Text Canvas */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] text-center space-y-4">
        {/* Ambient radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeTheme.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Shimmer Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span>Text shimmer preview</span>
        </div>

        {/* Main Shimmer Headline */}
        <div className="relative z-10">
          <h2
            className={`text-2xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient} bg-[length:200%_auto] select-none`}
            style={{
              animation: isPaused
                ? "none"
                : `shimmer ${speed}s linear infinite`,
            }}
          >
            {text}
          </h2>
          <style>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>

        <p className="text-xs text-zinc-500 max-w-md">
          Hardware-accelerated CSS background clipping for high-impact landing
          page titles.
        </p>
      </div>

      {/* Control Studio */}
      <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-semibold text-white">
              Shimmer controls
            </span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700/60 text-zinc-200 text-xs font-medium cursor-pointer transition-colors shadow-xs"
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Pause className="w-3.5 h-3.5 text-zinc-300" />
            )}
            <span>{isPaused ? "Resume animation" : "Pause animation"}</span>
          </button>
        </div>

        {/* Text Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">
            Custom title text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600"
            placeholder="Type your hero headline..."
          />
        </div>

        {/* Theme Palette Switcher */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">
            Color palette
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(THEMES) as (keyof typeof THEMES)[]).map(
              (themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setSelectedTheme(themeKey)}
                  className={`p-2 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                    selectedTheme === themeKey
                      ? "bg-zinc-900 border-zinc-600 text-white shadow-xs"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="text-[11px] font-bold">
                    {THEMES[themeKey].name}
                  </div>
                </button>
              ),
            )}
          </div>
        </div>

        {/* Speed Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-zinc-400">
            <span>Cycle duration</span>
            <span className="text-zinc-200 font-semibold">{speed}s</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-violet-400 cursor-pointer"
          />
        </div>

        {/* Copy Tailwind Code Button */}
        <button
          onClick={copyClasses}
          className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span>
            {copied ? "Copied Tailwind Classes!" : "Copy Tailwind Classes"}
          </span>
        </button>
      </div>
    </div>
  );
};
export default GradientTextShimmerDemo;
