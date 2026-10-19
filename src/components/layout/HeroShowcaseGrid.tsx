import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Terminal,
  Palette,
  Sliders,
  Layers,
} from "lucide-react";

export const HeroShowcaseGrid: React.FC = () => {
  // Card 1 State (Interactive Primitives)
  const [toggleActive, setToggleActive] = useState(true);
  const [radioSelected, setRadioSelected] = useState("one");
  const [searchInput, setSearchInput] = useState("glow-card");
  const [codeCopied, setCodeCopied] = useState(false);
  const [buttonGroupOpen, setButtonGroupOpen] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  // Card 2 State (Component Velocity Chart)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const bars = [
    {
      label: "Buttons",
      value: 48,
      count: "48k/wk",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      label: "Modals",
      value: 76,
      count: "76k/wk",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      label: "Cards",
      value: 62,
      count: "62k/wk",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      label: "Motion",
      value: 94,
      count: "94k/wk",
      gradient: "from-fuchsia-500 to-pink-500",
    },
    {
      label: "Toggles",
      value: 70,
      count: "70k/wk",
      gradient: "from-amber-400 to-rose-500",
    },
  ];

  // Card 3 State (Token & Theme Configurator)
  const [themePreset, setThemePreset] = useState("Vibrant Obsidian");
  const [radiusValue, setRadiusValue] = useState("12px");
  const [accentColor, setAccentColor] = useState<
    "violet" | "emerald" | "cyan" | "amber"
  >("violet");
  const [tokensExported, setTokensExported] = useState(false);

  // Card 4 State (CLI Copy)
  const [cliCopied, setCliCopied] = useState(false);

  const handleCopyCode = () => {
    setCodeCopied(true);
    navigator.clipboard?.writeText(
      "import { Button, GlowCard } from 'depth-ui'",
    );
    setTimeout(() => setCodeCopied(false), 1600);
  };

  const handleCopyCli = () => {
    setCliCopied(true);
    navigator.clipboard?.writeText("npx depth-ui add glow-card");
    setTimeout(() => setCliCopied(false), 1600);
  };

  const handleExportTokens = () => {
    setTokensExported(true);
    navigator.clipboard?.writeText(
      `// Depth UI Token Config\nexport default {\n  theme: '${themePreset}',\n  radius: '${radiusValue}',\n  accent: '${accentColor}'\n}`,
    );
    setTimeout(() => setTokensExported(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
      {/* =========================================================================
          CARD 1: Interactive Primitives & Atoms
      ========================================================================= */}
      <div className="rounded-2xl bg-[#121215] border border-zinc-800/80 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-zinc-700/80 transition-colors">
        {/* Row 1: Button Variants */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-label="Demo Primary Button"
            className="px-3.5 py-2 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 min-h-[36px]"
          >
            <span>Button</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            aria-label="Demo Secondary Button"
            className="px-3.5 py-2 rounded-full bg-zinc-900 text-zinc-300 text-xs sm:text-sm font-medium hover:bg-zinc-800 hover:text-white transition-colors border border-zinc-800 cursor-pointer active:scale-95 min-h-[36px]"
          >
            Secondary
          </button>
          <button
            type="button"
            aria-label="Demo Outline Button"
            className="px-3.5 py-2 rounded-full bg-transparent text-zinc-300 text-xs sm:text-sm font-medium hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700 cursor-pointer active:scale-95 min-h-[36px]"
          >
            Outline
          </button>
        </div>

        {/* Row 2: Search Component Filter */}
        <div className="relative">
          <label htmlFor="hero-showcase-search" className="sr-only">
            Search 100+ components
          </label>
          <input
            id="hero-showcase-search"
            name="hero-showcase-search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search 100+ components..."
            aria-label="Search 100+ components"
            className="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors min-h-[40px]"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Row 3: Quick Import Snippet */}
        <div
          onClick={handleCopyCode}
          className="group relative flex items-center justify-between p-2.5 rounded-lg bg-[#18181b] border border-zinc-800/90 hover:border-zinc-700 cursor-pointer transition-colors"
          title="Click to copy import statement"
        >
          <code className="text-xs sm:text-[13px] font-mono text-zinc-200 truncate">
            <span className="text-violet-400">import</span> &#123; GlowCard
            &#125; <span className="text-violet-400">from</span>{" "}
            <span className="text-cyan-400">'depth-ui'</span>
          </code>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyCode();
            }}
            aria-label={
              codeCopied ? "Code snippet copied" : "Copy import code snippet"
            }
            className="text-zinc-400 group-hover:text-zinc-200 transition-colors shrink-0 ml-2 p-1 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
          >
            {codeCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Row 4: Badges & Tactile Switch Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v1.0 Ready
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
              Accessible
            </span>
          </div>

          {/* Radio & Tactile Switch with accessible names and comfortable touch target sizes */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              role="radio"
              aria-checked={radioSelected === "one"}
              aria-label="Select first option"
              onClick={() =>
                setRadioSelected(radioSelected === "one" ? "two" : "one")
              }
              className="min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer rounded-lg hover:bg-zinc-800/40 transition-colors"
              title="Toggle radio selection"
            >
              <span className="w-4 h-4 rounded-full border border-zinc-400 flex items-center justify-center hover:border-zinc-200 transition-colors">
                {radioSelected === "one" && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                )}
              </span>
            </button>

            {/* Tactile Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={toggleActive}
              aria-label="Toggle interactive preview switch"
              onClick={() => setToggleActive(!toggleActive)}
              className="min-w-[44px] min-h-[40px] flex items-center justify-center cursor-pointer rounded-lg hover:bg-zinc-800/40 transition-colors p-1"
              title="Click to toggle ON/OFF"
            >
              <span
                className={`w-9 h-5 rounded-full transition-all duration-200 relative p-0.5 border inline-block ${
                  toggleActive
                    ? "bg-emerald-500 border-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                    : "bg-zinc-800 border-zinc-700 hover:border-zinc-600"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full block transform transition-transform duration-200 ease-out ${
                    toggleActive
                      ? "translate-x-4 bg-white shadow-sm"
                      : "translate-x-0 bg-zinc-400"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Row 5: Alert Dialog & Action Dropdown */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
          <button
            type="button"
            aria-label="Trigger Alert Dialog preview"
            onClick={() => setShowAlertDialog(true)}
            className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs sm:text-sm font-medium border border-zinc-800 transition-colors cursor-pointer min-h-[36px]"
          >
            Alert Dialog
          </button>

          <div className="relative">
            <button
              type="button"
              aria-label="Toggle quick actions menu"
              aria-expanded={buttonGroupOpen}
              onClick={() => setButtonGroupOpen(!buttonGroupOpen)}
              className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs sm:text-sm font-medium border border-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[36px]"
            >
              <span>Quick Actions</span>
              {buttonGroupOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {buttonGroupOpen && (
              <div className="absolute bottom-full right-0 mb-1.5 w-44 bg-[#18181b] border border-zinc-800 rounded-xl p-1.5 shadow-2xl z-20 space-y-0.5">
                <button
                  onClick={() => {
                    handleCopyCli();
                    setButtonGroupOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
                >
                  <span>Copy CLI Command</span>
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById("components-catalog")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setButtonGroupOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
                >
                  <span>Explore 100+ components</span>
                  <Layers className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Alert Dialog Modal Simulation */}
        {showAlertDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5 sm:p-6 max-w-sm w-full space-y-3 shadow-2xl">
              <h3 className="text-base font-semibold text-white">
                Production Ready Dialog
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                This is a native Depth UI modal primitive with focus trapping,
                backdrop blur, and full keyboard escape dismiss.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAlertDialog(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm text-zinc-400 hover:text-white cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setShowAlertDialog(false)}
                  className="px-4 py-1.5 rounded-lg bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 cursor-pointer shadow-xs"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          CARD 2: Component Velocity & Telemetry Chart
      ========================================================================= */}
      <div className="rounded-2xl bg-[#121215] border border-zinc-800/80 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:border-zinc-700/80 transition-colors">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-semibold text-white">
              Component Velocity
            </h3>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Live metrics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
            Weekly imports across ecosystems
          </p>
        </div>

        {/* Minimal Bar Chart */}
        <div className="py-3">
          <div className="h-28 flex items-end justify-between gap-2.5 px-1">
            {bars.map((bar, i) => {
              const isHovered = hoveredBar === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                >
                  {/* Tooltip with fixed dimensions to prevent layout jitter */}
                  <div
                    className={`h-4 text-xs font-semibold text-zinc-100 transition-opacity flex items-center justify-center ${
                      isHovered ? "opacity-100 scale-105" : "opacity-0"
                    }`}
                  >
                    {bar.count}
                  </div>

                  {/* Vertical Bar with Vibrant Gradient (scaleY GPU animation eliminates CLS) */}
                  <div className="w-full bg-zinc-900/90 rounded-lg overflow-hidden h-24 flex items-end p-0.5 border border-zinc-800/60">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                      style={{ height: `${bar.value}%`, transformOrigin: "bottom" }}
                      className={`w-full rounded-md bg-gradient-to-t ${bar.gradient} transition-all duration-300 ${
                        isHovered
                          ? "opacity-100 brightness-125 shadow-lg shadow-violet-500/25"
                          : "opacity-85"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs text-zinc-300 font-medium group-hover:text-white transition-colors truncate w-full text-center">
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Metrics (Cohesive Design System Stats) */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800/60">
          <div>
            <span className="text-xs text-zinc-400 font-medium block">
              Total primitives
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                100+ Components
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium block">
              Average bundle
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5 block">
              &lt; 2.1 kB tree-shaken
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CARD 3: Configure Design Tokens (UI Customizer)
      ========================================================================= */}
      <div className="rounded-2xl bg-[#121215] border border-zinc-800/80 p-5 sm:p-6 flex flex-col justify-between space-y-3 shadow-sm hover:border-zinc-700/80 transition-colors">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-semibold text-white">
              Configure Design Tokens
            </h3>
            <Palette className="w-4 h-4 text-violet-400" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 leading-relaxed">
            Customize typography, borders, and color accents.
          </p>
        </div>

        <div className="space-y-3">
          {/* Theme Preset */}
          <div>
            <label
              htmlFor="theme-token-preset"
              className="text-xs font-medium text-zinc-300 block mb-1"
            >
              Color Token Theme
            </label>
            <input
              id="theme-token-preset"
              name="theme-token-preset"
              type="text"
              value={themePreset}
              onChange={(e) => setThemePreset(e.target.value)}
              aria-label="Color Token Theme"
              className="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors min-h-[38px]"
            />
          </div>

          {/* Border Radius & Accent Swatches */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="theme-token-radius"
                className="text-xs font-medium text-zinc-300 block mb-1"
              >
                Border Radius
              </label>
              <input
                id="theme-token-radius"
                name="theme-token-radius"
                type="text"
                value={radiusValue}
                onChange={(e) => setRadiusValue(e.target.value)}
                aria-label="Border Radius"
                className="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-zinc-600 min-h-[38px]"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-zinc-300 block mb-1">
                Accent Glow
              </span>
              <div
                role="radiogroup"
                aria-label="Accent glow color presets"
                className="flex items-center justify-around h-[38px] bg-[#18181b] border border-zinc-800 rounded-lg px-1"
              >
                {[
                  { id: "violet", bg: "bg-violet-500", name: "Violet" },
                  { id: "emerald", bg: "bg-emerald-500", name: "Emerald" },
                  { id: "cyan", bg: "bg-cyan-500", name: "Cyan" },
                  { id: "amber", bg: "bg-amber-500", name: "Amber" },
                ].map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    role="radio"
                    aria-checked={accentColor === col.id}
                    aria-label={`Select ${col.name} accent glow`}
                    onClick={() => setAccentColor(col.id as any)}
                    className="min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer p-1"
                    title={`Select ${col.name} accent`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full ${col.bg} transition-transform ${
                        accentColor === col.id
                          ? "scale-125 ring-2 ring-white shadow-xs"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            aria-label="Export Theme Tokens configuration"
            onClick={handleExportTokens}
            className="w-full py-2.5 rounded-xl bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm min-h-[40px] active:scale-98"
          >
            {tokensExported ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in" />
                <span className="text-emerald-700 font-bold">
                  Tokens Exported!
                </span>
              </>
            ) : (
              <>
                <Sliders className="w-3.5 h-3.5 text-violet-600" />
                <span>Export Theme Tokens</span>
              </>
            )}
          </button>
          <button
            type="button"
            aria-label="Reset design tokens to defaults"
            onClick={() => {
              setThemePreset("Vibrant Obsidian");
              setRadiusValue("12px");
              setAccentColor("violet");
            }}
            className="w-full py-2 min-h-[36px] flex items-center justify-center text-center text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* =========================================================================
          CARD 4: Live Mobile Preview & CLI Quickstart
      ========================================================================= */}
      <div className="rounded-2xl bg-[#121215] border border-zinc-800/80 p-5 sm:p-6 flex flex-col items-center justify-between text-center shadow-sm hover:border-zinc-700/80 transition-colors">
        {/* Crisp Vector QR Code with Depth UI Brand Accent */}
        <div className="relative group">
          <div className="w-36 h-36 bg-white rounded-2xl p-2.5 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 100 100"
              width="144"
              height="144"
              aria-label="QR code to test mobile preview"
              className="w-full h-full text-black fill-current"
            >
              <rect x="0" y="0" width="30" height="30" rx="4" />
              <rect x="6" y="6" width="18" height="18" fill="white" rx="2" />
              <rect x="11" y="11" width="8" height="8" />

              <rect x="70" y="0" width="30" height="30" rx="4" />
              <rect x="76" y="6" width="18" height="18" fill="white" rx="2" />
              <rect x="81" y="11" width="8" height="8" />

              <rect x="0" y="70" width="30" height="30" rx="4" />
              <rect x="6" y="76" width="18" height="18" fill="white" rx="2" />
              <rect x="11" y="81" width="8" height="8" />

              <rect x="36" y="6" width="6" height="6" />
              <rect x="48" y="6" width="6" height="12" />
              <rect x="58" y="12" width="6" height="6" />
              <rect x="36" y="20" width="18" height="6" />
              <rect x="58" y="24" width="6" height="12" />

              <rect x="10" y="38" width="8" height="8" />
              <rect x="24" y="38" width="6" height="14" />
              <rect x="36" y="34" width="12" height="12" />
              <rect x="54" y="42" width="14" height="6" />
              <rect x="74" y="38" width="18" height="8" />

              <rect x="6" y="54" width="14" height="6" />
              <rect x="28" y="58" width="6" height="12" />
              <rect x="40" y="52" width="8" height="16" />
              <rect x="54" y="54" width="14" height="6" />
              <rect x="74" y="52" width="8" height="14" />
              <rect x="88" y="54" width="6" height="12" />

              <rect x="36" y="74" width="8" height="18" />
              <rect x="50" y="80" width="14" height="6" />
              <rect x="50" y="70" width="6" height="6" />
              <rect x="70" y="74" width="12" height="6" />
              <rect x="88" y="74" width="6" height="18" />
              <rect x="70" y="86" width="12" height="8" />
            </svg>
          </div>
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-emerald-600/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Text & CLI Quickstart */}
        <div className="space-y-2 pt-2 w-full">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white">
              Scan to Preview on Mobile
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 leading-relaxed">
              Test responsive touch & 120 FPS animations on iOS & Android.
            </p>
          </div>

          {/* Interactive CLI Badge */}
          <button
            type="button"
            onClick={handleCopyCli}
            aria-label={
              cliCopied
                ? "CLI command copied to clipboard"
                : "Copy CLI command to add glow-card"
            }
            className="w-full flex items-center justify-between px-3.5 py-2.5 min-h-[40px] rounded-xl bg-[#18181b] border border-zinc-800 hover:border-zinc-700 text-xs sm:text-[13px] text-zinc-200 font-mono transition-colors cursor-pointer group"
            title="Click to copy CLI command"
          >
            <div className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">npx depth-ui add glow-card</span>
            </div>
            {cliCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1.5 animate-in zoom-in" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white shrink-0 ml-1.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroShowcaseGrid;
