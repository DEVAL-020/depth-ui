import React, { useState } from "react";
import { Check, Minus, Info } from "lucide-react";

export interface PlanFeature {
  name: string;
  tooltip?: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export interface FeatureCategory {
  title: string;
  features: PlanFeature[];
}

const COMPARISON_CATEGORIES: FeatureCategory[] = [
  {
    title: "Component Library & Primitives",
    features: [
      {
        name: "Accessible UI Primitives",
        starter: "25 Primitives",
        pro: "50+ Primitives",
        enterprise: "All + Bespoke",
        tooltip: "Pre-styled accessible React components with Tailwind CSS",
      },
      {
        name: "3D WebGL & Particle Canvases",
        starter: false,
        pro: true,
        enterprise: true,
        tooltip:
          "Three.js wave mesh, floating torus knots, and interactive 3D cubes",
      },
      {
        name: "Motion & Physics Springs",
        starter: "Basic Framer",
        pro: "Advanced Springs",
        enterprise: "Custom Physics",
        tooltip:
          "Fluid magnetic cursors, spatial tilt cards, and number rollups",
      },
    ],
  },
  {
    title: "Developer Experience & Tooling",
    features: [
      {
        name: "CLI Component Injector",
        starter: true,
        pro: true,
        enterprise: true,
        tooltip:
          "Instant code insertion directly into your local src directory",
      },
      {
        name: "TypeScript Definitions",
        starter: true,
        pro: true,
        enterprise: true,
        tooltip: "Zero-any strict type declarations out of the box",
      },
      {
        name: "Figma Token Sync",
        starter: false,
        pro: true,
        enterprise: true,
        tooltip: "Bi-directional design token export to CSS & Tailwind config",
      },
    ],
  },
  {
    title: "Support & Infrastructure",
    features: [
      {
        name: "Commercial Production License",
        starter: "Single Project",
        pro: "Unlimited Projects",
        enterprise: "Multi-Org Enterprise",
      },
      {
        name: "Support Response SLA",
        starter: "Community Discord",
        pro: "24h Developer Email",
        enterprise: "Dedicated Slack Channel",
      },
    ],
  },
];

export const FeatureComparisonTableDemo: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual",
  );
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const renderValue = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <Check className="w-3.5 h-3.5" />
        </div>
      ) : (
        <div className="text-zinc-600 flex items-center justify-center mx-auto">
          <Minus className="w-4 h-4" />
        </div>
      );
    }
    return <span className="text-xs font-medium text-zinc-300">{val}</span>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Billing Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#111116] border border-zinc-800">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Feature Matrix &amp; Plans
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Transparent breakdown across team tiers
          </p>
        </div>

        {/* Monthly / Annual Pill Toggle */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-zinc-800 text-white font-semibold shadow-xs"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              billingCycle === "annual"
                ? "bg-cyan-500 text-black font-semibold shadow-xs"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>Annual</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                billingCycle === "annual"
                  ? "bg-black/20 text-black font-bold"
                  : "bg-emerald-500/20 text-emerald-400"
              }`}
            >
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Comparison Table Container */}
      <div className="rounded-3xl bg-[#111116] border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            {/* Table Header / Plans */}
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/60">
                <th className="p-5 text-xs font-semibold text-zinc-400 w-2/5">
                  Tier Highlights
                </th>
                <th className="p-5 text-center w-1/5">
                  <div className="text-xs font-bold text-white">Starter</div>
                  <div className="text-sm font-extrabold text-zinc-300 font-mono mt-0.5">
                    Free
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    For indie hackers
                  </div>
                </th>
                <th className="p-5 text-center w-1/5 relative bg-cyan-950/20 border-x border-cyan-500/30">
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-b-md bg-cyan-500 text-black font-mono font-bold text-[9px] uppercase tracking-wider">
                    Most Popular
                  </span>
                  <div className="text-xs font-bold text-cyan-400 pt-1">
                    Pro Suite
                  </div>
                  <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                    {billingCycle === "annual" ? "$19/mo" : "$24/mo"}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    All 50+ primitives
                  </div>
                </th>
                <th className="p-5 text-center w-1/5">
                  <div className="text-xs font-bold text-white">Enterprise</div>
                  <div className="text-sm font-extrabold text-zinc-300 font-mono mt-0.5">
                    Custom
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    For engineering orgs
                  </div>
                </th>
              </tr>
            </thead>

            {/* Categorized Rows */}
            <tbody className="divide-y divide-zinc-800/60">
              {COMPARISON_CATEGORIES.map((category, catIdx) => (
                <React.Fragment key={catIdx}>
                  <tr className="bg-zinc-900/40">
                    <td
                      colSpan={4}
                      className="px-5 py-2.5 text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider"
                    >
                      {category.title}
                    </td>
                  </tr>

                  {category.features.map((feature, fIdx) => (
                    <tr
                      key={fIdx}
                      className="hover:bg-zinc-900/20 transition-colors"
                    >
                      <td className="p-4 px-5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium text-zinc-200">
                            {feature.name}
                          </span>
                          {feature.tooltip && (
                            <div className="relative group inline-block">
                              <Info
                                className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                                onMouseEnter={() =>
                                  setActiveTooltip(feature.name)
                                }
                                onMouseLeave={() => setActiveTooltip(null)}
                              />
                              {activeTooltip === feature.name && (
                                <div className="absolute left-6 -top-2 w-48 p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-[11px] text-zinc-300 shadow-xl z-20 pointer-events-none">
                                  {feature.tooltip}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {renderValue(feature.starter)}
                      </td>
                      <td className="p-4 text-center bg-cyan-950/10 border-x border-cyan-500/20">
                        {renderValue(feature.pro)}
                      </td>
                      <td className="p-4 text-center">
                        {renderValue(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Action Buttons Row */}
              <tr className="bg-zinc-950/40">
                <td className="p-5 text-xs text-zinc-500 font-mono">
                  Select Plan
                </td>
                <td className="p-5 text-center">
                  <button className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer">
                    Install Free
                  </button>
                </td>
                <td className="p-5 text-center bg-cyan-950/20 border-x border-cyan-500/30">
                  <button className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-colors cursor-pointer shadow-md">
                    Start Pro Trial
                  </button>
                </td>
                <td className="p-5 text-center">
                  <button className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer">
                    Contact Us
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default FeatureComparisonTableDemo;
