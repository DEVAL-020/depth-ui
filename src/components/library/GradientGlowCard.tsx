import React, { useState } from "react";
import { Layers, ArrowRight } from "lucide-react";

export type ColorPreset = "aurora" | "sunset" | "emerald" | "hyperdrive";

export interface GradientGlowCardProps {
  title?: string;
  description?: string;
  preset?: ColorPreset;
}

export const GradientGlowCard: React.FC<GradientGlowCardProps> = ({
  title = "Collaborative Workspaces",
  description = "High-velocity collaborative canvases with instant edge replication and automated branch staging.",
  preset = "aurora",
}) => {
  const [activePreset, setActivePreset] = useState<ColorPreset>(preset);

  const presets = {
    aurora: {
      name: "Aurora",
      border: "from-violet-500 via-indigo-500 to-cyan-400",
      glow: "rgba(139, 92, 246, 0.25)",
      badge: "bg-violet-950/70 text-violet-300 border-violet-800/60",
      iconBg: "bg-gradient-to-br from-violet-600 to-cyan-500",
      btn: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-900/30",
      pill: "bg-violet-500",
    },
    sunset: {
      name: "Sunset",
      border: "from-amber-500 via-rose-500 to-purple-600",
      glow: "rgba(244, 63, 94, 0.25)",
      badge: "bg-rose-950/70 text-rose-300 border-rose-800/60",
      iconBg: "bg-gradient-to-br from-amber-500 to-rose-600",
      btn: "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white shadow-rose-900/30",
      pill: "bg-rose-500",
    },
    emerald: {
      name: "Emerald Mint",
      border: "from-emerald-400 via-teal-500 to-sky-500",
      glow: "rgba(16, 185, 129, 0.25)",
      badge: "bg-emerald-950/70 text-emerald-300 border-emerald-800/60",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      btn: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-900/30",
      pill: "bg-emerald-500",
    },
    hyperdrive: {
      name: "Electric Cyan",
      border: "from-cyan-400 via-sky-500 to-blue-600",
      glow: "rgba(6, 182, 212, 0.25)",
      badge: "bg-cyan-950/70 text-cyan-300 border-cyan-800/60",
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
      btn: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-900/30",
      pill: "bg-cyan-500",
    },
  };

  const current = presets[activePreset];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Interactive Color Theme Picker */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-mono text-zinc-400">
          Card Color Accent:
        </span>
        <div className="flex items-center gap-1.5 bg-[#18181b] p-1 rounded-xl border border-zinc-800">
          {(Object.keys(presets) as ColorPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => setActivePreset(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activePreset === key
                  ? "bg-zinc-800 text-white shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${presets[key].pill}`} />
              <span>{presets[key].name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The Gradient Border Card */}
      <div className="relative group p-[1.5px] rounded-2xl overflow-hidden transition-all duration-300">
        {/* Animated Gradient Border */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${current.border} rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Ambient Glow */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-40 group-hover:opacity-75 blur-xl transition-all duration-500 pointer-events-none"
          style={{ background: current.glow }}
        />

        {/* Card Body */}
        <div className="relative rounded-2xl bg-[#0e0e11] p-6 sm:p-7 space-y-5 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-xl ${current.iconBg} flex items-center justify-center text-white shadow-md`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${current.badge}`}
              >
                Featured Block
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${current.btn}`}
            >
              <span>Explore Capability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGlowCard;
