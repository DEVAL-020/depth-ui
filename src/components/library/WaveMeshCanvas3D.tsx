import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, Waves, Palette } from "lucide-react";

export interface WaveMeshProps {
  color?: string;
  particleCount?: number;
  speed?: number;
  height?: number;
  className?: string;
}

export const WaveMeshCanvas3D: React.FC<WaveMeshProps> = ({
  color = "#06b6d4",
  speed = 1.0,
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [waveColor, setWaveColor] = useState<
    "cyan" | "emerald" | "violet" | "amber"
  >("cyan");
  const [isPaused, setIsPaused] = useState(false);
  const [waveHeight, setWaveHeight] = useState(16);
  const [animSpeed, setAnimSpeed] = useState(speed);

  const colorMap = {
    cyan: color || "#06b6d4",
    emerald: "#10b981",
    violet: "#a855f7",
    amber: "#f59e0b",
  };

  const activeHex = colorMap[waveColor];

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 45, 95);
    camera.lookAt(0, -10, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Grid Dimensions
    const cols = 55;
    const rows = 40;
    const count = cols * rows;
    const spacing = 4.2;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let idx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        const x = (ix - cols / 2) * spacing;
        const z = (iz - rows / 2) * spacing;
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;

        initialPositions[idx * 3] = x;
        initialPositions[idx * 3 + 1] = 0;
        initialPositions[idx * 3 + 2] = z;

        scales[idx] = 1.0;
        idx++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Shader Material for Glowing 3D Particles
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(activeHex),
      size: 2.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
      targetRotY = mouseX * 0.4;
      targetRotX = mouseY * 0.3;
    };

    container.addEventListener("mousemove", handleMouseMove);

    let reqId: number;
    const startTime = performance.now();
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      reqId = requestAnimationFrame(render);

      if (!isPaused) {
        const elapsedTime = (performance.now() - startTime) * 0.001 * animSpeed;

        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
          const x = initialPositions[i * 3];
          const z = initialPositions[i * 3 + 2];

          // Complex dual-wave harmonic ripple equation
          const wave1 =
            Math.sin(x * 0.08 + elapsedTime * 1.5) * (waveHeight * 0.6);
          const wave2 =
            Math.cos(z * 0.08 + elapsedTime * 1.2) * (waveHeight * 0.4);
          const ripple =
            Math.sin(Math.sqrt(x * x + z * z) * 0.05 - elapsedTime * 2) * 4;

          posArray[i * 3 + 1] = wave1 + wave2 + ripple;
        }

        posAttr.needsUpdate = true;
      }

      // Smooth camera tilt damping
      particles.rotation.y += (targetRotY - particles.rotation.y) * 0.05;
      particles.rotation.x += (targetRotX - particles.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVis = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVis) {
          cancelAnimationFrame(reqId);
          render();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(container);

    render();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(reqId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeHex, isPaused, waveHeight, animSpeed]);

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-4 ${className}`.trim()}>
      {/* 3D Wave Viewport Canvas */}
      <div className="relative w-full h-[360px] sm:h-[400px] rounded-3xl bg-radial from-[#0a121a] via-[#09090e] to-[#07070a] border border-zinc-800 shadow-2xl overflow-hidden select-none flex flex-col justify-between p-6">
        {/* Top Header Information */}
        <div className="flex items-center justify-between z-10 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeHex }}
            />
            <span className="text-xs font-semibold text-white">
              3D Particle Wave Grid
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 hidden sm:inline">
              WebGL Point Matrix
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
            <span className="hidden sm:inline">2,200 Nodes</span>
            <span className="text-zinc-600">•</span>
            <span style={{ color: activeHex }}>60 FPS Active</span>
          </div>
        </div>

        {/* Embedded Three.js WebGL Mount Canvas */}
        <div
          ref={mountRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        />

        {/* Bottom Floating Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
          <span className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-zinc-400 shrink-0" />
            Hover and drag mouse over grid to tilt the 3D perspective terrain
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700/60 text-zinc-200 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Pause className="w-3.5 h-3.5 text-zinc-300" />
            )}
            <span>{isPaused ? "Resume animation" : "Pause animation"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-4 rounded-2xl bg-[#121217] border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Palette Selector */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <span className="text-zinc-400 font-medium flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-zinc-400" />
            Color theme:
          </span>
          <div className="flex items-center gap-1.5">
            {(["cyan", "emerald", "violet", "amber"] as const).map((thm) => (
              <button
                key={thm}
                onClick={() => setWaveColor(thm)}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                  waveColor === thm
                    ? "ring-2 ring-white scale-110"
                    : "opacity-60 hover:opacity-100"
                } ${
                  thm === "cyan"
                    ? "bg-cyan-400"
                    : thm === "emerald"
                      ? "bg-emerald-500"
                      : thm === "violet"
                        ? "bg-violet-500"
                        : "bg-amber-500"
                }`}
                aria-label={`Select ${thm} color`}
              />
            ))}
          </div>
        </div>

        {/* Wave Amplitude Slider */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-medium whitespace-nowrap">
            Amplitude:
          </span>
          <input
            type="range"
            min="6"
            max="28"
            value={waveHeight}
            onChange={(e) => setWaveHeight(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-xs font-medium text-zinc-200 w-6">
            {waveHeight}
          </span>
        </div>

        {/* Wave Speed Slider */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-medium whitespace-nowrap">
            Velocity:
          </span>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={animSpeed}
            onChange={(e) => setAnimSpeed(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-xs font-medium text-zinc-200 w-8">
            {animSpeed.toFixed(1)}x
          </span>
        </div>
      </div>
    </div>
  );
};
export default WaveMeshCanvas3D;
