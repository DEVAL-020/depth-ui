import React from "react";
import HeroShowcaseGrid from "./HeroShowcaseGrid";

export interface HeroSectionProps {
  onExploreComponents: () => void;
  onOpenDocs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreComponents,
  onOpenDocs,
}) => {
  return (
    <section className="pt-12 sm:pt-16 pb-10 sm:pb-12 w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
          <span className="sr-only">Depth UI — </span>The Foundation for your
          Design System
        </h1>

        {/* Subhead */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Build stunning web interfaces faster with 100+ accessible, reusable
          React and Tailwind CSS components. Create consistent designs with
          smooth animations, modern effects, and developer-friendly components.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 sm:pt-3 max-w-sm sm:max-w-none mx-auto">
          <button
            onClick={onOpenDocs}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm sm:text-[15px] hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm min-h-[44px] flex items-center justify-center"
          >
            Get Started
          </button>

          <button
            onClick={onExploreComponents}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-zinc-900 text-zinc-200 border border-zinc-800 text-sm sm:text-[15px] font-semibold hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            View Components
          </button>
        </div>
      </div>

      {/* Realistic Interactive Showcase Grid matching User Reference */}
      <h2 className="sr-only">Interactive Design System Showcase</h2>
      <HeroShowcaseGrid />
    </section>
  );
};
export default HeroSection;
