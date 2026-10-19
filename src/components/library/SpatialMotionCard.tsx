import React, { useState, useRef } from "react";
import {
  CreditCard,
  ArrowUpRight,
  Shield,
  Zap,
  Check,
  Lock,
  Cpu,
  Wifi,
  Sliders,
} from "lucide-react";

export interface MotionCardProps {
  title?: string;
  subtitle?: string;
  category?: string;
  tag?: string;
  intensity?: number;
}

export const SpatialMotionCardDemo: React.FC = () => {
  // Card 1 State (Spatial Hologram ID)
  const card1Ref = useRef<HTMLDivElement>(null);
  const [rotate1, setRotate1] = useState({ x: 0, y: 0 });
  const [glare1, setGlare1] = useState({ x: 50, y: 50, opacity: 0 });

  // Card 2 State (Cybernetic NFC Pass)
  const card2Ref = useRef<HTMLDivElement>(null);
  const [rotate2, setRotate2] = useState({ x: 0, y: 0 });
  const [glare2, setGlare2] = useState({ x: 50, y: 50, opacity: 0 });

  // Card 3 State (Glass Kinetic Layer Card)
  const card3Ref = useRef<HTMLDivElement>(null);
  const [rotate3, setRotate3] = useState({ x: 0, y: 0 });
  const [glare3, setGlare3] = useState({ x: 50, y: 50, opacity: 0 });

  const [tiltStrength, setTiltStrength] = useState<number>(18);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardRef: React.RefObject<HTMLDivElement | null>,
    setRotate: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    setGlare: React.Dispatch<
      React.SetStateAction<{ x: number; y: number; opacity: number }>
    >,
  ) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-tiltStrength to +tiltStrength deg)
    const rotateX = ((y - centerY) / centerY) * -tiltStrength;
    const rotateY = ((x - centerX) / centerX) * tiltStrength;

    // Calculate glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.65 });
  };

  const handleMouseLeave = (
    setRotate: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    setGlare: React.Dispatch<
      React.SetStateAction<{ x: number; y: number; opacity: number }>
    >,
  ) => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 3D Motion Cards Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Spatial Hologram Card */}
        <div
          ref={card1Ref}
          onMouseMove={(e) =>
            handleMouseMove(e, card1Ref, setRotate1, setGlare1)
          }
          onMouseLeave={() => handleMouseLeave(setRotate1, setGlare1)}
          style={{
            perspective: "1000px",
          }}
          className="relative h-[340px] rounded-3xl cursor-pointer group"
        >
          <div
            className="w-full h-full rounded-3xl p-6 bg-gradient-to-br from-zinc-900 via-[#14141d] to-zinc-950 border border-zinc-700/60 shadow-2xl transition-transform duration-150 ease-out relative overflow-hidden flex flex-col justify-between"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotate1.x}deg) rotateY(${rotate1.y}deg)`,
            }}
          >
            {/* Dynamic Specular Glare Reflection */}
            <div
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-overlay rounded-3xl"
              style={{
                background: `radial-gradient(circle at ${glare1.x}% ${glare1.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
                opacity: glare1.opacity,
              }}
            />

            {/* Ambient Violet Glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-violet-600/20 blur-2xl" />

            {/* Floating Top Elements (translateZ 40px) */}
            <div
              className="flex items-center justify-between z-10 transition-transform duration-200"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-sm">
                <Cpu className="w-5 h-5" />
              </div>

              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-violet-950/80 text-violet-300 border border-violet-700/60 shadow-md">
                SPATIAL PASS
              </span>
            </div>

            {/* Floating Mid Layer (translateZ 30px) */}
            <div
              className="z-10 space-y-1 transition-transform duration-200 my-auto"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                Access Tier 01
              </span>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Quantum Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                Spatial compute clusters with zero-latency streaming.
              </p>
            </div>

            {/* Floating Bottom Row (translateZ 50px) */}
            <div
              className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs z-10 transition-transform duration-200"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified ID: 9021</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Cybernetic NFC Card */}
        <div
          ref={card2Ref}
          onMouseMove={(e) =>
            handleMouseMove(e, card2Ref, setRotate2, setGlare2)
          }
          onMouseLeave={() => handleMouseLeave(setRotate2, setGlare2)}
          style={{
            perspective: "1000px",
          }}
          className="relative h-[340px] rounded-3xl cursor-pointer group"
        >
          <div
            className="w-full h-full rounded-3xl p-6 bg-gradient-to-br from-[#0c131a] via-[#0d1822] to-zinc-950 border border-cyan-800/40 shadow-2xl transition-transform duration-150 ease-out relative overflow-hidden flex flex-col justify-between"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotate2.x}deg) rotateY(${rotate2.y}deg)`,
            }}
          >
            {/* Dynamic Specular Glare */}
            <div
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-overlay rounded-3xl"
              style={{
                background: `radial-gradient(circle at ${glare2.x}% ${glare2.y}%, rgba(6,182,212,0.8) 0%, rgba(255,255,255,0) 60%)`,
                opacity: glare2.opacity,
              }}
            />

            <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl" />

            {/* Top Bar */}
            <div
              className="flex items-center justify-between z-10"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <Wifi className="w-4 h-4 text-cyan-400/80 rotate-90" />
              </div>
              <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider">
                DEPTH//NFC
              </span>
            </div>

            {/* Card Chip & Middle Details */}
            <div
              className="z-10 space-y-2 my-auto"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 border border-amber-200/50 shadow-inner flex items-center justify-center">
                <div className="w-6 h-4 border border-amber-700/40 rounded-xs" />
              </div>

              <div className="font-mono text-sm tracking-widest text-zinc-300 font-semibold pt-2">
                •••• •••• •••• 4096
              </div>
              <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <span>VALID THRU: 10/29</span>
                <span>•</span>
                <span>DEVAL PATEL</span>
              </div>
            </div>

            {/* Bottom Bar */}
            <div
              className="pt-4 border-t border-cyan-900/40 flex items-center justify-between text-xs z-10"
              style={{ transform: "translateZ(50px)" }}
            >
              <span className="text-[11px] font-mono text-zinc-400">
                Encrypted Key
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>HARDWARE AUTH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Emerald Motion Velocity Card */}
        <div
          ref={card3Ref}
          onMouseMove={(e) =>
            handleMouseMove(e, card3Ref, setRotate3, setGlare3)
          }
          onMouseLeave={() => handleMouseLeave(setRotate3, setGlare3)}
          style={{
            perspective: "1000px",
          }}
          className="relative h-[340px] rounded-3xl cursor-pointer group"
        >
          <div
            className="w-full h-full rounded-3xl p-6 bg-gradient-to-br from-[#0c1813] via-[#0e1d17] to-zinc-950 border border-emerald-800/40 shadow-2xl transition-transform duration-150 ease-out relative overflow-hidden flex flex-col justify-between"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotate3.x}deg) rotateY(${rotate3.y}deg)`,
            }}
          >
            {/* Dynamic Specular Glare */}
            <div
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-overlay rounded-3xl"
              style={{
                background: `radial-gradient(circle at ${glare3.x}% ${glare3.y}%, rgba(16,185,129,0.7) 0%, rgba(255,255,255,0) 60%)`,
                opacity: glare3.opacity,
              }}
            />

            {/* Top Bar */}
            <div
              className="flex items-center justify-between z-10"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 shadow-md">
                120 FPS KINETIC
              </span>
            </div>

            {/* Middle Details */}
            <div
              className="z-10 space-y-1 my-auto"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                Fluid Motion
              </span>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Spring Acceleration
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                Multi-axis gyroscope response with authentic specular ray
                bounce.
              </p>
            </div>

            {/* Bottom Row */}
            <div
              className="pt-4 border-t border-emerald-900/40 flex items-center justify-between text-xs z-10"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                <Check className="w-3.5 h-3.5" />
                <span>Zero Layout Shift</span>
              </div>
              <span className="text-zinc-500 font-mono text-[10px]">
                CSS 3D Engine
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tilt Angle Sensitivity Control */}
      <div className="p-4 rounded-2xl bg-[#121217] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-zinc-300">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="font-medium">3D Perspective Tilt Angle:</span>
          <span className="font-mono text-cyan-300 font-bold">
            {tiltStrength}°
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-64">
          <span className="text-[11px] text-zinc-500 font-mono">10°</span>
          <input
            type="range"
            min="8"
            max="30"
            value={tiltStrength}
            onChange={(e) => setTiltStrength(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-[11px] text-zinc-500 font-mono">30°</span>
        </div>
      </div>
    </div>
  );
};
export default SpatialMotionCardDemo;
