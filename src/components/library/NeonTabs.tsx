import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Box, Settings, Activity } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  count?: number;
}

export interface NeonTabsProps {
  tabs?: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  accentColor?: string;
  className?: string;
}

const defaultTabs: TabItem[] = [
  { id: "all", label: "Overview", icon: Box, count: 12 },
  { id: "components", label: "Components", icon: Layers, count: 8 },
  { id: "activity", label: "Activity", icon: Activity, count: 3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const NeonTabs: React.FC<NeonTabsProps> = ({
  tabs = defaultTabs,
  defaultTab = "all",
  onChange,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={`flex items-center justify-center p-1 ${className}`}>
      <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#121215] border border-zinc-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                onChange?.(tab.id);
              }}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 flex items-center gap-2 cursor-pointer ${
                isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-active-pill"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  className="absolute inset-0 rounded-lg bg-zinc-800 shadow-xs"
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? "bg-zinc-700 text-white"
                        : "bg-zinc-900 text-zinc-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default NeonTabs;
