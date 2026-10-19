import React, { useState, useEffect, useCallback } from "react";
import { Search, Menu, X, ArrowRight, Star } from "lucide-react";

export interface NavbarProps {
  currentTab: "components" | "showcase" | "docs";
  setCurrentTab: (tab: "components" | "showcase" | "docs") => void;
  onOpenSearch: () => void;
  isDark?: boolean;
  setIsDark?: (dark: boolean) => void;
  onNavigateToComponents?: () => void;
  onNavigateToHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  isDark = true,
  onNavigateToComponents,
  onNavigateToHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [repoStars, setRepoStars] = useState<number>(() => {
    try {
      const cached = sessionStorage.getItem("depth_ui_repo_stars");
      if (cached) {
        const parsed = parseInt(cached, 10);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    } catch {
      // Storage unavailable
    }
    return 3; // Initial verified star count
  });

  // Fast synchronization with GitHub repository stargazers
  const fetchLatestStars = useCallback(() => {
    // Append timestamp query parameter and use cache: "no-store" to bypass browser & CDN caching
    const endpoint = `https://api.github.com/repos/DEVAL-020/depth-ui?_t=${Date.now()}`;
    fetch(endpoint, {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch repository stats");
      })
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setRepoStars(data.stargazers_count);
          try {
            sessionStorage.setItem(
              "depth_ui_repo_stars",
              String(data.stargazers_count),
            );
          } catch {
            // Storage unavailable
          }
        }
      })
      .catch(() => {
        // Fallback to current state
      });
  }, []);

  useEffect(() => {
    // 1. Initial fast check
    fetchLatestStars();

    // 2. Query immediately when window is refocused or becomes visible (e.g. user stars on GitHub and tabs back)
    const handleRecheck = () => {
      fetchLatestStars();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchLatestStars();
      }
    };

    window.addEventListener("focus", handleRecheck);
    window.addEventListener("pageshow", handleRecheck);
    document.addEventListener("visibilitychange", handleVisibility);

    // 3. Fast background polling every 15 seconds while user is on the site
    const interval = setInterval(fetchLatestStars, 15000);

    return () => {
      window.removeEventListener("focus", handleRecheck);
      window.removeEventListener("pageshow", handleRecheck);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(interval);
    };
  }, [fetchLatestStars]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      id: "home",
      label: "Home",
      action: () => {
        if (onNavigateToHome) {
          onNavigateToHome();
        } else {
          setCurrentTab("components");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      isActive: currentTab === "components",
    },
    {
      id: "components",
      label: "Components",
      action: () => {
        if (onNavigateToComponents) {
          onNavigateToComponents();
        } else {
          setCurrentTab("components");
          setTimeout(() => {
            document
              .getElementById("components-catalog")
              ?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      },
      isActive: currentTab === "components",
    },
    {
      id: "showcase",
      label: "Templates & Blocks",
      action: () => {
        setCurrentTab("showcase");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      isActive: currentTab === "showcase",
    },
    {
      id: "docs",
      label: "Documentation",
      action: () => {
        setCurrentTab("docs");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      isActive: currentTab === "docs",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-3.5 ${
        isScrolled || mobileMenuOpen
          ? isDark
            ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/25"
            : "bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 shadow-lg shadow-zinc-950/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Brand & Authentic Website Links */}
        <div className="flex items-center gap-6 lg:gap-8 min-w-0">
          {/* Logo & Version */}
          <div
            onClick={() => {
              if (onNavigateToHome) {
                onNavigateToHome();
              } else {
                setCurrentTab("components");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 cursor-pointer font-bold text-white text-base sm:text-lg tracking-tight shrink-0 select-none group"
          >
            <div className="w-6 h-6 rounded-md bg-white text-black flex items-center justify-center font-black text-xs shadow-xs group-hover:bg-zinc-200 transition-colors">
              D
            </div>
            <span className="font-semibold text-white tracking-tight">
              Depth UI
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              v1.0
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={link.action}
                className={`transition-colors cursor-pointer py-1 ${
                  link.isActive
                    ? "text-white font-semibold"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side: Search, GitHub, Theme, Get Started */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Button for Mobile (< sm) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="sm:hidden p-2.5 min-w-[44px] min-h-[44px] rounded-lg bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
            title="Search (⌘K)"
            aria-label="Open search dialog"
          >
            <Search className="w-4 h-4 text-zinc-300" />
          </button>

          {/* Search Button for Tablet & Desktop (>= sm) */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search components"
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 min-h-[40px] rounded-lg bg-[#18181b] hover:bg-zinc-800 text-sm text-zinc-300 border border-zinc-800 transition-colors cursor-pointer w-48 md:w-60 justify-between"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <span className="truncate text-xs sm:text-sm">
                Search components...
              </span>
            </span>
            <kbd className="inline-block px-1.5 py-0.5 rounded bg-zinc-900 text-xs font-mono text-zinc-400 border border-zinc-800 shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Star Link with Live Stars Badge */}
          <a
            href="https://github.com/DEVAL-020/depth-ui"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              // Rapid re-query when user returns after starring
              setTimeout(fetchLatestStars, 1200);
              setTimeout(fetchLatestStars, 3000);
            }}
            aria-label={`Depth UI on GitHub (${repoStars} stars)`}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 min-h-[40px] rounded-lg text-xs sm:text-sm font-medium text-zinc-200 hover:text-white hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group"
            title="Star DEVAL-020/depth-ui on GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-xs sm:text-sm font-medium">GitHub</span>
            <span className="w-px h-3.5 bg-zinc-800 group-hover:bg-zinc-700 transition-colors" />
            <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs text-zinc-300 group-hover:text-amber-300 transition-colors">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span>{repoStars}</span>
            </span>
          </a>

          {/* Get Started Button */}
          <button
            type="button"
            onClick={() => {
              setCurrentTab("docs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-lg bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-zinc-800/80 space-y-1 text-base">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                link.action();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg font-medium transition-colors ${
                link.isActive
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-200 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://github.com/DEVAL-020/depth-ui"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setTimeout(fetchLatestStars, 1200);
                setTimeout(fetchLatestStars, 3000);
              }}
              aria-label={`Depth UI GitHub Repository (${repoStars} stars)`}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#18181b] border border-zinc-800 text-zinc-200 font-medium hover:bg-zinc-800 transition-colors flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub Repository</span>
              </div>
              <span className="flex items-center gap-1 font-mono text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{repoStars}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => {
                setCurrentTab("docs");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-center hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 shadow-sm text-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
