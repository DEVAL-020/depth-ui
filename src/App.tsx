import { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
import {
  Layers,
  Activity,
  Box,
  Grid,
  Compass,
  CheckSquare,
  Palette,
  LayoutGrid,
  Eye,
  ArrowUp,
  ArrowLeft,
} from "lucide-react";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/layout/HeroSection";
import Footer from "./components/layout/Footer";
import ComponentCardPreview from "./components/common/ComponentCardPreview";
import ComponentDirectoryGrid from "./components/layout/ComponentDirectoryGrid";
import { CATEGORIES_CONFIG } from "./data/categoriesConfig";
import SearchModal from "./components/common/SearchModal";
import { COMPONENTS_CATALOG } from "./data/componentsCatalog";

const DocumentationView = lazy(
  () => import("./components/docs/DocumentationView"),
);
const ShowcaseView = lazy(() => import("./components/showcase/ShowcaseView"));

const VALID_CATEGORIES = [
  "all",
  "forms",
  "navigation",
  "data",
  "spatial",
  "motion",
  "creative",
];

const getInitialAppState = () => {
  if (typeof window === "undefined") {
    return {
      tab: "components" as "components" | "showcase" | "docs",
      viewMode: "grid" as "grid" | "previews",
      category: "all",
      search: "",
      isDark: true,
      componentId: null as string | null,
    };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();
  const rawHash = window.location.hash.replace(/^#/, "");

  // 1. Current Tab: Authoritative from URL query or path/hash
  let tab: "components" | "showcase" | "docs" = "components";
  const paramTab = searchParams.get("tab")?.toLowerCase();
  if (paramTab === "docs" || paramTab === "showcase" || paramTab === "components") {
    tab = paramTab;
  } else if (hash === "#docs" || window.location.pathname === "/docs") {
    tab = "docs";
  } else if (hash === "#showcase" || window.location.pathname === "/showcase") {
    tab = "showcase";
  }

  // 2. View Mode ('grid' vs 'previews')
  let viewMode: "grid" | "previews" = "grid";
  const paramView = searchParams.get("view")?.toLowerCase();
  if (paramView === "previews" || paramView === "grid") {
    viewMode = paramView;
  } else if (
    rawHash &&
    rawHash !== "docs" &&
    rawHash !== "showcase" &&
    rawHash !== "components" &&
    rawHash !== "components-catalog" &&
    !["intro", "installation", "utils", "nextjs", "theming"].includes(rawHash)
  ) {
    viewMode = "previews";
  }

  // 3. Category
  let category = "all";
  const paramCat = searchParams.get("category")?.toLowerCase();
  if (paramCat && VALID_CATEGORIES.includes(paramCat)) {
    category = paramCat;
  }

  // 4. Search Query
  let search = "";
  const paramQuery = searchParams.get("q") || searchParams.get("search");
  if (typeof paramQuery === "string") {
    search = paramQuery;
  }

  // 5. Component ID (if previewing specific card)
  let componentId: string | null = null;
  if (
    viewMode === "previews" &&
    rawHash &&
    !["docs", "showcase", "components", "components-catalog", "intro", "installation", "utils", "nextjs", "theming"].includes(rawHash)
  ) {
    componentId = rawHash;
  }

  // 6. Theme
  let isDark = true;
  try {
    const savedTheme = localStorage.getItem("depth_ui_theme");
    if (savedTheme === "light") isDark = false;
    else if (savedTheme === "dark") isDark = true;
  } catch {
    // Storage unavailable
  }

  return { tab, viewMode, category, search, isDark, componentId };
};

// URL Builder ensuring clean, canonical URLs for each page state
const buildUrl = (
  tab: "components" | "showcase" | "docs",
  viewMode: "grid" | "previews",
  category: string,
  search: string,
  hashOverride?: string | null,
): string => {
  const params = new URLSearchParams();
  if (tab !== "components") {
    params.set("tab", tab);
  } else {
    if (viewMode !== "grid") {
      params.set("view", viewMode);
    }
    if (category && category !== "all") {
      params.set("category", category);
    }
    if (search && search.trim()) {
      params.set("q", search.trim());
    }
  }

  const queryStr = params.toString();
  const queryPrefix = queryStr ? `?${queryStr}` : "";

  let hash = hashOverride !== undefined ? hashOverride || "" : window.location.hash;
  const rawHash = hash.replace(/^#/, "");
  const isValidDocsSection = [
    "intro",
    "installation",
    "utils",
    "nextjs",
    "theming",
  ].includes(rawHash);

  if (tab === "docs") {
    if (!isValidDocsSection) {
      hash = "";
    }
  } else if (tab === "showcase") {
    hash = "";
  } else if (tab === "components") {
    if (viewMode === "grid") {
      if (hash !== "#components-catalog") {
        hash = "";
      }
    }
  }

  return `${window.location.pathname}${queryPrefix}${hash}`;
};

export function App() {
  const initial = useMemo(() => getInitialAppState(), []);
  const [currentTab, setCurrentTab] = useState<
    "components" | "showcase" | "docs"
  >(initial.tab);
  const [viewMode, setViewMode] = useState<"grid" | "previews">(
    initial.viewMode,
  );
  const [highlightedId, setHighlightedId] = useState<string | null>(
    initial.componentId,
  );
  const [activeCategory, setActiveCategory] = useState<string>(
    initial.category,
  );
  const [searchQuery, setSearchQuery] = useState(initial.search);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(initial.isDark);

  // History state navigation tracking refs across all devices
  const isPopstateNav = useRef(false);
  const isInitialMount = useRef(true);
  const prevNavState = useRef({
    tab: initial.tab,
    viewMode: initial.viewMode,
    category: initial.category,
    search: initial.search,
  });
  const isSearchOpenRef = useRef(isSearchOpen);
  useEffect(() => {
    isSearchOpenRef.current = isSearchOpen;
  }, [isSearchOpen]);

  // Sync theme with html root class and localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      try {
        localStorage.setItem("depth_ui_theme", "dark");
      } catch {
        // Storage unavailable
      }
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("depth_ui_theme", "light");
      } catch {
        // Storage unavailable
      }
    }
  }, [isDark]);

  // Handle native device and browser back/forward buttons (Android gestures, iOS swipe, laptop back/forward buttons)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // 1. If Search Modal is open, mobile/desktop back button should dismiss it first
      if (isSearchOpenRef.current) {
        setIsSearchOpen(false);
        return;
      }

      // Mark that this state transition was triggered by the browser/device back or forward button
      isPopstateNav.current = true;

      // 2. Read target state from event.state or parse directly from popped URL
      let targetTab: "components" | "showcase" | "docs" = "components";
      let targetViewMode: "grid" | "previews" = "grid";
      let targetCategory = "all";
      let targetSearch = "";
      let targetScrollY: number | undefined;
      let targetComponentId: string | null = null;

      if (event.state && typeof event.state.tab === "string") {
        targetTab = event.state.tab;
        targetViewMode = event.state.viewMode || "grid";
        targetCategory = event.state.category || "all";
        targetSearch = event.state.search || "";
        targetScrollY = event.state.scrollY;
        targetComponentId = event.state.componentId || null;
      } else {
        const parsed = getInitialAppState();
        targetTab = parsed.tab;
        targetViewMode = parsed.viewMode;
        targetCategory = parsed.category;
        targetSearch = parsed.search;
        targetComponentId = parsed.componentId;
      }

      // 3. Update React states to reflect the exact previous page of the website
      setCurrentTab(targetTab);
      setViewMode(targetViewMode);
      setActiveCategory(targetCategory);
      setSearchQuery(targetSearch);
      setHighlightedId(targetComponentId);

      // 4. Update nav tracking ref so future forward/back knows the current position
      prevNavState.current = {
        tab: targetTab,
        viewMode: targetViewMode,
        category: targetCategory,
        search: targetSearch,
      };

      // 5. Restore scroll or target component preview smoothly
      if (targetComponentId && targetViewMode === "previews") {
        setTimeout(() => {
          const el = document.getElementById(targetComponentId!);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else if (typeof targetScrollY === "number" && targetScrollY >= 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetScrollY!, behavior: "instant" });
        });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Synchronize browser history and URL with React state across all devices
  useEffect(() => {
    // If this state update was triggered by popstate (device back/forward), DO NOT push a new history entry!
    if (isPopstateNav.current) {
      isPopstateNav.current = false;
      return;
    }

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const targetUrl = buildUrl(
      currentTab,
      viewMode,
      activeCategory,
      searchQuery,
      highlightedId ? `#${highlightedId}` : undefined,
    );

    // Initial Mount: Replace current history slot with normalized state and URL
    if (isInitialMount.current) {
      isInitialMount.current = false;
      window.history.replaceState(
        {
          tab: currentTab,
          viewMode,
          category: activeCategory,
          search: searchQuery,
          componentId: highlightedId,
          scrollY: window.scrollY,
        },
        "",
        targetUrl !== currentUrl ? targetUrl : currentUrl,
      );
      prevNavState.current = {
        tab: currentTab,
        viewMode,
        category: activeCategory,
        search: searchQuery,
      };
      return;
    }

    // Check if this is a PAGE NAVIGATION:
    // Tab changed (Components <-> Docs <-> Showcase) OR ViewMode changed (Grid <-> Previews)
    const isTabChange = currentTab !== prevNavState.current.tab;
    const isViewChange = viewMode !== prevNavState.current.viewMode;
    const isPageNavigation = isTabChange || isViewChange;

    if (isPageNavigation) {
      // 1. If currently inside a modal history state, replace it instead of pushing
      if (window.history.state?.isSearchModal) {
        window.history.replaceState(
          {
            tab: currentTab,
            viewMode,
            category: activeCategory,
            search: searchQuery,
            componentId: highlightedId,
            scrollY: 0,
          },
          "",
          targetUrl,
        );
      } else {
        // Save scroll position of the page we are leaving into its existing history slot
        try {
          const currentState = window.history.state || {};
          window.history.replaceState(
            {
              ...currentState,
              scrollY: window.scrollY,
            },
            "",
          );
        } catch {
          // Storage/state error safety
        }

        // PUSH a new entry onto the device/browser history stack!
        window.history.pushState(
          {
            tab: currentTab,
            viewMode,
            category: activeCategory,
            search: searchQuery,
            componentId: highlightedId,
            scrollY: 0,
          },
          "",
          targetUrl,
        );
      }

      prevNavState.current = {
        tab: currentTab,
        viewMode,
        category: activeCategory,
        search: searchQuery,
      };
    } else {
      // Intra-page changes (search query typing, category chips):
      // Update in place so typing keystrokes don't spam browser history
      window.history.replaceState(
        {
          tab: currentTab,
          viewMode,
          category: activeCategory,
          search: searchQuery,
          componentId: highlightedId,
          scrollY: window.scrollY,
        },
        "",
        targetUrl,
      );

      prevNavState.current = {
        tab: currentTab,
        viewMode,
        category: activeCategory,
        search: searchQuery,
      };
    }
  }, [currentTab, viewMode, activeCategory, searchQuery, highlightedId]);

  // Sync browser title, meta description with current view
  useEffect(() => {
    const titleMap = {
      components:
        "Depth UI — The Foundation for your Design System | React & Tailwind UI Library",
      showcase:
        "Showcase — Depth UI | Real-world Component Implementations & Live Previews",
      docs: "Documentation — Depth UI | Getting Started, Installation & Guidelines",
    };

    const descMap = {
      components:
        "Build stunning web interfaces faster with 100+ accessible, reusable React and Tailwind CSS components. Create consistent designs with smooth animations, modern effects, and developer-friendly components.",
      showcase:
        "Explore interactive real-world application showcases built with Depth UI components, responsive layouts, and modern aesthetics.",
      docs: "Learn how to install, configure, and use Depth UI in your React, Next.js, and Tailwind CSS projects. Step-by-step guides and code snippets.",
    };

    document.title = titleMap[currentTab] || titleMap.components;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        descMap[currentTab] || descMap.components,
      );
    }
  }, [currentTab]);



  // Robust, layout-adaptive scroll restoration engine that persists targetY across lazy loads
  const performRobustScrollRestore = (targetY: number) => {
    if (targetY <= 0) return;

    let frames = 0;
    const maxFrames = 75; // ~2.5s across RAF attempts
    let cancelled = false;

    const cancelOnUserInteraction = () => {
      cancelled = true;
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("wheel", cancelOnUserInteraction);
      window.removeEventListener("touchstart", cancelOnUserInteraction);
      window.removeEventListener("pointerdown", cancelOnUserInteraction);
      window.removeEventListener("keydown", cancelOnUserInteraction);
    };

    window.addEventListener("wheel", cancelOnUserInteraction, { passive: true });
    window.addEventListener("touchstart", cancelOnUserInteraction, { passive: true });
    window.addEventListener("pointerdown", cancelOnUserInteraction, { passive: true });
    window.addEventListener("keydown", cancelOnUserInteraction, { passive: true });

    // Initial instant attempt
    window.scrollTo({ top: targetY, behavior: "instant" });

    const step = () => {
      if (cancelled) return;
      frames++;

      window.scrollTo({ top: targetY, behavior: "instant" });

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      );
      const maxScroll = docHeight - window.innerHeight;

      // Lock onto target once document has expanded and scroll is within 3px
      if (Math.abs(window.scrollY - targetY) <= 3 && maxScroll >= targetY) {
        cleanup();
        return;
      }

      if (frames < maxFrames) {
        requestAnimationFrame(step);
      } else {
        cleanup();
      }
    };

    requestAnimationFrame(step);
  };

  // Automatic scroll & state restoration on mount or reload
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let savedY: number | null = null;
    try {
      const stored = sessionStorage.getItem("depth_ui_scroll_y");
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          savedY = parsed;
        }
      }
    } catch {
      // Storage unavailable
    }

    // A. IF WE HAVE A SAVED SCROLL POSITION FOR THIS TAB:
    // Stick exactly there! Never jump or redirect to any other view or position!
    if (savedY !== null && savedY > 0) {
      performRobustScrollRestore(savedY);
      return;
    }

    // B. ONLY ON BRAND-NEW VISIT (no saved scroll for this tab) and if URL has a component anchor:
    const rawHash = window.location.hash.replace(/^#/, "");
    if (
      rawHash &&
      rawHash !== "docs" &&
      rawHash !== "showcase" &&
      rawHash !== "components" &&
      rawHash !== "components-catalog" &&
      !["intro", "installation", "utils", "nextjs", "theming"].includes(rawHash)
    ) {
      const scrollToHash = () => {
        const el = document.getElementById(rawHash);
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "start" });
          setHighlightedId(rawHash);
          setTimeout(() => setHighlightedId(null), 2500);
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        const timer1 = setTimeout(scrollToHash, 60);
        const timer2 = setTimeout(scrollToHash, 200);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, []);

  // Continuously persist scroll position and full app state right before reload/unload
  useEffect(() => {
    let lastSavedTime = 0;
    let scrollTimer: ReturnType<typeof setTimeout>;

    const persistNow = () => {
      try {
        sessionStorage.setItem("depth_ui_scroll_y", String(window.scrollY));
        sessionStorage.setItem("depth_ui_tab", currentTab);
        sessionStorage.setItem("depth_ui_view_mode", viewMode);
        sessionStorage.setItem("depth_ui_category", activeCategory);
        sessionStorage.setItem("depth_ui_search", searchQuery);
      } catch {
        // Storage unavailable
      }
    };

    const handleScrollPos = () => {
      const now = Date.now();
      // Fast throttled write every 60ms during active scrolling
      if (now - lastSavedTime > 60) {
        lastSavedTime = now;
        try {
          sessionStorage.setItem("depth_ui_scroll_y", String(window.scrollY));
        } catch {
          // Storage unavailable
        }
      }

      // Plus trailing save after scroll stops
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        try {
          sessionStorage.setItem("depth_ui_scroll_y", String(window.scrollY));
        } catch {
          // Storage unavailable
        }
      }, 50);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        persistNow();
      }
    };

    window.addEventListener("scroll", handleScrollPos, { passive: true });
    window.addEventListener("scrollend", persistNow, { passive: true });
    window.addEventListener("beforeunload", persistNow);
    window.addEventListener("pagehide", persistNow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScrollPos);
      window.removeEventListener("scrollend", persistNow);
      window.removeEventListener("beforeunload", persistNow);
      window.removeEventListener("pagehide", persistNow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(scrollTimer);
    };
  }, [currentTab, viewMode, activeCategory, searchQuery]);

  // Filter components based on category and search query (Optimized with useMemo)
  const filteredComponents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return COMPONENTS_CATALOG.filter((comp) => {
      const matchesCategory =
        activeCategory === "all" || comp.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        comp.title.toLowerCase().includes(query) ||
        comp.name.toLowerCase().includes(query) ||
        comp.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [activeCategory, searchQuery]);

  const handleOpenSearch = useCallback(() => {
    try {
      window.history.pushState(
        {
          tab: currentTab,
          viewMode,
          category: activeCategory,
          search: searchQuery,
          componentId: highlightedId,
          isSearchModal: true,
          scrollY: window.scrollY,
        },
        "",
      );
    } catch {
      // Ignore
    }
    setIsSearchOpen(true);
  }, [currentTab, viewMode, activeCategory, searchQuery, highlightedId]);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    if (window.history.state?.isSearchModal) {
      window.history.back();
    }
  }, []);

  // Keyboard shortcut for Cmd/Ctrl+K search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isSearchOpenRef.current) {
          handleCloseSearch();
        } else {
          handleOpenSearch();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleOpenSearch, handleCloseSearch]);

  const handleSelectComponentFromSearch = (id: string) => {
    setIsSearchOpen(false);
    setCurrentTab("components");
    setHighlightedId(id);
    setViewMode("previews");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    setTimeout(() => {
      setHighlightedId(null);
    }, 2500);
  };

  const handleSelectComponentFromGrid = (id: string) => {
    setHighlightedId(id);
    setViewMode("previews");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    setTimeout(() => {
      setHighlightedId(null);
    }, 2500);
  };

  const handleSwitchToGrid = (scrollTarget: "catalog" | "top" = "catalog") => {
    setHighlightedId(null);
    setViewMode("grid");
    setTimeout(() => {
      if (scrollTarget === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById("components-catalog");
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  // Category counts and metadata memoized to avoid redundant array traversals
  const categoryOptions = useMemo(
    () => [
      {
        id: "all",
        label: "All Components",
        count: COMPONENTS_CATALOG.length,
        icon: Grid,
      },
      {
        id: "forms",
        label: "Forms & Inputs",
        count: COMPONENTS_CATALOG.filter((c) => c.category === "forms").length,
        icon: CheckSquare,
      },
      {
        id: "navigation",
        label: "Navigation & Overlays",
        count: COMPONENTS_CATALOG.filter((c) => c.category === "navigation")
          .length,
        icon: Compass,
      },
      {
        id: "data",
        label: "Data & Feedback",
        count: COMPONENTS_CATALOG.filter((c) => c.category === "data").length,
        icon: Layers,
      },
      {
        id: "spatial",
        label: "Display & 3D",
        count: COMPONENTS_CATALOG.filter((c) => c.category === "spatial")
          .length,
        icon: Box,
      },
      {
        id: "motion",
        label: "Motion & Layout",
        count: COMPONENTS_CATALOG.filter((c) => c.category === "motion").length,
        icon: Activity,
      },
      {
        id: "creative",
        label: "Vibrant & Colors",
        count: COMPONENTS_CATALOG.filter((c) => c.category === "creative")
          .length,
        icon: Palette,
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      {/* Global Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenSearch={handleOpenSearch}
        isDark={isDark}
        setIsDark={setIsDark}
        onNavigateToHome={() => {
          setCurrentTab("components");
          setViewMode("grid");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onNavigateToComponents={() => {
          setCurrentTab("components");
          handleSwitchToGrid("catalog");
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === "components" && (
          <>
            {/* Minimal Hero Section matching user design */}
            <HeroSection
              onExploreComponents={() => {
                const el = document.getElementById("components-catalog");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              onOpenDocs={() => setCurrentTab("docs")}
            />

            {/* Understated Separator */}
            <div className="border-b border-zinc-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-10" />

            {/* Components Section */}
            <section
              id="components-catalog"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8"
            >
              {/* Directory Grid View (Default: Compact 4-column overview matching user's screenshots) */}
              <ComponentDirectoryGrid
                components={filteredComponents}
                allComponents={COMPONENTS_CATALOG}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectComponent={handleSelectComponentFromGrid}
                viewMode={viewMode}
                setViewMode={setViewMode}
                totalCount={COMPONENTS_CATALOG.length}
              />

              {/* Live Interactive Demos Mode */}
              {viewMode === "previews" && (
                <div className="space-y-8 pt-4 border-t border-zinc-800/80">
                  {/* Mode Banner & Quick Back to Grid */}
                  <div className="p-4 rounded-2xl bg-[#141418] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg">
                          Live Interactive Stage
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300">
                          {activeCategory === "all"
                            ? `Showing all ${filteredComponents.length} components grouped by category.`
                            : `Filtered to ${filteredComponents.length} components in "${categoryOptions.find((c) => c.id === activeCategory)?.label}".`}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSwitchToGrid("catalog")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm cursor-pointer hover:bg-zinc-200 transition-colors self-start sm:self-auto shadow-xs"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      <span>Back to Directory Grid</span>
                    </button>
                  </div>

                  {/* Sticky Group Navigation when viewing All in Live Demos */}
                  {activeCategory === "all" && !searchQuery && (
                    <div className="sticky top-20 z-30 p-2 sm:p-2.5 rounded-2xl bg-[#121215]/95 backdrop-blur-md border border-zinc-800 shadow-xl flex items-center justify-between gap-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0">
                        <span className="text-zinc-300 font-semibold px-1 sm:px-2 shrink-0">
                          Jump:
                        </span>
                        {CATEGORIES_CONFIG.map((cat) => {
                          const count = COMPONENTS_CATALOG.filter(
                            (c) => c.category === cat.id,
                          ).length;
                          const Icon = cat.icon;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => {
                                const el = document.getElementById(
                                  `live-group-${cat.id}`,
                                );
                                el?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer shrink-0 font-medium"
                            >
                              <Icon className="w-3.5 h-3.5 text-zinc-400" />
                              <span>{cat.label}</span>
                              <span className="text-xs text-zinc-400 font-mono">
                                ({count})
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handleSwitchToGrid("top")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white text-xs cursor-pointer transition-colors shrink-0"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Directory Grid</span>
                        <span className="sm:hidden">Grid</span>
                      </button>
                    </div>
                  )}

                  {/* Empty State */}
                  {filteredComponents.length === 0 ? (
                    <div className="p-12 sm:p-16 rounded-2xl bg-[#121215] border border-zinc-800 text-center space-y-3">
                      <p className="text-zinc-300 text-sm sm:text-base">
                        No components found matching &quot;{searchQuery}&quot;.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium cursor-pointer hover:bg-zinc-200 transition-colors"
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : activeCategory === "all" && !searchQuery ? (
                    /* GROUPED LIVE DEMOS: Divided by category so users do not have to scroll forever */
                    <div className="space-y-16">
                      {CATEGORIES_CONFIG.map((category) => {
                        const groupItems = COMPONENTS_CATALOG.filter(
                          (c) => c.category === category.id,
                        );
                        if (groupItems.length === 0) return null;
                        const Icon = category.icon;

                        return (
                          <div
                            key={category.id}
                            id={`live-group-${category.id}`}
                            className="scroll-mt-32 space-y-8"
                          >
                            {/* Group Section Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                              <div className="flex items-center gap-3.5">
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${category.badgeBg}`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2.5">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                      {category.label}
                                    </h3>
                                    <span className="text-xs sm:text-[13px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                                      {groupItems.length} components
                                    </span>
                                  </div>
                                  <p className="text-sm text-zinc-300 mt-1">
                                    {category.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 self-start sm:self-auto">
                                <button
                                  onClick={() => {
                                    setActiveCategory(category.id);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                  className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                  Focus on {category.label} only →
                                </button>
                              </div>
                            </div>

                            {/* Components for this group */}
                            <div className="space-y-8 sm:space-y-10">
                              {groupItems.map((item) => (
                                <div
                                  key={item.id}
                                  className={`transition-all duration-500 rounded-2xl ${
                                    highlightedId === item.id
                                      ? "ring-2 ring-white/70 shadow-2xl shadow-white/10"
                                      : ""
                                  }`}
                                >
                                  <ComponentCardPreview item={item} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* FILTERED LIVE DEMOS (Single group or search results) */
                    <div className="space-y-8 sm:space-y-10">
                      {filteredComponents.map((item) => (
                        <div
                          key={item.id}
                          className={`transition-all duration-500 rounded-2xl ${
                            highlightedId === item.id
                              ? "ring-2 ring-white/70 shadow-2xl shadow-white/10"
                              : ""
                          }`}
                        >
                          <ComponentCardPreview item={item} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Return to top of live demos */}
                  <div className="flex justify-center pt-8 border-t border-zinc-800/80">
                    <button
                      onClick={() => {
                        const el = document.getElementById("components-catalog");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>Back to top of section</span>
                    </button>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {currentTab === "showcase" && (
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-white animate-spin" />
              </div>
            }
          >
            <ShowcaseView />
          </Suspense>
        )}

        {currentTab === "docs" && (
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-white animate-spin" />
              </div>
            }
          >
            <DocumentationView
              onNavigateToComponents={() => {
                setCurrentTab("components");
                setViewMode("grid");
                setTimeout(() => {
                  const el = document.getElementById("components-catalog");
                  el?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
              onNavigateToShowcase={() => {
                setCurrentTab("showcase");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Suspense>
        )}
      </main>

      {/* Professional Community Footer */}
      <Footer
        onNavigateToComponents={() => {
          setCurrentTab("components");
          setViewMode("grid");
          setTimeout(() => {
            const el = document.getElementById("components-catalog");
            el?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }}
        onNavigateToDocs={() => {
          setCurrentTab("docs");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onNavigateToShowcase={() => {
          setCurrentTab("showcase");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        onSelectComponent={handleSelectComponentFromSearch}
      />
    </div>
  );
}

export default App;
