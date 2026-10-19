import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface SelectDropdownProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  helperText,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string | undefined>(
    value,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = value !== undefined ? value : internalSelected;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selected);

  const handleSelect = (val: string) => {
    setInternalSelected(val);
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5 w-full relative" ref={containerRef}>
      {label && (
        <label className="block text-xs font-medium text-zinc-300">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-left text-zinc-200 flex items-center justify-between hover:border-zinc-700 transition-colors focus:outline-none focus:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <span
          className={
            selectedOption ? "text-zinc-100 font-medium" : "text-zinc-500"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full z-50 bg-[#18181b] border border-zinc-800 rounded-xl p-1 shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === selected;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-zinc-800/80 text-white font-medium"
                    : "text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span>{opt.label}</span>
                    {opt.badge && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.description && (
                    <p className="text-[11px] text-zinc-500 font-normal mt-0.5">
                      {opt.description}
                    </p>
                  )}
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-white shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {helperText && <p className="text-[11px] text-zinc-500">{helperText}</p>}
    </div>
  );
};

export const SelectDropdownDemo: React.FC = () => {
  const [role, setRole] = useState("fullstack");
  const [timezone, setTimezone] = useState("utc");

  const roles: SelectOption[] = [
    {
      value: "frontend",
      label: "Frontend Engineer",
      description: "Design systems, performance, UI/UX",
      badge: "Active",
    },
    {
      value: "fullstack",
      label: "Fullstack Developer",
      description: "End-to-end web apps, APIs, databases",
    },
    {
      value: "lead",
      label: "Staff Architect",
      description: "System design, scalability, mentoring",
    },
    {
      value: "designer",
      label: "Product Designer",
      description: "Figma prototypes, design tokens",
    },
  ];

  const timezones: SelectOption[] = [
    { value: "utc", label: "UTC (Coordinated Universal Time)" },
    { value: "est", label: "EST (Eastern Standard Time, UTC-5)" },
    { value: "pst", label: "PST (Pacific Standard Time, UTC-8)" },
    { value: "cet", label: "CET (Central European Time, UTC+1)" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectDropdown
          label="Primary Role"
          options={roles}
          value={role}
          onChange={setRole}
          helperText="Determines team dashboard permissions."
        />
        <SelectDropdown
          label="Preferred Timezone"
          options={timezones}
          value={timezone}
          onChange={setTimezone}
          helperText="Used for automated email summaries."
        />
      </div>

      <div className="p-3 rounded-lg bg-[#18181b] border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
        <span className="font-mono text-[11px] text-zinc-500">
          Current Selection:
        </span>
        <span className="text-zinc-200 font-medium">
          Role: {role} | Timezone: {timezone.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default SelectDropdownDemo;
