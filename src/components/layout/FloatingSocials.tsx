import React, { useState } from "react";
import { ExternalLink, X } from "lucide-react";

export const FloatingSocials: React.FC = () => {
  const [minimized, setMinimizedState] = useState(() => {
    try {
      return sessionStorage.getItem("depth_ui_socials_min") === "true";
    } catch {
      return false;
    }
  });

  const setMinimized = (val: boolean) => {
    setMinimizedState(val);
    try {
      sessionStorage.setItem("depth_ui_socials_min", String(val));
    } catch {
      // Storage unavailable
    }
  };

  return (
    <aside
      aria-label="Creator Social Links"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2"
    >
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/95 hover:bg-zinc-800 text-white border border-zinc-700/80 shadow-2xl backdrop-blur-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Expand Depth UI social links"
          title="Depth UI"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold">Depth UI</span>
        </button>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-zinc-950/90 backdrop-blur-xl border border-zinc-700/80 shadow-[0_8px_30px_rgb(0,0,0,0.45)] transition-all animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Creator Pill Avatar / Status */}
          <div className="hidden md:flex items-center gap-1.5 pl-2.5 pr-1.5 text-xs text-zinc-300 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-400 font-mono text-[11px]">
              Developer:
            </span>
            <span className="text-white font-semibold">Deval</span>
          </div>

          {/* Floating GitHub Button */}
          <a
            href="https://github.com/DEVAL-020"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Deval Patel on GitHub (DEVAL-020)"
            className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 hover:border-zinc-500 shadow-md transition-all duration-200 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="text-xs font-semibold tracking-tight">
              <span className="hidden sm:inline">GitHub: </span>
              <span>DEVAL-020</span>
            </span>
            <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0" />
          </a>

          {/* Floating LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/gecgce2024deval"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Deval Patel on LinkedIn"
            className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white border border-blue-400/40 shadow-lg shadow-blue-950/40 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="text-xs font-semibold tracking-tight">
              <span>LinkedIn</span>
            </span>
            <ExternalLink className="w-3 h-3 text-blue-200 group-hover:text-white transition-colors shrink-0" />
          </a>

          {/* Minimize toggle */}
          <button
            onClick={() => setMinimized(true)}
            aria-label="Minimize floating social buttons"
            title="Minimize"
            className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default FloatingSocials;
