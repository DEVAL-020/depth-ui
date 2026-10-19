import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sliders, MoveHorizontal } from "lucide-react";

export interface ImageComparisonSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeImage = "/images/workspace.jpg",
  afterImage = "/images/fluid-art.jpg",
  beforeLabel = "Original Workspace",
  afterLabel = "Fluid 3D Concept",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 select-none">
      {/* Controls & Quick Presets */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400">Position:</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-400 font-semibold">
            {Math.round(sliderPosition)}%
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <span className="text-[11px] font-mono text-zinc-500 px-2">
            Presets:
          </span>
          {[25, 50, 75].map((preset) => (
            <button
              key={preset}
              onClick={() => setSliderPosition(preset)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                Math.round(sliderPosition) === preset
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-2xl cursor-ew-resize"
      >
        {/* 'After' Image (Full Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 'Before' Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerWidth ? `${containerWidth}px` : "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-zinc-200 shadow-md">
            {beforeLabel}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-violet-950/80 backdrop-blur-md border border-violet-500/30 text-xs font-medium text-violet-300 shadow-md flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-300" />
            {afterLabel}
          </span>
        </div>

        {/* Draggable Divider Line & Knob */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Glowing Line */}
          <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(139,92,246,0.6)]" />

          {/* Central Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-center text-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <MoveHorizontal className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-400">
            Drag divider left / right to compare
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
