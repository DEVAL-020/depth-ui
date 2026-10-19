import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Globe,
  RefreshCw,
} from "lucide-react";

export interface TopLoadingBarProps {
  progress: number;
  color?: "cyan" | "violet" | "emerald" | "amber" | "rose";
  height?: number;
  showSpinner?: boolean;
  isError?: boolean;
}

export const TopLoadingBar: React.FC<TopLoadingBarProps> = ({
  progress,
  color = "cyan",
  height = 3,
  showSpinner = true,
  isError = false,
}) => {
  const colorGradients = {
    cyan: "from-cyan-400 via-blue-500 to-indigo-500",
    violet: "from-violet-500 via-fuchsia-500 to-indigo-400",
    emerald: "from-emerald-400 via-teal-500 to-cyan-400",
    amber: "from-amber-400 via-orange-500 to-rose-500",
    rose: "from-rose-500 via-pink-500 to-red-500",
  };

  const glowColors = {
    cyan: "rgba(6, 182, 212, 0.7)",
    violet: "rgba(168, 85, 247, 0.7)",
    emerald: "rgba(16, 185, 129, 0.7)",
    amber: "rgba(245, 158, 11, 0.7)",
    rose: "rgba(244, 63, 94, 0.8)",
  };

  const activeColor = isError ? "rose" : color;

  if (progress <= 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Progress Bar Track */}
      <div
        className="w-full bg-transparent overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className={`h-full bg-gradient-to-r ${colorGradients[activeColor]} transition-all duration-300 ease-out relative`}
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
            boxShadow: `0 0 12px ${glowColors[activeColor]}, 0 0 4px ${glowColors[activeColor]}`,
          }}
        >
          {/* Shimmer Pulse on leading tip */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/90"
            style={{
              boxShadow: `0 0 16px ${glowColors[activeColor]}`,
            }}
          />
        </div>
      </div>

      {/* Optional Top Right Corner Pulse Spinner */}
      {showSpinner && progress < 100 && (
        <div className="absolute top-3 right-4 z-50 flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-lg backdrop-blur-md">
          <div
            className="w-3.5 h-3.5 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin"
            style={{
              borderTopColor: isError ? "#f43f5e" : undefined,
              borderRightColor: isError ? "#f43f5e" : undefined,
            }}
          />
          <span className="text-[11px] font-mono text-zinc-300 font-medium">
            {isError ? "Request Failed" : `${Math.round(progress)}%`}
          </span>
        </div>
      )}
    </div>
  );
};

