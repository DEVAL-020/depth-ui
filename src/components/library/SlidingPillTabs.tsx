import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Shield, Terminal, Zap, Layers } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const SlidingPillTabsDemo: React.FC = () => {
  const tabs: TabItem[] = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "primitives", label: "Primitives", icon: Layers, badge: "44+" },
    { id: "animation", label: "Motion Engine", icon: Zap },
    { id: "security", label: "Enterprise Auth", icon: Shield },
    { id: "cli", label: "CLI & Docs", icon: Terminal },
  ];

  const [activeTab, setActiveTab] = useState("primitives");
  const [pillTheme, setPillTheme] = useState<"white" | "cyan" | "violet">(
    "white",
  );

  const themeStyles = {
    white: {
      pill: "bg-white text-black shadow-lg shadow-white/10",
      activeText: "text-black font-semibold",
      inactiveText: "text-zinc-400 hover:text-white",
    },
    cyan: {
      pill: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/50",
      activeText: "text-white font-semibold",
      inactiveText: "text-zinc-400 hover:text-cyan-300",
    },
    violet: {
      pill: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-950/50",
      activeText: "text-white font-semibold",
      inactiveText: "text-zinc-400 hover:text-violet-300",
    },
  };

  const activeTheme = themeStyles[pillTheme];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Sliding Pill Navigation Bar */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0f0f14] border border-zinc-800 shadow-2xl flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-1.5">
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
            LAYOUTID SPRING ANIMATION
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Sliding Pill Segmented Tabs
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Zero-jitter floating background glider using Framer Motion layoutId
            with spring elasticity.
          </p>
        </div>

        {/* Tab Container */}
        <div className="p-1.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 shadow-inner flex flex-wrap items-center justify-center gap-1.5 max-w-full overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 select-none z-10 ${
                  isActive ? activeTheme.activeText : activeTheme.inactiveText
                }`}
              >
                {/* Active Sliding Background Glider */}
                {isActive && (
                  <motion.div
                    layoutId="slidingPillGlider"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-xl -z-10 ${activeTheme.pill}`}
                  />
                )}

                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-black/15 text-current font-bold"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel Card */}
        <div className="w-full max-w-xl p-6 rounded-2xl bg-[#14141a] border border-zinc-800/80 text-left space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
              Active View: {activeTab}
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              60 FPS Hardware Glider
            </span>
          </div>
          <h4 className="text-sm font-bold text-white capitalize">
            {activeTab} Content Segment
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Content renders seamlessly without horizontal re-flow or jarring
            state flashes. Ideal for dashboards, settings menus, and product
            showcases.
          </p>
        </div>
      </div>

      {/* Theme Controller */}
      <div className="p-4 rounded-xl bg-[#121217] border border-zinc-800 flex items-center justify-between text-xs">
        <span className="text-zinc-400">Glider Pill Variant:</span>
        <div className="flex items-center gap-2">
          {(["white", "cyan", "violet"] as const).map((thm) => (
            <button
              key={thm}
              onClick={() => setPillTheme(thm)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                pillTheme === thm
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {thm}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SlidingPillTabsDemo;
