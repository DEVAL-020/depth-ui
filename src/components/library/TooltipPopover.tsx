import React, { useState, useRef, useEffect } from "react";
import { Info, HelpCircle, User, ExternalLink } from "lucide-react";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-50 px-2.5 py-1 text-[11px] font-medium text-white bg-zinc-900 border border-zinc-700 rounded-md shadow-lg whitespace-nowrap pointer-events-none animate-fadeIn ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {content}
          <div
            className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
              position === "top"
                ? "top-full border-t-zinc-900 -mt-[1px]"
                : "bottom-full border-b-zinc-900 -mb-[1px]"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export const TooltipPopoverDemo: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      {/* Tooltips */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-zinc-400">
          Hover tooltips
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <Tooltip content="Direct copy-paste code with zero package lock-in">
            <button className="px-3.5 py-1.5 rounded-lg bg-[#18181b] border border-zinc-800 text-xs text-zinc-300 hover:text-white cursor-pointer flex items-center gap-1.5">
              <span>Zero Dependencies</span>
              <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </Tooltip>

          <Tooltip content="GPU-accelerated 60 FPS transitions">
            <button className="px-3.5 py-1.5 rounded-lg bg-[#18181b] border border-zinc-800 text-xs text-zinc-300 hover:text-white cursor-pointer flex items-center gap-1.5">
              <span>Hardware Accelerated</span>
              <Info className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Popover Card */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <span className="text-xs font-medium text-zinc-400">Click popover</span>
        <div className="relative inline-block" ref={popoverRef}>
          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-zinc-200 cursor-pointer shadow-xs flex items-center gap-2"
          >
            <User className="w-3.5 h-3.5" />
            <span>View User Profile Popover</span>
          </button>

          {isPopoverOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 p-4 rounded-xl bg-[#18181b] border border-zinc-800 shadow-2xl z-30 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-white">
                  DU
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    Depth UI Team
                  </h4>
                  <p className="text-[11px] text-zinc-400">core@depthui.dev</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Building accessible, high-performance UI components for modern
                web developers.
              </p>
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500">100+ Components</span>
                <a
                  href="#components-catalog"
                  onClick={() => setIsPopoverOpen(false)}
                  className="text-white hover:underline flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TooltipPopoverDemo;
