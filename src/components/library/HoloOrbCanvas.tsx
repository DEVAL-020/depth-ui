import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface HoloOrbProps {
  size?: number;
  accentColor?: string;
  coreColor?: string;
  speed?: number;
  interactive?: boolean;
  className?: string;
}

export const HoloOrbCanvas: React.FC<HoloOrbProps> = ({
  size = 320,
  accentColor = "#38bdf8",
  coreColor = "#c084fc",
  speed = 1.0,
  interactive = true,
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(
      new THREE.Color(accentColor),
      3,
      300,
    );
    pointLight1.position.set(100, 100, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(
      new THREE.Color(coreColor),
      2.5,
      300,
    );
    pointLight2.position.set(-100, -100, 80);
    scene.add(pointLight2);

    // Main Group
    const group = new THREE.Group();
    scene.add(group);

    // Outer Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(50, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      wireframe: true,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Inner Solid Faceted Core
    const innerGeo = new THREE.OctahedronGeometry(28, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(coreColor),
      emissive: new THREE.Color(coreColor),
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Orbit Ring
    const ringGeo = new THREE.TorusGeometry(62, 1.2, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Floating Stardust Particles
    const particleCount = 200;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      partPos[i] = (Math.random() - 0.5) * 140;
      partPos[i + 1] = (Math.random() - 0.5) * 140;
      partPos[i + 2] = (Math.random() - 0.5) * 140;
    }
    partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));

    const partMat = new THREE.PointsMaterial({
      size: 2,
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(partGeo, partMat);
    group.add(particles);

    // Mouse Tracking Parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = x * 0.8;
      targetRotX = y * 0.8;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Render loop with Viewport Visibility Pausing
    let reqId: number;
    const startTime = performance.now();
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      reqId = requestAnimationFrame(render);
      const elapsedTime = (performance.now() - startTime) * 0.001 * speed;

      // Continuous rotation
      outerMesh.rotation.x += 0.005 * speed;
      outerMesh.rotation.y += 0.008 * speed;

      innerMesh.rotation.x -= 0.012 * speed;
      innerMesh.rotation.z += 0.01 * speed;

      ringMesh.rotation.z += 0.006 * speed;
      particles.rotation.y -= 0.003 * speed;

      // Floating wave animation
      group.position.y = Math.sin(elapsedTime * 1.5) * 5;

      // Mouse follow spring damping
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;

      // Light orbit
      pointLight1.position.x = Math.sin(elapsedTime) * 120;
      pointLight1.position.z = Math.cos(elapsedTime) * 120;

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          cancelAnimationFrame(reqId);
          render();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(container);

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(reqId);
      container.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, accentColor, coreColor, speed, interactive]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        ref={mountRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="relative"
      />
    </div>
  );
};
export default HoloOrbCanvas;
