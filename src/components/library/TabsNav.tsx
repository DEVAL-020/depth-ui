import React, { useState } from "react";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "pills" | "underline" | "boxed";
}

export const TabsNav: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "pills",
}) => {
  if (variant === "underline") {
    return (
      <div className="flex border-b border-zinc-800 gap-6">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={`relative pb-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              } ${tab.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="underline-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Pills variant
  return (
    <div className="inline-flex p-1 rounded-xl bg-[#18181b] border border-zinc-800 gap-1 overflow-x-auto max-w-full">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
              isActive
                ? "text-black font-semibold"
                : "text-zinc-400 hover:text-white"
            } ${tab.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {isActive && (
              <motion.div
                layoutId="pill-active-bg"
                className="absolute inset-0 bg-white rounded-lg shadow-xs"
                transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-zinc-200 text-black"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export const TabsNavDemo: React.FC = () => {
  const [activePill, setActivePill] = useState("overview");
  const [activeUnderline, setActiveUnderline] = useState("account");

  const sampleTabs: TabItem[] = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics", badge: "Live" },
    { id: "reports", label: "Reports", badge: 12 },
    { id: "notifications", label: "Notifications", badge: 3 },
  ];

  const settingsTabs: TabItem[] = [
    { id: "account", label: "General Account" },
    { id: "security", label: "Security & 2FA" },
    { id: "billing", label: "Billing & Invoices" },
    { id: "team", label: "Team Members" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      {/* Pill Segmented Tabs */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Segmented Pill Switcher
        </span>
        <div>
          <TabsNav
            tabs={sampleTabs}
            activeTab={activePill}
            onChange={setActivePill}
            variant="pills"
          />
        </div>
      </div>

      {/* Underline Tabs */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Underline Navigation Bar
        </span>
        <TabsNav
          tabs={settingsTabs}
          activeTab={activeUnderline}
          onChange={setActiveUnderline}
          variant="underline"
        />
      </div>

      <div className="p-4 rounded-xl bg-[#18181b] border border-zinc-800 text-xs text-zinc-400">
        <p className="font-medium text-white mb-1">
          Viewing: <span className="text-zinc-300 font-mono">{activePill}</span>{" "}
          &rarr;{" "}
          <span className="text-zinc-300 font-mono">{activeUnderline}</span>
        </p>
        <p className="text-[11px] text-zinc-500">
          Tabs maintain full keyboard accessibility and smooth animated
          indicator position tracking.
        </p>
      </div>
    </div>
  );
};

export default TabsNavDemo;
