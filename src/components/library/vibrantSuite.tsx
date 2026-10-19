import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Check,
  Flame,
  Zap,
  TrendingUp,
  X,
  Copy,
  Palette,
} from "lucide-react";

// 1. Glassmorphic Card
export const GlassmorphicCardDemo: React.FC = () => {
  return (
    <div className="relative p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden max-w-md mx-auto group">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

      <div className="relative z-10 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
          <Sparkles className="w-6 h-6 text-violet-300" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Frosted Glass
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Frosted Glass Surface
          </h3>
          <p className="text-xs text-zinc-300/80 leading-relaxed">
            Multi-layered backdrop blur with dynamic ambient specular highlights
            and border diffusion.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
          <span className="text-zinc-400">Backdrop Filter: 24px</span>
          <button className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Gradient Badge Group
export const GradientBadgeGroupDemo: React.FC = () => {
  const [selected, setSelected] = useState<string>("runtime");
  const badges = [
    {
      id: "runtime",
      label: "Edge Runtime",
      color: "from-violet-500 to-indigo-500",
      glow: "rgba(139,92,246,0.3)",
    },
    {
      id: "edge",
      label: "Global Edge",
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(6,182,212,0.3)",
    },
    {
      id: "perf",
      label: "120 FPS Turbo",
      color: "from-emerald-400 to-teal-500",
      glow: "rgba(16,185,129,0.3)",
    },
    {
      id: "crypto",
      label: "Zero-Knowledge",
      color: "from-amber-400 to-rose-500",
      glow: "rgba(245,158,11,0.3)",
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 p-6 rounded-2xl bg-[#111116] border border-zinc-800">
      {badges.map((b) => (
        <button
          key={b.id}
          onClick={() => setSelected(b.id)}
          style={{
            boxShadow: selected === b.id ? `0 0 16px ${b.glow}` : undefined,
          }}
          className={`p-[1px] rounded-full transition-all duration-300 cursor-pointer ${
            selected === b.id ? "scale-105" : "opacity-70 hover:opacity-100"
          }`}
        >
          <div
            className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${b.color} text-white text-xs font-semibold flex items-center gap-1.5`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs animate-pulse" />
            <span>{b.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

// 3. Aurora Background
export const AuroraBackgroundDemo: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg h-56 rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center text-center p-6 shadow-2xl">
      {/* Aurora Ambient Meshes */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-gradient-to-tl from-cyan-500/40 via-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/40 to-zinc-950" />

      <div className="relative z-10 space-y-2">
        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-zinc-200 border border-white/15">
          Aurora Fluid Mesh
        </span>
        <h4 className="text-xl font-extrabold text-white tracking-tight">
          Vibrant Atmospheric Glow
        </h4>
        <p className="text-xs text-zinc-400 max-w-xs mx-auto">
          Hardware-accelerated CSS blur gradients designed for high-impact hero
          headers.
        </p>
      </div>
    </div>
  );
};

// 4. Glow Action Card
export const GlowActionCardDemo: React.FC = () => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative p-6 sm:p-7 rounded-2xl bg-[#111116] border border-violet-500/30 hover:border-violet-500/60 shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Instant Deployment</h4>
            <span className="text-[11px] text-zinc-400">
              Zero-config infrastructure
            </span>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          99.99% SLA
        </span>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed">
        Deploy globally distributed micro-services in under 300ms with automatic
        failover and TLS encryption.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Flame className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Provisioned!" : "Deploy to Cloud"}</span>
        </button>
      </div>
    </div>
  );
};

// 5. Spotlight Pricing
export const SpotlightPricingDemo: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-3xl bg-[#121217] border-2 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.2)] space-y-5 relative">
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/40">
          Most Popular
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className="text-xs text-zinc-400 hover:text-white font-medium cursor-pointer underline"
        >
          {annual ? "Annual (20% off)" : "Monthly"}
        </button>
      </div>

      <div>
        <h4 className="text-xl font-bold text-white">Startup Pro</h4>
        <p className="text-xs text-zinc-400 mt-0.5">
          Everything you need to launch and scale.
        </p>
      </div>

      <div className="flex items-baseline gap-1.5 pb-3 border-b border-zinc-800">
        <span className="text-4xl font-extrabold text-white tracking-tight">
          ${annual ? "24" : "29"}
        </span>
        <span className="text-xs text-zinc-400">/ user / month</span>
      </div>

      <ul className="space-y-2 text-xs text-zinc-300">
        {[
          "Unlimited component library",
          "High-speed edge CDN",
          "Private team workspaces",
          "Dedicated 24/7 priority support",
        ].map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all cursor-pointer">
        Start 14-Day Free Trial
      </button>
    </div>
  );
};

// 6. Gradient Avatar Ring
export const GradientAvatarRingDemo: React.FC = () => {
  const users = [
    {
      name: "Elena Rostova",
      role: "Staff Designer",
      status: "online",
      grad: "from-violet-500 via-pink-500 to-amber-400",
    },
    {
      name: "Marcus Chen",
      role: "Lead Architect",
      status: "active",
      grad: "from-cyan-400 via-blue-500 to-indigo-600",
    },
    {
      name: "Sarah Miller",
      role: "Security Ops",
      status: "verified",
      grad: "from-emerald-400 via-teal-500 to-cyan-500",
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl bg-[#111116] border border-zinc-800">
      {users.map((u, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center space-y-2 group cursor-pointer"
        >
          <div
            className={`p-[2.5px] rounded-full bg-gradient-to-tr ${u.grad} shadow-lg transition-transform group-hover:scale-110 duration-300`}
          >
            <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-zinc-950 flex items-center justify-center font-bold text-white text-sm">
              {u.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{u.name}</div>
            <div className="text-[11px] text-zinc-400">{u.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 7. Gradient Stat Card
export const GradientStatCardDemo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full">
      <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-950/40 via-zinc-900 to-zinc-950 border border-violet-500/30 shadow-lg space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Gross ARR</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +38.4%
          </span>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          $428,900
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 w-3/4 rounded-full" />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-950 border border-cyan-500/30 shadow-lg space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Active Users</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +18.2%
          </span>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          84,210
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-4/5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// 8. Vibrant Banner
export const VibrantBannerDemo: React.FC = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300 hover:text-white cursor-pointer"
      >
        Restore Announcement Banner
      </button>
    );
  }
  return (
    <div className="relative w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white shadow-xl flex items-center justify-between gap-3 overflow-hidden">
      <div className="flex items-center gap-2.5">
        <span className="p-1 rounded-lg bg-white/20 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-white" />
        </span>
        <p className="text-xs font-medium">
          <strong className="font-bold">Depth UI v2.0 Released:</strong> 100+
          accessible primitives with 3D canvas support.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-100 transition-colors cursor-pointer shrink-0">
          Explore
        </button>
        <button
          onClick={() => setVisible(false)}
          className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 9. Color Swatch Selector
export const ColorSwatchSelectorDemo: React.FC = () => {
  const [selectedHex, setSelectedHex] = useState("#8b5cf6");
  const [copied, setCopied] = useState(false);
  const swatches = [
    { name: "Electric Violet", hex: "#8b5cf6", class: "bg-violet-500" },
    { name: "Neon Cyan", hex: "#06b6d4", class: "bg-cyan-500" },
    { name: "Emerald Peak", hex: "#10b981", class: "bg-emerald-500" },
    { name: "Solar Amber", hex: "#f59e0b", class: "bg-amber-500" },
    { name: "Rose Sunset", hex: "#f43f5e", class: "bg-rose-500" },
    { name: "Hyper Indigo", hex: "#6366f1", class: "bg-indigo-500" },
  ];
  return (
    <div className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-semibold text-white">
            Color Swatch Selector
          </span>
        </div>
        <span className="text-xs font-semibold text-zinc-300">
          {selectedHex}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {swatches.map((s) => (
          <button
            key={s.hex}
            onClick={() => setSelectedHex(s.hex)}
            className={`w-full aspect-square rounded-xl ${s.class} transition-all duration-200 cursor-pointer flex items-center justify-center ${
              selectedHex === s.hex
                ? "ring-2 ring-white scale-110 shadow-lg"
                : "opacity-70 hover:opacity-100"
            }`}
            title={s.name}
          >
            {selectedHex === s.hex && (
              <Check className="w-4 h-4 text-white drop-shadow" />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(selectedHex);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
        <span>{copied ? "Hex Copied!" : "Copy Hex Color"}</span>
      </button>
    </div>
  );
};