export const TopLoadingBarDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeColor, setActiveColor] = useState<
    "cyan" | "violet" | "emerald" | "amber" | "rose"
  >("cyan");
  const [barHeight] = useState(3);
  const [isError, setIsError] = useState(false);
  const [mockRoute, setMockRoute] = useState("/dashboard/analytics");
  const intervalRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startLoading = () => {
    clearTimer();
    setIsError(false);
    setProgress(15);

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearTimer();
          return 90;
        }
        const step = Math.random() * 18 + 5;
        return Math.min(prev + step, 90);
      });
    }, 280);
  };

  const completeLoading = () => {
    clearTimer();
    setIsError(false);
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
    }, 600);
  };

  const triggerError = () => {
    clearTimer();
    setIsError(true);
    setProgress(65);
    setTimeout(() => {
      setProgress(0);
      setIsError(false);
    }, 1800);
  };

  const addChunk = (amount: number) => {
    clearTimer();
    setIsError(false);
    setProgress((prev) => Math.min(100, Math.max(0, prev + amount)));
  };

  const resetBar = () => {
    clearTimer();
    setProgress(0);
    setIsError(false);
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Active Embedded Browser Simulator with Top Loader */}
      <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Top Loading Bar attached inside simulated browser */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
          <div
            className="w-full bg-zinc-900/60 overflow-hidden"
            style={{ height: `${barHeight}px` }}
          >
            {progress > 0 && (
              <div
                className={`h-full bg-gradient-to-r ${
                  isError
                    ? "from-rose-500 via-pink-500 to-red-500"
                    : activeColor === "cyan"
                      ? "from-cyan-400 via-blue-500 to-indigo-500"
                      : activeColor === "violet"
                        ? "from-violet-500 via-fuchsia-500 to-indigo-400"
                        : activeColor === "emerald"
                          ? "from-emerald-400 via-teal-500 to-cyan-400"
                          : "from-amber-400 via-orange-500 to-rose-500"
                } transition-all duration-300 ease-out relative`}
                style={{
                  width: `${progress}%`,
                  height: `${barHeight}px`,
                  boxShadow: `0 0 10px rgba(6, 182, 212, 0.7)`,
                }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-white/90" />
              </div>
            )}
          </div>
        </div>

        {/* Browser Top Chrome */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex-1 max-w-md mx-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-400">
              <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="truncate">
                https://depth-ui.netlify.app{mockRoute}
              </span>
              {progress > 0 && progress < 100 && (
                <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin ml-auto shrink-0" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              {progress > 0 ? `${Math.round(progress)}%` : "Idle"}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                progress > 0
                  ? isError
                    ? "bg-rose-500"
                    : "bg-cyan-400 animate-ping"
                  : "bg-zinc-600"
              }`}
            />
          </div>
        </div>

        {/* Simulated Web Application Canvas */}
        <div className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 min-h-[220px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-800/80 text-xs font-medium text-zinc-300 border border-zinc-700/60 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Live Route Simulator
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Navigation Progress Bar
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Zero-friction top progress loader matching Next.js, GitHub, and
                YouTube visual fidelity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setMockRoute("/components/glow-card");
                  startLoading();
                  setTimeout(completeLoading, 900);
                }}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition-colors cursor-pointer"
              >
                Mock Route Click
              </button>
              <button
                onClick={() => {
                  setMockRoute("/api/v1/datasets");
                  startLoading();
                  setTimeout(triggerError, 1100);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 text-xs font-medium transition-colors cursor-pointer"
              >
                Simulate 500 Error
              </button>
            </div>
          </div>

          {/* Interactive State Visualizer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 font-medium block">
                Status
              </span>
              <span className="text-xs font-semibold text-white mt-0.5 block">
                {progress === 0
                  ? "Idle"
                  : progress === 100
                    ? "Completed"
                    : isError
                      ? "Network Error"
                      : "Loading..."}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 font-medium block">
                Progress
              </span>
              <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 font-medium block">
                Bar Thickness
              </span>
              <span className="text-xs font-semibold text-white mt-0.5 block">
                {barHeight}px
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 font-medium block">
                Active Theme
              </span>
              <span className="text-xs font-semibold text-white capitalize mt-0.5 block">
                {isError ? "Rose (Error)" : activeColor}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Console */}
      <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Interactive Loader Controls
          </span>

          {/* Color Presets */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-500 mr-1">Palette:</span>
            {(["cyan", "violet", "emerald", "amber"] as const).map((col) => (
              <button
                key={col}
                onClick={() => {
                  setActiveColor(col);
                  setIsError(false);
                }}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                  activeColor === col
                    ? "ring-2 ring-white scale-110"
                    : "opacity-70 hover:opacity-100"
                } ${
                  col === "cyan"
                    ? "bg-cyan-400"
                    : col === "violet"
                      ? "bg-violet-500"
                      : col === "emerald"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                }`}
                aria-label={`Select ${col} theme`}
              />
            ))}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={startLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start Flow</span>
          </button>

          <button
            onClick={() => addChunk(25)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>+25% Increment</span>
          </button>

          <button
            onClick={completeLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete (100%)</span>
          </button>

          <button
            onClick={triggerError}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulate Error</span>
          </button>

          <button
            onClick={resetBar}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-medium transition-colors cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TopLoadingBarDemo;
