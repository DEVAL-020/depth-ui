import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Play,
  Pause,
  Cpu,
  Shield,
  Layers,
  Terminal,
  Cloud,
  Activity,
} from "lucide-react";

export const Interactive3DCubeDemo: React.FC = () => {
  const [rotation, setRotation] = useState({ x: -22, y: 35 });
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });

  // Auto-spin animation loop
  useEffect(() => {
    let animId: number;
    const spin = () => {
      if (isAutoSpin && !isDraggingRef.current) {
        setRotation((prev) => ({
          x: prev.x,
          y: (prev.y + 0.4) % 360,
        }));
      }
      animId = requestAnimationFrame(spin);
    };
    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startRotRef.current = { ...rotation };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    setRotation({
      x: Math.max(-85, Math.min(85, startRotRef.current.x - dy * 0.45)),
      y: (startRotRef.current.y + dx * 0.45) % 360,
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const faceAngles: Record<string, { x: number; y: number }> = {
    front: { x: 0, y: 0 },
    back: { x: 0, y: 180 },
    right: { x: 0, y: -90 },
    left: { x: 0, y: 90 },
    top: { x: -90, y: 0 },
    bottom: { x: 90, y: 0 },
  };

  const snapToFace = (face: string) => {
    setIsAutoSpin(false);
    const target = faceAngles[face];
    if (target) {
      setRotation(target);
    }
  };

  // Cube dimensions (180px cube -> translateZ = 90px)
  const halfSize = 100;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 3D Scene Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[400px] sm:h-[440px] rounded-3xl bg-radial from-[#12121a] via-[#0d0d12] to-black border border-zinc-800 shadow-2xl overflow-hidden select-none flex flex-col justify-between p-6 cursor-grab active:cursor-grabbing"
      >
        {/* Top Info Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 z-10">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              INTERACTIVE 3D FEATURE CUBE
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 hidden sm:inline">
              CSS 3D Engine
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <span>Drag to rotate</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">
              X: {Math.round(rotation.x)}° Y: {Math.round(rotation.y)}°
            </span>
          </div>
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          className="my-auto mx-auto w-full flex items-center justify-center py-10"
          style={{ perspective: "1100px" }}
        >
          {/* The 3D Rotating Cube Object */}
          <div
            className="relative transition-transform duration-300 ease-out"
            style={{
              width: `${halfSize * 2}px`,
              height: `${halfSize * 2}px`,
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            {/* FACE 1: FRONT (Spatial Computing) */}
            <div
              className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-br from-cyan-950/90 via-zinc-900 to-zinc-950 border border-cyan-500/40 shadow-2xl flex flex-col justify-between backdrop-blur-md"
              style={{ transform: `translateZ(${halfSize}px)` }}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  Front
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Spatial Engine
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  WebGL 3D render pipelines with zero bundle overhead.
                </p>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                <span>Tier 01</span>
                <span>120 FPS</span>
              </div>
            </div>

            {/* FACE 2: BACK (Quantum Auth) */}
            <div
              className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-br from-emerald-950/90 via-zinc-900 to-zinc-950 border border-emerald-500/40 shadow-2xl flex flex-col justify-between backdrop-blur-md"
              style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  Back
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Quantum Shield
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  Hardware-grade key encryption and biometric MFA passkeys.
                </p>
              </div>
              <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                <span>Auth Guard</span>
                <span>End-to-End</span>
              </div>
            </div>

            {/* FACE 3: RIGHT (Edge Network) */}
            <div
              className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-br from-violet-950/90 via-zinc-900 to-zinc-950 border border-violet-500/40 shadow-2xl flex flex-col justify-between backdrop-blur-md"
              style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
                  <Cloud className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  Right
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Global Edge
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  Sub-10ms cache invalidation across 300+ worldwide PoPs.
                </p>
              </div>
              <div className="pt-2 border-t border-violet-900/40 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                <span>CDN Cache</span>
                <span>300 PoPs</span>
              </div>
            </div>

            {/* FACE 4: LEFT (Developer API) */}
            <div
              className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-br from-amber-950/90 via-zinc-900 to-zinc-950 border border-amber-500/40 shadow-2xl flex flex-col justify-between backdrop-blur-md"
              style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  Left
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Developer API
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  TypeScript strict schemas with automated SDK generation.
                </p>
              </div>
              <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                <span>REST / GraphQL</span>
                <span>TypeSafe</span>
              </div>
            </div>

            {/* FACE 5: TOP (Telemetry) */}
            <div
              className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-br from-blue-950/90 via-zinc-900 to-zinc-950 border border-blue-500/40 shadow-2xl flex flex-col justify-between backdrop-blur-md"
              style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  Top
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Live Analytics
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  Real-time Web Vitals and user journey tracing.
                </p>
              </div>
              <div className="pt-2 border-t border-blue-900/40 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                <span>P99 &lt; 20ms</span>
                <span>Verified</span>
              </div>
            </div>

            {/* FACE 6: BOTTOM (Core Primitives) */}
            <div
              className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-br from-indigo-950/90 via-zinc-900 to-zinc-950 border border-indigo-500/40 shadow-2xl flex flex-col justify-between backdrop-blur-md"
              style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  Bottom
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Depth UI Core
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  100+ accessible React and Tailwind components.
                </p>
              </div>
              <div className="pt-2 border-t border-indigo-900/40 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                <span>MIT License</span>
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800/80 pt-3 z-10 text-xs">
          {/* Quick Snap Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-zinc-400 text-xs font-medium mr-1">
              Snap face:
            </span>
            {["front", "back", "right", "left", "top", "bottom"].map((f) => (
              <button
                key={f}
                onClick={() => snapToFace(f)}
                className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white capitalize text-xs font-medium border border-zinc-700/50 transition-colors cursor-pointer"
              >
                {f}
              </button>
            ))}
          </div>

          {/* Auto Spin Toggle */}
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-200 hover:text-white text-xs font-medium border border-zinc-700/60 shadow-xs transition-colors cursor-pointer"
          >
            {isAutoSpin ? (
              <Pause className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Play className="w-3.5 h-3.5 text-zinc-300" />
            )}
            <span>{isAutoSpin ? "Pause rotation" : "Resume rotation"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Interactive3DCubeDemo;
