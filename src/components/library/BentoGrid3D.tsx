import React, { useState } from "react";
import { motion } from "framer-motion";
import { Radar, Activity, Layers, ArrowUpRight, Terminal } from "lucide-react";

export const BentoGrid3D: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto p-2">
      {/* Bento Item 1: Network / Activity Scanner */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="md:col-span-2 relative rounded-2xl bg-[#121215] border border-zinc-800 p-5 flex flex-col justify-between shadow-sm"
      >
        <div className="flex items-center justify-between z-10 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
              <Radar className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-white font-medium text-sm">
                System Telemetry
              </h4>
              <p className="text-xs text-zinc-500">
                Real-time status and health check
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Operational
          </span>
        </div>

        {/* Minimal Radar / Grid Canvas */}
        <div className="relative h-36 rounded-xl bg-[#18181b] border border-zinc-800 flex items-center justify-center overflow-hidden z-10">
          <div className="absolute w-32 h-32 rounded-full border border-zinc-800" />
          <div className="absolute w-20 h-20 rounded-full border border-zinc-800" />
          <div className="absolute w-10 h-10 rounded-full border border-zinc-800" />
          <div className="absolute w-full h-[1px] bg-zinc-800" />
          <div className="absolute h-full w-[1px] bg-zinc-800" />

          {/* Radar Blips */}
          <span className="absolute top-8 right-20 w-2 h-2 bg-zinc-300 rounded-full shadow-xs" />
          <span className="absolute bottom-10 left-24 w-1.5 h-1.5 bg-zinc-400 rounded-full" />
          <span className="absolute top-16 left-32 w-1.5 h-1.5 bg-zinc-500 rounded-full" />

          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-500">
            Active Nodes: 12 • Latency: 0.4ms
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 z-10 text-[11px] text-zinc-500 font-mono">
          <span>REGION: US-EAST</span>
          <span>UPTIME: 99.98%</span>
          <span className="text-zinc-300 flex items-center gap-1 hover:text-white cursor-pointer">
            View Metrics <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </motion.div>

      {/* Bento Item 2: Layer Stack */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="relative rounded-2xl bg-[#121215] border border-zinc-800 p-5 flex flex-col justify-between shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-white font-medium text-sm">Layer Stack</h4>
              <p className="text-xs text-zinc-500">Elevation controls</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
            Z: +{activeLayer * 20}px
          </span>
        </div>

        {/* Interactive Layer Visualizer */}
        <div className="relative h-36 flex items-center justify-center perspective-1000">
          {[0, 1, 2, 3].map((layerIndex) => {
            const isSelected = activeLayer === layerIndex;
            return (
              <motion.div
                key={layerIndex}
                onClick={() => setActiveLayer(layerIndex)}
                animate={{
                  y: (3 - layerIndex) * 22 - 32,
                  scale: 0.88 + layerIndex * 0.04,
                  z: isSelected ? 30 : 0,
                }}
                className={`absolute w-40 h-12 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-between px-3 text-xs font-mono ${
                  isSelected
                    ? "bg-zinc-800 border-zinc-500 text-white shadow-sm"
                    : "bg-[#18181b] border-zinc-800 text-zinc-500 hover:border-zinc-700"
                }`}
              >
                <span>LAYER_{layerIndex}</span>
                <span className="text-[10px] opacity-75">
                  +{layerIndex * 20}px
                </span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-[11px] text-zinc-500 text-center font-mono">
          Click to adjust layer elevation
        </p>
      </motion.div>

      {/* Bento Item 3: Refresh Rate */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="relative rounded-2xl bg-[#121215] border border-zinc-800 p-5 flex flex-col justify-between shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
              <Activity className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-white font-medium text-sm">Display Sync</h4>
              <p className="text-xs text-zinc-500">Render frequency</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
            60 FPS
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-3">
          <div className="text-4xl font-bold text-white font-mono tracking-tight">
            120<span className="text-base text-zinc-500 font-normal">Hz</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-mono">
            Synced to Display Refresh
          </p>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-xs font-mono text-zinc-500">
          <div className="flex justify-between">
            <span>DRAW CALLS:</span>
            <span className="text-zinc-200">1</span>
          </div>
          <div className="flex justify-between">
            <span>STATUS:</span>
            <span className="text-emerald-500">Smooth</span>
          </div>
        </div>
      </motion.div>

      {/* Bento Item 4: Instant Code Terminal (Spans 2 columns) */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="md:col-span-2 relative rounded-2xl bg-[#121215] border border-zinc-800 p-5 flex flex-col justify-between shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-white font-medium text-sm">Command Line</h4>
              <p className="text-xs text-zinc-500">
                Add components directly to your workspace
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
            CLI
          </span>
        </div>

        <div className="rounded-xl bg-black border border-zinc-800 p-3 font-mono text-xs text-zinc-300 space-y-1.5">
          <div className="flex items-center gap-1.5 text-zinc-600 pb-1.5 border-b border-zinc-900">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="ml-1 text-[11px] text-zinc-500">bash</span>
          </div>
          <div className="text-zinc-200 flex items-center gap-2">
            <span className="text-zinc-500">$</span>
            <span>npx depth-ui add tilt-card globe dock</span>
          </div>
          <div className="text-zinc-500 text-[11px]">
            Installed 3 components in ./components/ui/
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
          <span>Fully customizable TypeScript source</span>
          <span className="text-zinc-300 font-mono">Self-contained</span>
        </div>
      </motion.div>
    </div>
  );
};
export default BentoGrid3D;
