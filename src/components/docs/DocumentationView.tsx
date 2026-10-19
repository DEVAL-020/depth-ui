import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import CodeViewer from "../common/CodeViewer";

const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "installation", label: "Installation & Setup" },
  { id: "utils", label: "Utility Helper (cn)" },
  { id: "nextjs", label: "Next.js & Vite Guide" },
  { id: "theming", label: "Theming & Tokens" },
];

export interface DocumentationViewProps {
  onNavigateToComponents?: () => void;
  onNavigateToShowcase?: () => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  onNavigateToComponents,
  onNavigateToShowcase,
}) => {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace(/^#/, "");
      if (SECTIONS.some((s) => s.id === hash)) return hash;
    }
    return "intro";
  });

  // Restore section scroll ONLY on first direct visit with hash, never on refresh/reload
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("depth_ui_scroll_y");
      if (saved && parseInt(saved, 10) > 0) {
        // User has a saved scroll position; stick right there without jumping!
        return;
      }
    } catch {
      // Storage unavailable
    }

    const hash = window.location.hash.replace(/^#/, "");
    if (hash && SECTIONS.some((s) => s.id === hash)) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  // Dynamic Scroll Spy using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: 0,
      },
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Mobile Horizontal Section Tabs */}
      <div className="lg:hidden mb-8 overflow-x-auto pb-2 flex items-center gap-2">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0 ${
              activeSection === sec.id
                ? "bg-white text-black font-semibold shadow-xs"
                : "bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block lg:w-60 shrink-0">
          <div className="sticky top-24 space-y-1 p-2 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm">
            <div className="px-3 py-2 text-xs font-mono text-zinc-500 font-semibold uppercase tracking-wider">
              Documentation
            </div>
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                  }`}
                >
                  <span>{sec.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Documentation Content Area */}
        <main className="flex-1 space-y-14 sm:space-y-16 min-w-0">
          {/* Section 1: Introduction */}
          <section id="intro" className="scroll-mt-24 space-y-4">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
              Overview
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Design System Foundation
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              <strong>Depth UI</strong> is a collection of composable,
              accessible components and 3D primitives built for modern React
              applications. Designed for direct copy-paste with zero monolithic
              package lock-in.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 sm:p-5 rounded-xl bg-[#121215] border border-zinc-800 space-y-1.5 shadow-sm">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Zero Lock-In
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Copy the code into your workspace and customize styles to your
                  exact brand tokens.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-[#121215] border border-zinc-800 space-y-1.5 shadow-sm">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Smooth 60 FPS
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Optimized client rendering with natural physics and GPU
                  acceleration.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-[#121215] border border-zinc-800 space-y-1.5 shadow-sm">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Customizable Styles
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Clean class utilities with zero runtime style injection
                  overhead.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Installation */}
          <section id="installation" className="scroll-mt-24 space-y-4">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
              Installation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Dependencies
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Install the peer dependencies in your React, Next.js, or Vite
              workspace:
            </p>

            <CodeViewer
              fileName="terminal"
              code="npm install three @types/three framer-motion @react-spring/web lucide-react clsx tailwind-merge canvas-confetti @types/canvas-confetti"
              cliCommand="npm install three @types/three framer-motion @react-spring/web lucide-react clsx tailwind-merge canvas-confetti @types/canvas-confetti"
            />
          </section>

          {/* Section 3: Utility Helper */}
          <section id="utils" className="scroll-mt-24 space-y-4">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
              Utility
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Class Merger Utility (
              <code className="text-zinc-200 font-mono text-xl sm:text-2xl">
                cn
              </code>
              )
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              All Depth UI components use the standard{" "}
              <code className="text-zinc-200 font-mono font-semibold">
                cn()
              </code>{" "}
              helper:
            </p>

            <CodeViewer
              fileName="src/lib/utils.ts"
              code={`import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
            />
          </section>

          {/* Section 4: Next.js & Vite */}
          <section id="nextjs" className="scroll-mt-24 space-y-4">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
              Frameworks
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Using in Next.js App Router & Vite
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Because 3D canvases and animations access the DOM window, add{" "}
              <code className="text-zinc-200 font-mono">
                &quot;use client&quot;
              </code>{" "}
              at the top:
            </p>

            <CodeViewer
              fileName="app/page.tsx"
              code={`"use client"

import React from 'react'
import { DepthCard3D } from '@/components/ui/DepthCard3D'
import { Button } from '@/components/ui/Button'

export default function Page() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center gap-6">
      <DepthCard3D
        title="Interactive Tilt Card"
        subtitle="3D perspective with natural inertia and specular glare."
      />
      <Button variant="default">Get Started</Button>
    </main>
  )
}`}
            />
          </section>

          {/* Section 5: Theming & Design Tokens */}
          <section id="theming" className="scroll-mt-24 space-y-5">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
              Theming
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tailwind CSS & Design Tokens
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Depth UI components are styled using Tailwind CSS classes. You can
              easily customize the color palette, fonts, border radii, and dark
              mode tokens to seamlessly match your own brand.
            </p>

            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121215] border border-zinc-800 space-y-3 shadow-sm">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Recommended{" "}
                  <code className="text-zinc-200 font-mono">
                    tailwind.config.js
                  </code>
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Add the font families and surface color extensions to your
                  Tailwind configuration:
                </p>
                <CodeViewer
                  fileName="tailwind.config.js"
                  code={`/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#09090b',
        surface: '#121215',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}`}
                />
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#121215] border border-zinc-800 space-y-3 shadow-sm">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Global CSS Configuration
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Ensure smooth antialiasing and dark theme canvas defaults in
                  your main stylesheet:
                </p>
                <CodeViewer
                  fileName="src/index.css"
                  code={`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#09090b] text-white antialiased selection:bg-zinc-800 selection:text-white;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}`}
                />
              </div>
            </div>

            {/* Quick Next Steps Navigation Banner */}
            <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-white font-semibold text-base">
                  Ready to start building?
                </h4>
                <p className="text-zinc-400 text-sm">
                  Explore 32+ interactive UI components with copy-paste code and
                  live previews.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onNavigateToComponents && (
                  <button
                    onClick={onNavigateToComponents}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Browse Components</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {onNavigateToShowcase && (
                  <button
                    onClick={onNavigateToShowcase}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-sm border border-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Templates</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default DocumentationView;
