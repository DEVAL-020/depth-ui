import React, { useState } from "react";
import {
  GitCommit,
  CheckCircle2,
  Clock,
  CircleDashed,
  Calendar,
} from "lucide-react";

export interface RoadmapItem {
  id: string;
  version: string;
  date: string;
  status: "released" | "in-progress" | "planned";
  title: string;
  description: string;
  changes: string[];
  badge?: string;
}

const ROADMAP_DATA: RoadmapItem[] = [
  {
    id: "v2-4",
    version: "v2.4.0",
    date: "October 2026",
    status: "released",
    title: "Spatial 3D & Advanced Physics Primitives",
    description:
      "Introduced Three.js particle wave canvas, 6-face CSS 3D feature cube, and physical iridescent Torus Knot.",
    changes: [
      "Added WaveMeshCanvas3D with dual-harmonic sine mathematics",
      "Added Interactive3DCube with drag rotation and face snapping",
      "Refactored top loading bar with realistic route progress simulation",
    ],
    badge: "Latest Stable",
  },
  {
    id: "v2-5",
    version: "v2.5.0",
    date: "November 2026",
    status: "in-progress",
    title: "Developer Productivity & Command Hotkeys",
    description:
      "Native keyboard shortcuts engine, mechanical keycaps visual suite, and multi-factor OTP pin inputs.",
    changes: [
      "Physical keyboard keycap event listener suite",
      "Accessible 6-digit OTP verification with auto-advance and clipboard paste",
      "Drag-and-drop file upload queue with real progress tracking",
    ],
    badge: "In Active Sprint",
  },
  {
    id: "v3-0",
    version: "v3.0.0",
    date: "Q1 2027",
    status: "planned",
    title: "Autonomous Theme Generator & Token Compiler",
    description:
      "Zero-runtime design token export to CSS variables, Tailwind config, and Figma token formats.",
    changes: [
      "One-click multi-theme export for Tailwind v3 and v4",
      "Custom shader graph editor for React Three Fiber",
      "WCAG AAA auto-contrast compliance validator",
    ],
    badge: "Upcoming",
  },
];

export const TimelineRoadmapDemo: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "released" | "in-progress" | "planned"
  >("all");
  const [expandedId, setExpandedId] = useState<string | null>("v2-4");

  const filteredItems = ROADMAP_DATA.filter((item) =>
    filter === "all" ? true : item.status === filter,
  );

  const getStatusBadge = (status: RoadmapItem["status"]) => {
    switch (status) {
      case "released":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Shipped</span>
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Clock className="w-3 h-3 animate-pulse" />
            <span>In Development</span>
          </span>
        );
      case "planned":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 border border-zinc-700 text-zinc-400">
            <CircleDashed className="w-3 h-3" />
            <span>Planned</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#111116] border border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Release Roadmap
            </h4>
            <p className="text-[11px] text-zinc-400">
              Changelog and milestone progression
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          {(["all", "released", "in-progress", "planned"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all capitalize cursor-pointer ${
                  filter === tab
                    ? "bg-zinc-800 text-white shadow-xs font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab === "all" ? "All" : tab.replace("-", " ")}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-cyan-500 before:to-zinc-800">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="relative group">
              {/* Node Marker */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all ${
                  item.status === "released"
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    : item.status === "in-progress"
                      ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "bg-zinc-900 border-zinc-700 text-zinc-500"
                }`}
              >
                {item.status === "released" ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : item.status === "in-progress" ? (
                  <Clock className="w-3.5 h-3.5" />
                ) : (
                  <CircleDashed className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Card Body */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isExpanded
                    ? "bg-[#13131a] border-zinc-700 shadow-xl"
                    : "bg-[#101014] border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs font-bold text-white">
                      {item.version}
                    </span>
                    <span className="text-[11px] text-zinc-500">•</span>
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {item.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.status)}
                    {item.badge && (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Collapsible Changes List */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2 animate-in fade-in duration-150">
                    <div className="text-xs font-medium text-zinc-400">
                      Key highlights &amp; updates
                    </div>
                    <ul className="space-y-1.5">
                      {item.changes.map((change, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-zinc-300"
                        >
                          <span className="text-cyan-400 mt-0.5 font-bold">
                            ›
                          </span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TimelineRoadmapDemo;
