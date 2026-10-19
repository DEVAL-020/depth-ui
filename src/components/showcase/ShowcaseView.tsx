import React from "react";
import { ArrowRight } from "lucide-react";

export interface TemplateItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
}

const templates: TemplateItem[] = [
  {
    title: "Financial & Banking Dashboard",
    category: "Fintech",
    description:
      "Clean data visualization cards, milestone goals, transaction activity chart, and mobile QR link.",
    tags: ["Atoms", "Bar Chart", "Forms", "Milestones"],
  },
  {
    title: "Studio & Portfolio",
    category: "Showcase",
    description:
      "Interactive tilt layers, magnification dock navigation, and coordinate data globe.",
    tags: ["Tilt Card", "Dock", "Data Globe"],
  },
  {
    title: "Documentation Portal",
    category: "Developer Tools",
    description:
      "Clean syntax highlighter, tabbed CLI code switcher, and deployment walkthrough.",
    tags: ["Code Viewer", "Tabs", "CLI Scripts"],
  },
  {
    title: "Cloud Architecture Dashboard",
    category: "Platform & Cloud",
    description:
      "Coordinate data globe, real-time node telemetry, and physics magnetic actions.",
    tags: ["Interactive", "Data Map", "Telemetry"],
  },
];

export const ShowcaseView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      <div className="max-w-2xl space-y-2">
        <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
          Templates & Blocks
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          Production Blocks & Layouts
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          Pre-built production architectures assembled using Depth UI
          primitives. 100% responsive, accessible, and ready for deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {templates.map((tpl, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#121215] border border-zinc-800 p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-zinc-700 transition-colors shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800">
                  {tpl.category}
                </span>
                <span className="text-xs font-medium text-zinc-400">
                  Production ready
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {tpl.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {tpl.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {tpl.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md text-xs sm:text-[13px] font-mono font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-sm font-medium text-white flex items-center gap-1.5 cursor-pointer hover:underline">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShowcaseView;
