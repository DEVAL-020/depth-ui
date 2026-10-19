import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, Compass } from "lucide-react";

export interface TorusKnotProps {
  color?: string;
  wireframe?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export const FloatingTorusKnot3D: React.FC<TorusKnotProps> = ({
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [materialTheme, setMaterialTheme] = useState<
    "iridescent" | "chrome" | "emerald" | "wireframe"
  >("iridescent");
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [rotSpeed, setRotSpeed] = useState(1.2);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 160;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 4, 300);
    pointLight1.position.set(80, 80, 80);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3.5, 300);
    pointLight2.position.set(-80, -80, 60);
    scene.add(pointLight2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 100, 100);
    scene.add(dirLight);

    // Geometry: Torus Knot
    const geometry = new THREE.TorusKnotGeometry(36, 12, 120, 24);

    // Material presets
    let material: THREE.Material;

    if (materialTheme === "chrome") {
      material = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.12,
        wireframe: wireframeMode,
      });
    } else if (materialTheme === "emerald") {
      material = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.7,
        roughness: 0.25,
        wireframe: wireframeMode,
      });
    } else if (materialTheme === "wireframe") {
      material = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
      });
    } else {
      // Iridescent Glass style
      material = new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
        metalness: 0.3,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.4,
        ior: 1.5,
        wireframe: wireframeMode,
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Drag-to-rotate interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotation = { x: 0.4, y: 0.6 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      targetRotation.y += deltaX * 0.015;
      targetRotation.x += deltaY * 0.015;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let reqId: number;
    const startTime = performance.now();
    let lastTime = performance.now();
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      reqId = requestAnimationFrame(render);

      const now = performance.now();
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      if (isRotating && !isDragging) {
        targetRotation.y += delta * 0.7 * rotSpeed;
        targetRotation.x += delta * 0.3 * rotSpeed;
      }

      // Smooth damping interpolation
      mesh.rotation.y += (targetRotation.y - mesh.rotation.y) * 0.08;
      mesh.rotation.x += (targetRotation.x - mesh.rotation.x) * 0.08;

      // Light orbiting reflection
      const time = (now - startTime) * 0.001;
      pointLight1.position.x = Math.sin(time * 1.2) * 100;
      pointLight1.position.z = Math.cos(time * 1.2) * 100;

      pointLight2.position.x = -Math.sin(time) * 100;
      pointLight2.position.z = -Math.cos(time) * 100;

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
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [materialTheme, wireframeMode, isRotating, rotSpeed]);

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-4 ${className}`.trim()}>
      {/* 3D Torus Knot Viewport */}
      <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl bg-radial from-[#12101e] via-[#090812] to-black border border-zinc-800 shadow-2xl overflow-hidden select-none flex flex-col justify-between p-6">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-violet-400" />
            <span className="text-xs font-semibold text-zinc-100">
              Floating 3D Torus Knot
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/60 hidden sm:inline">
              Physical shader
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <span className="hidden sm:inline">Dual point lights</span>
            <span>•</span>
            <span className="text-zinc-200 capitalize">
              {materialTheme} mode
            </span>
          </div>
        </div>

        {/* WebGL Canvas Container */}
        <div
          ref={mountRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        />

        {/* Bottom Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-zinc-800/80 pt-3 z-10 text-xs text-zinc-400">
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-violet-400 shrink-0" />
            Click and drag in any direction to spin 3D knot with inertia
          </span>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-xs border border-zinc-700/60 shadow-xs transition-colors cursor-pointer"
          >
            {isRotating ? (
              <Pause className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Play className="w-3.5 h-3.5 text-zinc-300" />
            )}
            <span>{isRotating ? "Pause rotation" : "Resume rotation"}</span>
          </button>
        </div>
      </div>

      {/* Control Console */}
      <div className="p-4 rounded-2xl bg-[#121217] border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Material Presets */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5">
          <span className="text-zinc-400 font-medium">Shader Preset:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(["iridescent", "chrome", "emerald", "wireframe"] as const).map(
              (m) => (
                <button
                  key={m}
                  onClick={() => setMaterialTheme(m)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium text-[11px] transition-colors cursor-pointer ${
                    materialTheme === m
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {m}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Wireframe Mode Toggle */}
        <div className="flex items-center justify-between sm:justify-center gap-2.5">
          <span className="text-zinc-400 font-medium">Wireframe Mesh:</span>
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              wireframeMode
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                : "bg-zinc-800/80 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            {wireframeMode ? "Enabled" : "Disabled"}
          </button>
        </div>

        {/* Orbit Speed Slider */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-medium whitespace-nowrap">
            Orbit Velocity:
          </span>
          <input
            type="range"
            min="0.4"
            max="3.0"
            step="0.2"
            value={rotSpeed}
            onChange={(e) => setRotSpeed(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-400"
          />
          <span className="font-medium text-xs text-zinc-300 w-8">
            {rotSpeed.toFixed(1)}x
          </span>
        </div>
      </div>
    </div>
  );
};
export default FloatingTorusKnot3D;
