import React, { useState } from "react";
import {
  Plus,
  Share2,
  Bookmark,
  MessageSquare,
  Terminal,
  Check,
} from "lucide-react";

export const FloatingSpeedDialDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActiveMessage(msg);
    setTimeout(() => setActiveMessage(null), 2000);
  };

  const actions = [
    {
      id: "copy",
      label: "Copy Component CLI",
      icon: copied ? Check : Terminal,
      color: "bg-cyan-500 text-white hover:bg-cyan-400",
      action: () => {
        navigator.clipboard?.writeText("npx depth-ui add speed-dial");
        setCopied(true);
        triggerToast("Copied CLI install command!");
        setTimeout(() => setCopied(false), 1600);
      },
    },
    {
      id: "share",
      label: "Share Component",
      icon: Share2,
      color: "bg-violet-600 text-white hover:bg-violet-500",
      action: () => triggerToast("Share link copied to clipboard!"),
    },
    {
      id: "bookmark",
      label: "Bookmark Primitive",
      icon: Bookmark,
      color: "bg-emerald-600 text-white hover:bg-emerald-500",
      action: () => triggerToast("Saved to your bookmarked primitives!"),
    },
    {
      id: "feedback",
      label: "Developer Feedback",
      icon: MessageSquare,
      color: "bg-amber-600 text-white hover:bg-amber-500",
      action: () => triggerToast("Opening feedback modal..."),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Interactive Simulation Frame */}
      <div className="relative w-full min-h-[360px] rounded-3xl bg-[#0e0e13] border border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-10 flex flex-col justify-between">
        <div className="space-y-1 max-w-md">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[11px] font-semibold">
            SPEED DIAL ACCELERATOR
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Floating Action Speed Dial (FAB)
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Expandable radial micro-menu for quick actions, sharing, bookmarks,
            and shortcuts. Click the floating trigger in the corner below.
          </p>
        </div>

        {/* Floating Speed Dial Container */}
        <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-3">
          {/* Expanded Action Buttons */}
          <div
            className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {actions.map((act, i) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  style={{ transitionDelay: `${i * 35}ms` }}
                  className="flex items-center gap-2.5 transition-all duration-200"
                >
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-[11px] font-medium text-zinc-200 shadow-lg select-none whitespace-nowrap">
                    {act.label}
                  </span>
                  <button
                    onClick={act.action}
                    aria-label={act.label}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-90 cursor-pointer ${act.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Main Toggle Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close speed dial" : "Open speed dial actions"}
            className={`w-13 h-13 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer active:scale-95 ${
              isOpen
                ? "bg-zinc-800 text-white rotate-45 border border-zinc-700 shadow-zinc-950/80"
                : "bg-white text-black hover:bg-zinc-200 shadow-cyan-500/10"
            }`}
          >
            <Plus className="w-6 h-6 transition-transform duration-300" />
          </button>
        </div>

        {/* Bottom Feedback Banner */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono border-t border-zinc-800/80 pt-4">
          <span>Click (+) to expand speed dial</span>
          <span>Status: {isOpen ? "Expanded" : "Collapsed"}</span>
        </div>

        {/* Toast Alert */}
        {activeMessage && (
          <div className="absolute top-6 right-6 z-40 px-3.5 py-2 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-xl flex items-center gap-2 animate-in fade-in duration-150">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default FloatingSpeedDialDemo;
