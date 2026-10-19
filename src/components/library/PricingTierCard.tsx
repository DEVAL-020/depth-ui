import React, { useState } from "react";
import { Check, Star, ArrowRight } from "lucide-react";

export const PricingTierCard: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const features = [
    "Unlimited custom UI components",
    "Full source code with TypeScript types",
    "Interactive 3D primitives & canvas physics",
    "Commercial license for client websites",
    "Private Slack channel with core maintainers",
    "Production-ready responsive layouts & templates",
  ];

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 p-1">
      {/* Billing Schedule Toggle */}
      <div className="flex items-center justify-center gap-3 select-none">
        <button
          type="button"
          onClick={() => setIsAnnual(false)}
          className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            !isAnnual
              ? "text-white font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={isAnnual}
          onClick={() => setIsAnnual(!isAnnual)}
          className={`w-12 h-6.5 rounded-full transition-all duration-200 relative cursor-pointer p-0.5 border ${
            isAnnual
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-500/80 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
              : "bg-zinc-800 border-zinc-700/80 hover:border-zinc-650"
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full bg-white shadow-md block transform transition-transform duration-200 ease-out ${
              isAnnual ? "translate-x-[22px]" : "translate-x-0"
            }`}
          />
        </button>
        <button
          type="button"
          onClick={() => setIsAnnual(true)}
          className={`text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            isAnnual
              ? "text-white font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span>Annual</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Save 25%
          </span>
        </button>
      </div>

      {/* Featured Pricing Tier Card */}
      <div className="relative group p-[1.5px] rounded-3xl overflow-hidden shadow-2xl">
        {/* Colorful Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-3xl opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Ambient Blur Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-cyan-600/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

        {/* Card Body */}
        <div className="relative rounded-[23px] bg-[#0c0c0f] p-6 sm:p-8 space-y-6">
          {/* Header & Badge */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-violet-400">
                PRO MEMBERSHIP
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Design System Pro
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              <span>Most Popular</span>
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 pb-2 border-b border-zinc-800/80">
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
              ${isAnnual ? "29" : "39"}
            </span>
            <span className="text-sm text-zinc-400">/ month</span>
            {isAnnual && (
              <span className="text-xs text-zinc-500 ml-2 font-mono">
                billed annually ($348)
              </span>
            )}
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block">
              Everything included:
            </span>
            <ul className="space-y-2.5">
              {features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-950/50 transition-all">
              <span>Get Instant Pro Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-zinc-500 mt-2">
              7-day money back guarantee &bull; Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTierCard;
