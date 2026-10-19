import React, { useState } from "react";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps {
  checked: boolean | "indeterminate";
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  variant?: "emerald" | "violet" | "white";
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  variant = "emerald",
  id,
}) => {
  const isChecked = checked === true;
  const isIndeterminate = checked === "indeterminate";

  const variantStyles = {
    emerald:
      "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]",
    violet:
      "bg-violet-600 border-violet-500 text-white shadow-[0_0_8px_rgba(139,92,246,0.4)]",
    white:
      "bg-white border-white text-zinc-950 shadow-[0_0_8px_rgba(255,255,255,0.3)]",
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  return (
    <label
      htmlFor={id}
      onClick={handleToggle}
      className={`flex items-start gap-3 cursor-pointer select-none group p-2.5 rounded-xl transition-colors ${
        isChecked ? "bg-zinc-900/60" : "hover:bg-zinc-900/40"
      } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
    >
      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          onChange={() => {}}
          className="sr-only"
        />
        <div
          className={`w-4.5 h-4.5 rounded-md border transition-all duration-200 flex items-center justify-center ${
            isChecked || isIndeterminate
              ? variantStyles[variant]
              : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
          }`}
        >
          {isChecked && (
            <Check className="w-3.5 h-3.5 stroke-[3] animate-in zoom-in-75 duration-150" />
          )}
          {isIndeterminate && <Minus className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      <div className="space-y-0.5 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs sm:text-sm font-medium transition-colors ${
              isChecked ? "text-white" : "text-zinc-300 group-hover:text-white"
            }`}
          >
            {label}
          </span>
          <span
            className={`px-1.5 py-0.2 rounded text-[10px] font-mono transition-colors ${
              isChecked
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "text-zinc-600"
            }`}
          >
            {isChecked ? "ACTIVE" : "OFF"}
          </span>
        </div>
        {description && (
          <p className="text-[11px] sm:text-xs text-zinc-400 leading-normal">
            {description}
          </p>
        )}
      </div>
    </label>
  );
};

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  price?: string;
  icon?: React.ReactNode;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="space-y-3">
      {label && (
        <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
          {label}
        </span>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <div
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "bg-gradient-to-b from-zinc-900 to-zinc-950 border-violet-500/80 shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/30"
                  : "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "border-violet-500 bg-violet-600 shadow-sm"
                        : "border-zinc-600 bg-zinc-900"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${isSelected ? "text-white" : "text-zinc-200"}`}
                  >
                    {opt.label}
                  </span>
                </div>

                {opt.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                      isSelected
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    {opt.badge}
                  </span>
                )}
              </div>

              {opt.description && (
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed mb-3">
                  {opt.description}
                </p>
              )}

              {opt.price && (
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Billed Rate
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400">
                    {opt.price}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CheckboxRadioDemo: React.FC = () => {
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySlack, setNotifySlack] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [billingCycle, setBillingCycle] = useState("annual");

  const allChecked = notifyEmail && notifySlack && notifySms;
  const isIndeterminate =
    (notifyEmail || notifySlack || notifySms) && !allChecked;

  const handleSelectAll = (val: boolean) => {
    setNotifyEmail(val);
    setNotifySlack(val);
    setNotifySms(val);
  };

  const billingOptions: RadioOption[] = [
    {
      value: "annual",
      label: "Annual Plan",
      description:
        "Full team access with automated CI/CD deployment pipelines and 24/7 priority SLA.",
      badge: "Save 25%",
      price: "$16 / month ($192/yr)",
    },
    {
      value: "monthly",
      label: "Monthly Flexible",
      description:
        "Standard pay-as-you-go membership. Cancel anytime directly in Stripe with zero penalty.",
      badge: "Standard",
      price: "$20 / month",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-2xl">
      {/* 1. Master Select-All & Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              1. Checkbox Selectors
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
              {[notifyEmail, notifySlack, notifySms].filter(Boolean).length} / 3
              Active
            </span>
          </div>

          <button
            onClick={() => handleSelectAll(!allChecked)}
            className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
          >
            {allChecked
              ? "Deselect All"
              : isIndeterminate
                ? "Select All (Partial)"
                : "Select All"}
          </button>
        </div>

        <div className="space-y-1">
          <Checkbox
            checked={notifyEmail}
            onChange={setNotifyEmail}
            variant="emerald"
            label="Email Alerts for Production Incidents"
            description="Send critical outage pings immediately to registered on-call dev addresses."
          />
          <Checkbox
            checked={notifySlack}
            onChange={setNotifySlack}
            variant="emerald"
            label="Sync with Slack #deployments Channel"
            description="Post automatic commit hashes, preview URLs, and release summaries."
          />
          <Checkbox
            checked={notifySms}
            onChange={setNotifySms}
            variant="emerald"
            label="Urgent SMS Phone Dispatch"
            description="Emergency SMS alerts when edge error rates exceed 5% threshold."
          />
        </div>
      </div>

      {/* 2. Radio Plan Option Cards */}
      <div className="pt-4 border-t border-zinc-800/80">
        <RadioGroup
          label="2. Radio Card Selectors (Single Choice)"
          options={billingOptions}
          value={billingCycle}
          onChange={setBillingCycle}
        />
      </div>
    </div>
  );
};

export default CheckboxRadioDemo;
