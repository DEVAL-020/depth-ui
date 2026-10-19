import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

export const ColorfulAnalytics: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const segments = [
    {
      label: "Direct Traffic",
      percent: 42,
      color: "#8b5cf6",
      stroke: "stroke-violet-500",
      bg: "bg-violet-500",
      amount: "$48,200",
    },
    {
      label: "Organic Search",
      percent: 28,
      color: "#10b981",
      stroke: "stroke-emerald-400",
      bg: "bg-emerald-400",
      amount: "$32,150",
    },
    {
      label: "Partner Referrals",
      percent: 18,
      color: "#06b6d4",
      stroke: "stroke-cyan-400",
      bg: "bg-cyan-400",
      amount: "$20,680",
    },
    {
      label: "Social Discovery",
      percent: 12,
      color: "#f59e0b",
      stroke: "stroke-amber-400",
      bg: "bg-amber-400",
      amount: "$13,790",
    },
  ];

  // Calculate cumulative stroke dash offset
  const circumference = 2 * Math.PI * 40; // radius = 40
  let cumulative = 0;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 p-6 sm:p-7 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
            REVENUE BREAKDOWN
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">
            Channel Attribution
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/70 text-emerald-400 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+24.8% YOY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* SVG Donut Chart with Vibrant Colors */}
        <div className="relative flex items-center justify-center">
          <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-zinc-800"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Colored Segments */}
            {segments.map((seg, idx) => {
              const dashLength = (seg.percent / 100) * circumference;
              const dashOffset = -((cumulative / 100) * circumference);
              cumulative += seg.percent;
              const isHovered = activeSegment === idx;

              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={isHovered ? 15 : 12}
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setActiveSegment(idx)}
                  onMouseLeave={() => setActiveSegment(null)}
                  className="transition-all duration-300 cursor-pointer"
                />
              );
            })}
          </svg>

          {/* Donut Center Readout */}
          <div className="absolute text-center space-y-0.5 pointer-events-none">
            <span className="text-xs text-zinc-400 font-medium">
              Total Volume
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              $114.8k
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">Q4 2026</span>
          </div>
        </div>

        {/* Legend with Colorful Chips */}
        <div className="space-y-3">
          {segments.map((seg, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveSegment(i)}
              onMouseLeave={() => setActiveSegment(null)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeSegment === i
                  ? "bg-zinc-800/80 border-zinc-700"
                  : "bg-[#18181b] border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${seg.bg} shadow-sm shrink-0`}
                />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    {seg.label}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {seg.amount}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-200">
                {seg.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorfulAnalytics;
