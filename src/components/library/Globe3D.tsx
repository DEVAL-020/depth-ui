import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Globe as GlobeIcon } from "lucide-react";

export interface Globe3DProps {
  size?: number;
  dotColor?: string;
  glowColor?: string;
  autoRotateSpeed?: number;
  interactive?: boolean;
  className?: string;
}

export const Globe3D: React.FC<Globe3DProps> = ({
  size = 360,
  dotColor = "#71717a",
  glowColor = "#3f3f46",
  autoRotateSpeed = 0.003,
  interactive = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Master Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner Glowing Core Sphere
    const coreGeometry = new THREE.SphereGeometry(68, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x09101f,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // Atmosphere Glow Shell
    const glowGeo = new THREE.SphereGeometry(72, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(glowColor),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowMesh);

    // Dotted Globe Points (Fibonacci distribution for perfectly uniform points)
    const pointCount = 1200;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const baseColor = new THREE.Color(dotColor);
    const highlightColor = new THREE.Color("#ffffff");

    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2; // From 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const r = 70;
      positions[i * 3] = x * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = z * r;

      // Subtly alternate highlights
      const mixedColor = Math.random() > 0.85 ? highlightColor : baseColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const globePoints = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(globePoints);

    // Beacons / Pulsing nodes on key cities
    const beaconCoords = [
      { lat: 37.77, lon: -122.41 }, // SF
      { lat: 51.5, lon: -0.12 }, // London
      { lat: 35.67, lon: 139.65 }, // Tokyo
      { lat: 1.35, lon: 103.81 }, // Singapore
      { lat: -33.86, lon: 151.2 }, // Sydney
    ];

    const beaconGroup = new THREE.Group();
    globeGroup.add(beaconGroup);

    beaconCoords.forEach((coord) => {
      const phi = (90 - coord.lat) * (Math.PI / 180);
      const theta = (coord.lon + 180) * (Math.PI / 180);
      const r = 70.5;

      const bx = -(r * Math.sin(phi) * Math.cos(theta));
      const by = r * Math.cos(phi);
      const bz = r * Math.sin(phi) * Math.sin(theta);

      const beaconDot = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 }),
      );
      beaconDot.position.set(bx, by, bz);
      beaconGroup.add(beaconDot);

      // Ring pulse
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.8, 3.2, 24),
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        }),
      );
      ring.position.set(bx, by, bz);
      ring.lookAt(0, 0, 0);
      beaconGroup.add(ring);
    });

    // Tilt globe slightly on X
    globeGroup.rotation.x = 0.25;

    // Interactive Drag Controls
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velX = 0;
    let velY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isMouseDown = true;
      setIsDragging(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !interactive) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      velX = deltaX * 0.005;
      velY = deltaY * 0.005;

      globeGroup.rotation.y += velX;
      globeGroup.rotation.x += velY;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || size;
      const h = container.clientHeight || size;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop with Viewport Visibility Pausing
    let animationFrameId: number;
    const startTime = performance.now();
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation + inertia damping
      if (!isMouseDown) {
        globeGroup.rotation.y += autoRotateSpeed;
        // Inertia decay
        velX *= 0.95;
        velY *= 0.95;
        globeGroup.rotation.y += velX;
        globeGroup.rotation.x += velY;
      }

      // Beacon pulse animation
      const elapsedTime = (performance.now() - startTime) * 0.001;
      beaconGroup.children.forEach((child, idx) => {
        if (
          child instanceof THREE.Mesh &&
          child.geometry instanceof THREE.RingGeometry
        ) {
          const scale = 1 + Math.sin(elapsedTime * 3 + idx) * 0.35;
          child.scale.set(scale, scale, scale);
          if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material.opacity = 0.7 - (scale - 1) * 0.5;
          }
        }
      });

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          cancelAnimationFrame(animationFrameId);
          animate();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(container);

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, dotColor, glowColor, autoRotateSpeed, interactive]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`relative cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
      />

      {/* Floating Info Overlay */}
      <div className="absolute bottom-2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[11px] text-zinc-400 pointer-events-none shadow-sm">
        <GlobeIcon
          className="w-3 h-3 text-zinc-300 animate-spin"
          style={{ animationDuration: "10s" }}
        />
        <span>Drag to orbit • Coordinate globe</span>
      </div>
    </div>
  );
};
export default Globe3D;
