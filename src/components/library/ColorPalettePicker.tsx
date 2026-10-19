import React, { useState } from "react";
import { Copy, Check, Palette } from "lucide-react";

export interface ColorToken {
  name: string;
  hex: string;
  hsl: string;
  bgClass: string;
  ringClass: string;
  role: string;
}

export const ColorPalettePicker: React.FC = () => {
  const tokens: ColorToken[] = [
    {
      name: "Electric Violet",
      hex: "#8B5CF6",
      hsl: "262, 83%, 58%",
      bgClass: "bg-violet-500",
      ringClass: "ring-violet-500",
      role: "Primary Brand & Accents",
    },
    {
      name: "Emerald Mint",
      hex: "#10B981",
      hsl: "160, 84%, 39%",
      bgClass: "bg-emerald-500",
      ringClass: "ring-emerald-500",
      role: "Success & Revenue",
    },
    {
      name: "Cyber Cyan",
      hex: "#06B6D4",
      hsl: "189, 94%, 43%",
      bgClass: "bg-cyan-500",
      ringClass: "ring-cyan-500",
      role: "Tech & Interactive",
    },
    {
      name: "Sky Azure",
      hex: "#0EA5E9",
      hsl: "199, 89%, 48%",
      bgClass: "bg-sky-500",
      ringClass: "ring-sky-500",
      role: "Links & Active States",
    },
    {
      name: "Sunset Rose",
      hex: "#F43F5E",
      hsl: "350, 89%, 60%",
      bgClass: "bg-rose-500",
      ringClass: "ring-rose-500",
      role: "Destructive & Critical",
    },
    {
      name: "Amber Flame",
      hex: "#F59E0B",
      hsl: "38, 92%, 50%",
      bgClass: "bg-amber-500",
      ringClass: "ring-amber-500",
      role: "Attention & Warnings",
    },
    {
      name: "Neon Fuchsia",
      hex: "#D946EF",
      hsl: "292, 84%, 61%",
      bgClass: "bg-fuchsia-500",
      ringClass: "ring-fuchsia-500",
      role: "Creative Highlights",
    },
  ];

  const [selectedToken, setSelectedToken] = useState<ColorToken>(tokens[0]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 sm:p-7 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            DESIGN SYSTEM TOKENS
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">
            Vibrant Color Palette
          </h3>
        </div>
        <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
          <Palette className="w-4 h-4" />
        </div>
      </div>

      {/* Interactive Swatches Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {tokens.map((token) => {
          const isSelected = selectedToken.hex === token.hex;
          return (
            <button
              key={token.hex}
              onClick={() => setSelectedToken(token)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center gap-2 ${
                isSelected
                  ? "bg-zinc-800 border-zinc-500 ring-2 ring-white/30 scale-105"
                  : "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl ${token.bgClass} shadow-md`}
              />
              <div className="text-center">
                <span className="text-[11px] font-semibold text-white block truncate w-16">
                  {token.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block">
                  {token.hex}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Color Inspector & 1-Click Copy */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#18181b] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-xl ${selectedToken.bgClass} shadow-lg shrink-0`}
          />
          <div>
            <h4 className="text-sm font-bold text-white">
              {selectedToken.name}
            </h4>
            <p className="text-xs text-zinc-400">{selectedToken.role}</p>
            <span className="text-[11px] font-mono text-zinc-500">
              HSL: {selectedToken.hsl}
            </span>
          </div>
        </div>

        <button
          onClick={() => handleCopy(selectedToken.hex)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm font-mono text-white border border-zinc-700 transition-colors cursor-pointer"
        >
          {copiedHex === selectedToken.hex ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">
                Copied {selectedToken.hex}!
              </span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-zinc-400" />
              <span>Copy {selectedToken.hex}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ColorPalettePicker;
