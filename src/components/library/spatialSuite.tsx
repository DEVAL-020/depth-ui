import React, { useState, useRef, useEffect } from "react";
import { Box, Layers, Volume2, Cpu, ShieldCheck, Sparkles } from "lucide-react";

// 1. Tilt Parallax Card
export const TiltParallaxCardDemo: React.FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: -(y / rect.height) * 20, y: (x / rect.width) * 20 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 p-4 flex items-center justify-center">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="w-full max-w-sm p-6 rounded-3xl bg-gradient-to-br from-[#18181f] via-zinc-900 to-zinc-950 border border-zinc-700/80 shadow-2xl relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-radial from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="space-y-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">
              3D Parallax Gyroscope
            </h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Hover mouse cursor over this card to dynamically inspect true 3D
              perspective orientation.
            </p>
          </div>
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>
              Tilt: X:{Math.round(rotate.x)}° Y:{Math.round(rotate.y)}°
            </span>
            <span className="text-violet-400">120 FPS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Dot Matrix Canvas
export const DotMatrixCanvasDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 180;

    const rows = 10;
    const cols = 22;
    const gap = 18;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 12 + c * gap;
        const y = 12 + r * gap;
        const dist = Math.hypot(x - 200, y - 90);
        const alpha = Math.max(0.1, 1 - dist / 150);
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.fill();
      }
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-2xl bg-[#111116] border border-zinc-800 text-center space-y-2">
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-xl bg-zinc-950/80 mx-auto"
      />
      <div className="text-xs text-zinc-400 font-medium">
        Interactive Point Matrix Field
      </div>
    </div>
  );
};

// 3. Particle Network Canvas
export const ParticleNetworkCanvasDemo: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto h-48 rounded-2xl bg-zinc-950 border border-zinc-800 p-4 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-radial from-cyan-950/30 via-zinc-950 to-zinc-950" />
      <div className="relative z-10 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
          <Cpu className="w-3.5 h-3.5" />
          <span>Constellation Web</span>
        </div>
        <h4 className="text-base font-bold text-white tracking-tight">
          Connected Graph Network
        </h4>
        <p className="text-xs text-zinc-400 max-w-xs">
          Dynamic nodes linked with spring distance vectors.
        </p>
      </div>
    </div>
  );
};

// 4. Perspective Device Mockup
export const PerspectiveDeviceMockupDemo: React.FC = () => {
  return (
    <div className="perspective-1000 p-4 max-w-md mx-auto">
      <div
        style={{ transform: "rotateX(15deg) rotateY(-10deg) rotateZ(2deg)" }}
        className="rounded-2xl bg-zinc-900 border-2 border-zinc-700/80 p-3 shadow-2xl shadow-cyan-500/10 space-y-2"
      >
        <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-800">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] text-zinc-400 font-medium">
            depth-ui.dev
          </span>
        </div>
        <div className="h-28 rounded-xl bg-gradient-to-br from-violet-950/60 via-zinc-950 to-zinc-900 p-4 flex items-center justify-center text-center">
          <span className="text-xs font-semibold text-white">
            Realistic 3D Isometric Viewport
          </span>
        </div>
      </div>
    </div>
  );
};

// 5. Radar Pulse Scanner
export const RadarPulseScannerDemo: React.FC = () => {
  return (
    <div className="w-full max-w-xs mx-auto p-6 rounded-2xl bg-[#111116] border border-zinc-800 text-center space-y-4">
      <div className="relative w-36 h-36 mx-auto rounded-full border border-emerald-500/30 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 rounded-full border border-emerald-500/20 scale-75" />
        <div className="absolute inset-0 rounded-full border border-emerald-500/10 scale-50" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-500/20" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-emerald-500/20" />
        {/* Sweep Beam */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-transparent rounded-full animate-spin [animation-duration:3s]" />
        <div className="w-2 h-2 rounded-full bg-emerald-400 z-10 shadow-[0_0_8px_#10b981]" />
        <div className="absolute top-8 right-10 w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
      </div>
      <div className="text-xs font-semibold text-emerald-400">
        Scanning Satellite Node 04
      </div>
    </div>
  );
};

// 6. Audio Visualizer Bars
export const AudioVisualizerBarsDemo: React.FC = () => {
  const bars = [40, 75, 55, 90, 65, 80, 45, 95, 70, 50, 85, 60];

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400 font-medium flex items-center gap-1.5">
          <Volume2 className="w-4 h-4 text-cyan-400" />
          Frequency Spectrum
        </span>
        <span className="text-cyan-400 font-semibold">44.1 kHz FLAC</span>
      </div>

      <div className="h-20 flex items-end justify-between gap-1.5 pt-2">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-500 to-violet-500 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

// 7. Isometric Cubes Grid
export const IsometricCubesGridDemo: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 max-w-md mx-auto text-center space-y-3">
      <div className="flex items-center justify-center gap-3">
        {["Microservices", "Database Cache", "Auth Worker"].map((label) => (
          <div
            key={label}
            className="w-24 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg space-y-1"
          >
            <Layers className="w-5 h-5 text-violet-400 mx-auto" />
            <div className="text-[10px] font-semibold text-white leading-tight">
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-400">
        Interactive isometric architecture nodes
      </p>
    </div>
  );
};

// 8. Holographic Badge 3D
export const HolographicBadge3DDemo: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-violet-500 via-cyan-400 via-emerald-400 to-fuchsia-500 shadow-2xl transition-transform hover:scale-110 duration-300 cursor-pointer">
        <div className="px-5 py-4 rounded-[14px] bg-zinc-950 flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-cyan-300 drop-shadow" />
          <div>
            <div className="text-xs font-bold text-white tracking-wide">
              SOC-2 Type II Certified
            </div>
            <div className="text-[11px] text-zinc-400">
              Hardware Security Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. Stacked Cards 3D
export const StackedCards3DDemo: React.FC = () => {
  return (
    <div className="relative w-64 h-36 mx-auto group cursor-pointer my-4">
      {/* Card 3 (back) */}
      <div className="absolute inset-0 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 transform translate-y-4 scale-90 group-hover:translate-y-7 transition-transform duration-300" />
      {/* Card 2 (middle) */}
      <div className="absolute inset-0 rounded-2xl bg-zinc-800/90 border border-zinc-700 transform translate-y-2 scale-95 group-hover:translate-y-3.5 transition-transform duration-300" />
      {/* Card 1 (front) */}
      <div className="absolute inset-0 rounded-2xl bg-zinc-900 border border-zinc-600 p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-white">Production Deck</span>
          <Sparkles className="w-4 h-4 text-violet-400" />
        </div>
        <p className="text-xs text-zinc-400">
          Hover to fan out 3D perspective layers.
        </p>
      </div>
    </div>
  );
};
