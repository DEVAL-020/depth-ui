import React, { useState } from "react";
import { Check, X } from "lucide-react";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  variant?: "emerald" | "violet" | "cyan" | "monochrome";
  showIcons?: boolean;
  showStatusPill?: boolean;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "default",
  variant = "emerald",
  showIcons = false,
  showStatusPill = false,
  id,
}) => {
  // Size dimensions
  const trackSizes = {
    sm: "w-8 h-4.5 p-0.5",
    default: "w-11 h-6 p-0.5",
    lg: "w-14 h-7.5 p-1",
  };

  const thumbSizes = {
    sm: "w-3.5 h-3.5",
    default: "w-5 h-5",
    lg: "w-5.5 h-5.5",
  };

  // Thumb translation distance when ON
  const thumbTranslate = {
    sm: "translate-x-3.5",
    default: "translate-x-5",
    lg: "translate-x-6.5",
  };

  // Track colors for ON state
  const variantStyles = {
    emerald:
      "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] border-emerald-400/50",
    violet:
      "bg-violet-600 shadow-[0_0_12px_rgba(139,92,246,0.4)] border-violet-500/50",
    cyan: "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] border-cyan-400/50",
    monochrome: "bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)] border-white",
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 py-2 select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {(label || description) && (
        <div
          className="space-y-0.5 pr-2 flex-1 cursor-pointer"
          onClick={handleToggle}
        >
          <div className="flex items-center gap-2">
            {label && (
              <label
                htmlFor={id}
                className={`text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                  checked ? "text-white" : "text-zinc-300 hover:text-white"
                }`}
              >
                {label}
              </label>
            )}
            {showStatusPill && (
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                  checked
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border border-zinc-700/60"
                }`}
              >
                {checked ? "ON" : "OFF"}
              </span>
            )}
          </div>
          {description && (
            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Tactile Switch Button */}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex shrink-0 items-center rounded-full transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-zinc-400/40 focus:ring-offset-2 focus:ring-offset-zinc-950 cursor-pointer ${
          trackSizes[size]
        } ${
          checked
            ? variantStyles[variant]
            : "bg-zinc-800 hover:bg-zinc-750 border border-zinc-700/80 shadow-inner"
        }`}
      >
        {/* Sliding Thumb */}
        <span
          className={`pointer-events-none inline-flex items-center justify-center rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.35),0_1px_1px_rgba(0,0,0,0.2)] transform transition-transform duration-200 ease-out ${
            thumbSizes[size]
          } ${checked ? `${thumbTranslate[size]} bg-white text-zinc-900` : "translate-x-0 bg-zinc-300 text-zinc-600"}`}
        >
          {showIcons &&
            size !== "sm" &&
            (checked ? (
              <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-600" />
            ) : (
              <X className="w-2.5 h-2.5 stroke-[2.5] text-zinc-500" />
            ))}
        </span>
      </button>
    </div>
  );
};

export const SwitchToggleDemo: React.FC = () => {
  // Main settings state
  const [realtime, setRealtime] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [gpuAccel, setGpuAccel] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [marketing, setMarketing] = useState(false);

  // Variant playground state
  const [emeraldActive, setEmeraldActive] = useState(true);
  const [violetActive, setVioletActive] = useState(true);
  const [cyanActive, setCyanActive] = useState(false);
  const [monoActive, setMonoActive] = useState(false);

  // Size playground state
  const [smallSwitch, setSmallSwitch] = useState(true);
  const [defaultSwitch, setDefaultSwitch] = useState(true);
  const [largeSwitch, setLargeSwitch] = useState(false);

  const activeCount = [realtime, twoFactor, gpuAccel, autoBackup].filter(
    Boolean,
  ).length;

  const setAll = (val: boolean) => {
    setRealtime(val);
    setTwoFactor(val);
    setGpuAccel(val);
    setAutoBackup(val);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-7 p-6 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-2xl">
      {/* Header with Master Batch Switch & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>System Feature Toggles</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {activeCount} of 4 Active
            </span>
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Test clicking the switches, labels, or quick batch buttons to verify
            real ON/OFF responses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAll(true)}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors cursor-pointer"
          >
            All ON
          </button>
          <button
            onClick={() => setAll(false)}
            className="px-2.5 py-1 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-xs text-zinc-400 transition-colors cursor-pointer"
          >
            All OFF
          </button>
        </div>
      </div>

      {/* 1. Main Interactive Toggles */}
      <div className="divide-y divide-zinc-800/70">
        <Switch
          checked={realtime}
          onChange={setRealtime}
          showStatusPill={true}
          showIcons={true}
          label="Real-time Edge WebSocket Sync"
          description="Broadcast document mutations and user cursors over sub-15ms edge connections."
        />
        <Switch
          checked={twoFactor}
          onChange={setTwoFactor}
          showStatusPill={true}
          showIcons={true}
          label="FIDO2 Hardware Key Verification"
          description="Require TouchID, YubiKey, or Windows Hello passkey confirmation for destructive commands."
        />
        <Switch
          checked={gpuAccel}
          onChange={setGpuAccel}
          showStatusPill={true}
          showIcons={true}
          label="GPU WebGL Canvas Acceleration"
          description="Leverage discrete graphics hardware for 120 FPS bezier transformations and fluid ribbons."
        />
        <Switch
          checked={autoBackup}
          onChange={setAutoBackup}
          showStatusPill={true}
          showIcons={true}
          label="Automated Snapshots & Rollback"
          description="Automatically archive point-in-time branch checkpoints before every Git push."
        />
        <Switch
          checked={marketing}
          onChange={setMarketing}
          disabled={true}
          showStatusPill={true}
          label="Audit Log Auto-Export (Locked by Admin)"
          description="Organization security policies require SOC-2 compliance archiving to be enabled."
        />
      </div>

      {/* 2. Color Themes / Styles */}
      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
            Color Themes (Click to Toggle)
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Tailwind tokens
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Emerald iOS */}
          <div
            onClick={() => setEmeraldActive(!emeraldActive)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              emeraldActive
                ? "bg-emerald-950/20 border-emerald-500/40 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Emerald</span>
              <span
                className={`text-[10px] font-mono ${emeraldActive ? "text-emerald-400" : "text-zinc-500"}`}
              >
                {emeraldActive ? "ON" : "OFF"}
              </span>
            </div>
            <Switch
              checked={emeraldActive}
              onChange={setEmeraldActive}
              variant="emerald"
              size="sm"
            />
          </div>

          {/* Violet SaaS */}
          <div
            onClick={() => setVioletActive(!violetActive)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              violetActive
                ? "bg-violet-950/20 border-violet-500/40 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Violet</span>
              <span
                className={`text-[10px] font-mono ${violetActive ? "text-violet-400" : "text-zinc-500"}`}
              >
                {violetActive ? "ON" : "OFF"}
              </span>
            </div>
            <Switch
              checked={violetActive}
              onChange={setVioletActive}
              variant="violet"
              size="sm"
            />
          </div>

          {/* Electric Cyan */}
          <div
            onClick={() => setCyanActive(!cyanActive)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              cyanActive
                ? "bg-cyan-950/20 border-cyan-500/40 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Cyan</span>
              <span
                className={`text-[10px] font-mono ${cyanActive ? "text-cyan-400" : "text-zinc-500"}`}
              >
                {cyanActive ? "ON" : "OFF"}
              </span>
            </div>
            <Switch
              checked={cyanActive}
              onChange={setCyanActive}
              variant="cyan"
              size="sm"
            />
          </div>

          {/* Monochrome White */}
          <div
            onClick={() => setMonoActive(!monoActive)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              monoActive
                ? "bg-zinc-800/60 border-zinc-400/40 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">White</span>
              <span
                className={`text-[10px] font-mono ${monoActive ? "text-white" : "text-zinc-500"}`}
              >
                {monoActive ? "ON" : "OFF"}
              </span>
            </div>
            <Switch
              checked={monoActive}
              onChange={setMonoActive}
              variant="monochrome"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* 3. Sizes & Icon Scale */}
      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
          Sizes (sm, default, lg with micro-icons)
        </span>
        <div className="flex flex-wrap items-center gap-6 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Switch
              checked={smallSwitch}
              onChange={setSmallSwitch}
              size="sm"
              variant="emerald"
            />
            <span className="text-xs text-zinc-300">Small (32px)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Switch
              checked={defaultSwitch}
              onChange={setDefaultSwitch}
              size="default"
              showIcons={true}
              variant="violet"
            />
            <span className="text-xs text-zinc-300">Default (44px)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Switch
              checked={largeSwitch}
              onChange={setLargeSwitch}
              size="lg"
              showIcons={true}
              variant="cyan"
            />
            <span className="text-xs text-zinc-300">Large (56px)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchToggleDemo;
