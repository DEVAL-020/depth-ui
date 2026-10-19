import React, { useState, useEffect } from "react";
import { Search, Menu, X, ArrowRight } from "lucide-react";

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
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 ${
        isScrolled || mobileMenuOpen
          ? isDark
            ? "bg-[#09090b]/60 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/25 py-3"
            : "bg-white/70 backdrop-blur-xl border-b border-zinc-200/80 shadow-lg shadow-zinc-950/5 py-3"
          : "bg-transparent border-b border-transparent py-4"
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
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-lg bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
            title="Search (⌘K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Search Button for Tablet & Desktop (>= sm) */}
          <button
            onClick={onOpenSearch}
            aria-label="Search components"
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-[#18181b] hover:bg-zinc-800 text-sm text-zinc-300 border border-zinc-800 transition-colors cursor-pointer w-48 md:w-60 justify-between"
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

          {/* GitHub Star Link */}
          <a
            href="https://github.com/DEVAL-020"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Deval Patel on GitHub"
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-200 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
            title="Star on GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-xs sm:text-sm">GitHub</span>
          </a>

          {/* Get Started Button */}
          <button
            onClick={() => {
              setCurrentTab("docs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
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
          <div className="pt-2">
            <button
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
