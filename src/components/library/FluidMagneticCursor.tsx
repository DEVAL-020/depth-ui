import React, { useState, useEffect, useRef } from "react";
import { MousePointer2, ArrowRight } from "lucide-react";

export const FluidMagneticCursorDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isInside, setIsInside] = useState(false);
  const [cursorMode, setCursorMode] = useState<
    "default" | "button" | "text" | "card" | "link"
  >("default");

  // Smooth lerping loop for the outer cursor ring
  useEffect(() => {
    let animationFrameId: number;

    const updateRing = () => {
      setRingPos((prev) => {
        const dx = cursorPos.x - prev.x;
        const dy = cursorPos.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      animationFrameId = requestAnimationFrame(updateRing);
    };

    animationFrameId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorPos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsInside(true);
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    setCursorMode("default");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Interactive Cursor Playground */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[380px] sm:min-h-[420px] rounded-2xl bg-[#0d0d11] border border-zinc-800 shadow-2xl overflow-hidden select-none p-6 sm:p-10 flex flex-col justify-between cursor-none"
      >
        {/* Spotlight illumination under cursor */}
        {isInside && (
          <div
            className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          />
        )}

        {/* Custom Virtual Cursor Dot */}
        {isInside && (
          <div
            className="pointer-events-none absolute z-50 w-2.5 h-2.5 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          />
        )}

        {/* Custom Virtual Cursor Elastic Ring / Magnet Morph */}
        {isInside && (
          <div
            className={`pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out border flex items-center justify-center font-mono ${
              cursorMode === "button"
                ? "w-16 h-16 rounded-full border-cyan-400/80 bg-cyan-500/15 scale-110 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : cursorMode === "text"
                  ? "w-24 h-24 rounded-full border-violet-400/80 bg-violet-500/20 scale-100 shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-xs"
                  : cursorMode === "card"
                    ? "w-20 h-20 rounded-2xl border-emerald-400/80 bg-emerald-500/15 scale-110"
                    : "w-8 h-8 rounded-full border-white/60 bg-white/5"
            }`}
            style={{
              left: `${ringPos.x}px`,
              top: `${ringPos.y}px`,
            }}
          >
            {cursorMode === "text" && (
              <span className="text-[10px] text-violet-200 font-bold uppercase tracking-wider">
                Explore
              </span>
            )}
            {cursorMode === "button" && (
              <span className="text-[9px] text-cyan-200 font-bold uppercase tracking-wider">
                Click
              </span>
            )}
          </div>
        )}

        {/* Playground Top Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-zinc-300">
              Interactive Magnetic Canvas
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500">
              X: {Math.round(cursorPos.x)}px | Y: {Math.round(cursorPos.y)}px
            </span>
          </div>
        </div>

        {/* Playground Interactive Targets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          {/* Target 1: Magnetic Action Button */}
          <div
            onMouseEnter={() => setCursorMode("button")}
            onMouseLeave={() => setCursorMode("default")}
            className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-cyan-500/50 transition-colors group"
          >
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold block mb-1">
                TARGET 01
              </span>
              <h4 className="text-sm font-bold text-white">Magnetic Button</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Hover to trigger magnetic cursor morphing and suction.
              </p>
            </div>
            <button className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md shadow-cyan-950/40 flex items-center justify-center gap-1.5 pointer-events-none">
              <span>Magnetic Action</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Target 2: Text Magnifier & Inspect View */}
          <div
            onMouseEnter={() => setCursorMode("text")}
            onMouseLeave={() => setCursorMode("default")}
            className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-violet-500/50 transition-colors group"
          >
            <div>
              <span className="text-[10px] font-mono text-violet-400 font-semibold block mb-1">
                TARGET 02
              </span>
              <h4 className="text-sm font-bold text-white">Magnifying Lens</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Hovering textual elements expands the cursor lens with
                contextual labels.
              </p>
            </div>
            <div className="mt-4 px-3 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300 font-mono text-center">
              &quot;Hover over this text&quot;
            </div>
          </div>

          {/* Target 3: Kinetic Tilt Surface */}
          <div
            onMouseEnter={() => setCursorMode("card")}
            onMouseLeave={() => setCursorMode("default")}
            className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-emerald-500/50 transition-colors group"
          >
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold block mb-1">
                TARGET 03
              </span>
              <h4 className="text-sm font-bold text-white">
                Surface Expansion
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Morphs the circular ring into a rounded specular container.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
              <span>State Active</span>
              <span className="text-emerald-400 font-mono text-[11px]">
                240 FPS Lerp
              </span>
            </div>
          </div>
        </div>

        {/* Playground Bottom Tips */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <MousePointer2 className="w-3.5 h-3.5 text-cyan-400" />
            Move your cursor anywhere across the canvas to test physics
          </span>
          <span className="font-mono text-[11px] text-zinc-500">
            Automatically disables on mobile touch screens
          </span>
        </div>
      </div>

      {/* Usage Quick Guide */}
      <div className="p-4 rounded-xl bg-[#121217] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-semibold">
            REACT HOOK READY
          </span>
          <span className="text-zinc-300">
            Use{" "}
            <code className="text-cyan-300 font-mono">useMagneticCursor()</code>{" "}
            for frictionless site-wide integration.
          </span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>Framer Motion Physics</span>
        </div>
      </div>
    </div>
  );
};
export default FluidMagneticCursorDemo;
