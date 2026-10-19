import React from "react";
import { ArrowUpRight, LayoutGrid, Eye, Search, ArrowUp } from "lucide-react";
import type { ComponentItem } from "../../data/componentsCatalog";

export interface ComponentDirectoryGridProps {
  components: ComponentItem[];
  allComponents: ComponentItem[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectComponent: (id: string) => void;
  viewMode: "grid" | "previews";
  setViewMode: (mode: "grid" | "previews") => void;
  totalCount: number;
}

import {
  CATEGORIES_CONFIG,
  getCategoryFallbackConfig,
} from "../../data/categoriesConfig";

export const ComponentDirectoryGrid: React.FC<ComponentDirectoryGridProps> = ({
  components,
  allComponents,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onSelectComponent,
  viewMode,
  setViewMode,
  totalCount,
}) => {
  const [gridGrouping, setGridGrouping] = React.useState<"grouped" | "flat">(
    () => {
      try {
        const saved = sessionStorage.getItem("depth_ui_grid_grouping");
        if (saved === "flat" || saved === "grouped") return saved;
      } catch {
        // Storage unavailable
      }
      return "grouped";
    },
  );

  React.useEffect(() => {
    try {
      sessionStorage.setItem("depth_ui_grid_grouping", gridGrouping);
    } catch {
      // Storage unavailable
    }
  }, [gridGrouping]);

  const categoryPills = [
    {
      id: "all",
      label: "All Pieces",
      count: totalCount,
      icon: LayoutGrid,
    },
    ...CATEGORIES_CONFIG.map((cat) => ({
      id: cat.id,
      label: cat.label,
      count: allComponents.filter((c) => c.category === cat.id).length,
      icon: cat.icon,
    })),
  ];

  const getCategoryConfig = (categoryId: string) => {
    return (
      CATEGORIES_CONFIG.find((c) => c.id === categoryId) ||
      getCategoryFallbackConfig(categoryId)
    );
  };

  const scrollToGroup = (groupId: string) => {
    const el = document.getElementById(`grid-group-${groupId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Render a single component card matching the user's reference screenshots
  const renderCard = (item: ComponentItem) => {
    const theme = getCategoryConfig(item.category);
    return (
      <div
        key={item.id}
        onClick={() => onSelectComponent(item.id)}
        className={`group rounded-2xl bg-[#121215] border border-zinc-800/80 p-5 hover:bg-[#18181d] transition-all duration-200 cursor-pointer flex flex-col justify-between text-left shadow-xs hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] min-h-[160px] ${theme.borderHover}`}
      >
        <div>
          {/* Card Top: Title & Hover Indicator Arrow */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-white text-base sm:text-[17px] tracking-tight group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
          </div>

          {/* Card Body: Human-crafted concise description */}
          <p className="text-[13.5px] sm:text-sm text-zinc-300 mt-2 leading-relaxed line-clamp-3">
            {item.subtitle}
          </p>
        </div>

        {/* Card Bottom: Category Tag & Code Symbol */}
        <div className="pt-3.5 border-t border-zinc-800/60 flex items-center justify-between text-xs mt-3">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor}`} />
            <span className="text-xs font-mono text-zinc-300">
              {item.categoryLabel}
            </span>
          </div>
          <span className="text-[11.5px] sm:text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 group-hover:text-zinc-200 transition-colors">
            &lt;{item.name} /&gt;
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-6 pt-2 pb-6">
      {/* Header Section matching reference screenshot: "What ships today / 107 Pieces In All" */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            What ships today
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 mt-2 max-w-2xl leading-relaxed">
            From foundation tokens to full interactive architectures,{" "}
            <span className="text-white font-semibold">
              {totalCount} Pieces In All.
            </span>
          </p>
        </div>

        {/* View Switcher Toggle: Directory Grid vs Live Demos */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-[#18181b] p-1 rounded-xl border border-zinc-800 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Directory Grid</span>
            </button>
            <button
              onClick={() => setViewMode("previews")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewMode === "previews"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Live Demos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips & Quick Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Filter Pills with Item Counts */}
        <div className="flex flex-wrap items-center gap-2">
          {categoryPills.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (searchQuery) setSearchQuery("");
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "bg-[#18181b] text-zinc-300 hover:text-white border border-zinc-800 hover:bg-zinc-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium ${
                    isActive
                      ? "bg-zinc-200 text-black font-bold"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search and Grouping Controls */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-72">
            <label htmlFor="directory-search-input" className="sr-only">
              Search components catalog
            </label>
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="directory-search-input"
              name="directory-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${totalCount} pieces...`}
              aria-label="Search components catalog"
              className="w-full pl-10 pr-4 py-2.5 min-h-[40px] rounded-xl bg-[#18181b] border border-zinc-800 text-sm sm:text-base text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-zinc-300 hover:text-white cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Directory Grid View */}
      {viewMode === "grid" && (
        <div className="space-y-8">
          {/* Top Info Bar & Quick Jump Anchors when viewing All */}
          {activeCategory === "all" && !searchQuery && (
            <div className="p-3 sm:p-4 rounded-xl bg-[#141417] border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-zinc-300 overflow-x-auto no-scrollbar py-0.5 min-w-0">
                <span className="font-semibold text-white shrink-0">
                  Jump to group:
                </span>
                {CATEGORIES_CONFIG.map((cat) => {
                  const count = allComponents.filter(
                    (c) => c.category === cat.id,
                  ).length;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => scrollToGroup(cat.id)}
                      aria-label={`Jump to ${cat.label} components`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer shrink-0 text-xs sm:text-sm font-medium"
                    >
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{cat.label}</span>
                      <span className="text-xs text-zinc-300 font-mono">
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* View Layout Toggle with accessible touch target dimensions */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 self-end md:self-auto shrink-0 bg-[#18181b] p-1 rounded-xl border border-zinc-800">
                <span className="px-1 text-zinc-400">Layout:</span>
                <button
                  type="button"
                  onClick={() => setGridGrouping("grouped")}
                  aria-pressed={gridGrouping === "grouped"}
                  className={`px-3 py-1.5 min-h-[36px] rounded-lg cursor-pointer text-xs font-semibold transition-all ${
                    gridGrouping === "grouped"
                      ? "bg-zinc-800 text-white shadow-xs"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Grouped
                </button>
                <button
                  type="button"
                  onClick={() => setGridGrouping("flat")}
                  aria-pressed={gridGrouping === "flat"}
                  className={`px-3 py-1.5 min-h-[36px] rounded-lg cursor-pointer text-xs font-semibold transition-all ${
                    gridGrouping === "flat"
                      ? "bg-zinc-800 text-white shadow-xs"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Flat Grid
                </button>
              </div>
            </div>
          )}

          {/* Empty Search State */}
          {components.length === 0 ? (
            <div className="p-12 sm:p-16 rounded-2xl bg-[#121215] border border-zinc-800 text-center space-y-3">
              <p className="text-zinc-300 text-sm sm:text-base">
                No components found matching &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold cursor-pointer hover:bg-zinc-200"
              >
                Reset filters
              </button>
            </div>
          ) : activeCategory === "all" && !searchQuery && gridGrouping === "grouped" ? (
            /* GROUPED VIEW: Divided into categorized groups so users can find components easily */
            <div className="space-y-12">
              {CATEGORIES_CONFIG.map((category) => {
                const groupComponents = allComponents.filter(
                  (c) => c.category === category.id,
                );
                if (groupComponents.length === 0) return null;
                const Icon = category.icon;

                return (
                  <section
                    key={category.id}
                    id={`grid-group-${category.id}`}
                    className="scroll-mt-24 space-y-4"
                  >
                    {/* Group Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/70 pb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border ${category.badgeBg}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                              {category.label}
                            </h3>
                            <span className="text-xs sm:text-[13px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                              {groupComponents.length} pieces
                            </span>
                          </div>
                          <p className="text-sm text-zinc-300 mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => {
                            setActiveCategory(category.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          Filter this group only →
                        </button>
                      </div>
                    </div>

                    {/* 4-Column Cards Grid for this group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                      {groupComponents.map(renderCard)}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            /* FILTERED OR FLAT GRID VIEW */
            <div className="space-y-4">
              {activeCategory !== "all" && (
                <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800/80 pb-3">
                  <span className="font-medium text-white">
                    Showing {components.length} components in &quot;
                    {getCategoryConfig(activeCategory).label}&quot;
                  </span>
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Show all groups
                  </button>
                </div>
              )}

              {searchQuery && (
                <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800/80 pb-3">
                  <span>
                    Found {components.length} matching pieces for &quot;
                    {searchQuery}&quot;
                  </span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {components.map(renderCard)}
              </div>
            </div>
          )}

          {/* Quick Jump to Top */}
          <div className="flex justify-center pt-8 border-t border-zinc-800/60">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top of directory</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ComponentDirectoryGrid;
