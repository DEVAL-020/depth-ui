import React, { useState, useEffect } from "react";
import { Keyboard, Check, Copy } from "lucide-react";

export interface KbdKeyProps {
  label: string;
  sublabel?: string;
  isPressed?: boolean;
  size?: "sm" | "md" | "lg";
}

export const KbdKey: React.FC<KbdKeyProps> = ({
  label,
  sublabel,
  isPressed = false,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "min-w-[28px] h-7 text-[11px] px-1.5",
    md: "min-w-[36px] h-9 text-xs px-2.5",
    lg: "min-w-[44px] h-11 text-sm px-3.5",
  };

  return (
    <kbd
      className={`inline-flex items-center justify-center gap-1 font-mono font-semibold rounded-lg select-none transition-all duration-100 ${
        sizeClasses[size]
      } ${
        isPressed
          ? "translate-y-1 bg-cyan-500 text-black shadow-[0_1px_0_0_#0891b2] border border-cyan-400 ring-2 ring-cyan-400/40"
          : "bg-[#18181f] text-zinc-200 border-t border-l border-r border-zinc-700 border-b-2 border-b-zinc-950 shadow-[0_3px_0_0_#09090b,0_4px_6px_rgba(0,0,0,0.4)] hover:bg-[#202029]"
      }`}
    >
      <span>{label}</span>
      {sublabel && (
        <span className="text-[10px] opacity-60 font-sans">{sublabel}</span>
      )}
    </kbd>
  );
};

export const KbdShortcutSuiteDemo: React.FC = () => {
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("⌘");
  const [recentKeys, setRecentKeys] = useState<string[]>(["Meta", "K"]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let keyName = e.key;
      if (e.key === " ") keyName = "Space";
      if (e.key === "Control") keyName = "Ctrl";
      if (e.key === "Meta") keyName = "⌘";
      if (e.key === "Shift") keyName = "⇧";
      if (e.key === "Alt") keyName = "⌥";
      if (e.key === "Enter") keyName = "↵";

      setLastKeyPressed(keyName);
      setRecentKeys((prev) =>
        [keyName, ...prev.filter((k) => k !== keyName)].slice(0, 5),
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcutCombinations = [
    {
      action: "Quick Search & Command Menu",
      keys: ["⌘", "K"],
      category: "Global",
    },
    {
      action: "Format & Re-indent Document",
      keys: ["⇧", "⌥", "F"],
      category: "Editor",
    },
    {
      action: "Toggle Integrated Terminal",
      keys: ["Ctrl", "`"],
      category: "Terminal",
    },
    {
      action: "Multi-cursor Column Selection",
      keys: ["⌥", "Click"],
      category: "Cursor",
    },
  ];

  const copyShortcut = (keys: string[], idx: number) => {
    navigator.clipboard.writeText(keys.join(" + "));
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Live Physical Key Detector Banner */}
      <div className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Live Mechanical Keycap Engine
              </h4>
              <p className="text-[11px] text-zinc-400">
                Press keys on your keyboard to test
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500">
              Live Detector:
            </span>
            <div className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold animate-pulse">
              {lastKeyPressed}
            </div>
          </div>
        </div>

        {/* 3D Keycap Row Showcase */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <KbdKey label="⌘" isPressed={lastKeyPressed === "⌘"} size="lg" />
          <KbdKey label="⇧" isPressed={lastKeyPressed === "⇧"} size="lg" />
          <KbdKey label="⌥" isPressed={lastKeyPressed === "⌥"} size="lg" />
          <KbdKey
            label="Ctrl"
            isPressed={lastKeyPressed === "Ctrl"}
            size="lg"
          />
          <KbdKey
            label="↵ Enter"
            isPressed={lastKeyPressed === "↵"}
            size="lg"
          />
          <KbdKey
            label="Space"
            isPressed={lastKeyPressed === "Space"}
            size="lg"
          />
          <KbdKey
            label="Esc"
            isPressed={lastKeyPressed === "Escape"}
            size="lg"
          />
          <KbdKey label="Tab" isPressed={lastKeyPressed === "Tab"} size="lg" />
        </div>

        {/* Recently Pressed Key Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-zinc-500 px-1 pt-1">
          <span>Recent Strokes:</span>
          <div className="flex items-center gap-1.5 font-mono">
            {recentKeys.map((k, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Production Hotkey Badges Matrix */}
      <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 pb-2 border-b border-zinc-800">
          <span>Production Hotkey Badges</span>
          <span className="text-[11px] font-mono text-zinc-500">
            Copy-Paste Ready
          </span>
        </div>

        <div className="space-y-2">
          {shortcutCombinations.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {item.category}
                </span>
                <span className="text-xs font-medium text-white">
                  {item.action}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {item.keys.map((k, kIdx) => (
                    <React.Fragment key={kIdx}>
                      <kbd className="px-2 py-1 rounded-md text-[11px] font-mono font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700/80 shadow-[0_1.5px_0_0_#27272a]">
                        {k}
                      </kbd>
                      {kIdx < item.keys.length - 1 && (
                        <span className="text-zinc-600 text-xs">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => copyShortcut(item.keys, idx)}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  aria-label="Copy shortcut"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default KbdShortcutSuiteDemo;
