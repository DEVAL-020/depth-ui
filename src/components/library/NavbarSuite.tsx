import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  Layers,
  Bell,
  Smartphone,
  Laptop,
  Tablet,
} from "lucide-react";

// ============================================================================
// 1. SaaS / Product Navbar (Full-Width Sticky with Dropdowns & Mobile Drawer)
// ============================================================================
export const SaaSNavbar: React.FC<{
  brandName?: string;
  onCtaClick?: () => void;
}> = ({ brandName = "AcmeCorp", onCtaClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-[#0d0d11]/60 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Version Pill */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            A
          </div>
          <span className="font-bold text-base text-white tracking-tight">
            {brandName}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
            v2.0
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-300">
          <div className="relative">
            <button
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Features</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  productsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {productsDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-56 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-30 space-y-1">
                {[
                  { title: "Edge Analytics", desc: "Real-time telemetry" },
                  { title: "Canvas Engine", desc: "Hardware accelerated" },
                  { title: "Security Shield", desc: "SOC-2 compliant" },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setProductsDropdownOpen(false)}
                    className="w-full text-left p-2 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-zinc-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#docs" className="hover:text-white transition-colors">
            Changelog
          </a>
          <a href="#company" className="hover:text-white transition-colors">
            Company
          </a>
        </nav>

        {/* Right Actions: Search trigger, Sign In, CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Search (⌘K) clicked")}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>

          <button className="hidden sm:block text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer">
            Sign In
          </button>

          <button
            onClick={onCtaClick || (() => alert("Get Started Clicked"))}
            className="px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 p-4 space-y-3 bg-[#0d0d11] rounded-b-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {[
              "Features",
              "Pricing",
              "Changelog",
              "Documentation",
              "Company",
            ].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-850 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
            <button className="text-xs font-medium text-zinc-400 hover:text-white">
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCtaClick?.();
              }}
              className="px-4 py-2 rounded-xl bg-white text-zinc-950 text-xs font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// ============================================================================
// 2. Floating Island Pill Navbar (Modern Raycast/Linear Style)
// ============================================================================
export const FloatingIslandNavbar: React.FC<{
  onJoinWaitlist?: () => void;
}> = ({ onJoinWaitlist }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Integration", "Showcase", "Pricing"];

  return (
    <div className="w-full flex justify-center p-1">
      <nav className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        {/* Brand Icon Mark */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm ml-0.5">
          <Layers className="w-3.5 h-3.5 text-white" />
        </div>

        {/* Tab Links */}
        <div className="flex items-center gap-0.5 sm:gap-1 px-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-zinc-800 text-white shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onJoinWaitlist || (() => alert("Waitlist Joined!"))}
          className="ml-1 sm:ml-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Join Waitlist
        </button>
      </nav>
    </div>
  );
};

// ============================================================================
// 3. Creator / Portfolio Navbar (Minimalist with Availability Status)
// ============================================================================
export const PortfolioNavbar: React.FC<{
  designerName?: string;
  isAvailable?: boolean;
}> = ({ designerName = "Alex Rivera", isAvailable = true }) => {
  return (
    <header className="w-full max-w-4xl mx-auto px-5 py-3 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-lg flex items-center justify-between gap-4">
      {/* Designer Name & Availability Dot */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-sm text-white tracking-tight">
          {designerName}
        </span>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isAvailable ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"
            }`}
          />
          <span>
            {isAvailable ? "Available for Q2 Projects" : "Booked for Q2"}
          </span>
        </div>
      </div>

      {/* Navigation & Contact Trigger */}
      <div className="flex items-center gap-5">
        <nav className="flex items-center gap-4 text-xs font-medium text-zinc-400">
          <a href="#work" className="hover:text-white transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#articles" className="hover:text-white transition-colors">
            Writing
          </a>
        </nav>

        <button
          onClick={() => alert("Contact Modal Opened")}
          className="px-3.5 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-xs font-semibold text-white transition-all cursor-pointer"
        >
          Get in Touch
        </button>
      </div>
    </header>
  );
};

// ============================================================================
// 4. Dashboard / Workspace Header (With Search, Notification & Avatar)
// ============================================================================
export const DashboardNavbar: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <header className="w-full bg-[#121215] border border-zinc-800/80 rounded-2xl px-4 sm:px-6 py-3 shadow-lg flex items-center justify-between gap-4">
      {/* Workspace Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono text-[10px] font-bold">
            D
          </div>
          <span className="text-xs font-semibold text-white">
            Depth Design System
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-xs w-full hidden md:block">
        <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search projects, tokens, components..."
          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
        />
      </div>

      {/* Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          onClick={() => setUnreadCount(0)}
          className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold flex items-center justify-center ring-2 ring-zinc-950">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar with Presence Dot */}
        <div className="flex items-center gap-2 pl-2 border-l border-zinc-800 cursor-pointer">
          <div className="relative">
            <img
              src="/images/avatar-1.jpg"
              alt="Elena"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-700"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">
              Elena R.
            </p>
            <p className="text-[10px] text-zinc-500 font-mono">
              Workspace Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// Interactive Demo Component Showcase
// ============================================================================
export const NavbarSuiteDemo: React.FC = () => {
  const [selectedNavbar, setSelectedNavbar] = useState<
    "saas" | "floating" | "portfolio" | "dashboard"
  >("saas");
  const [viewportMode, setViewportMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const viewportWidth = {
    desktop: "max-w-4xl",
    tablet: "max-w-2xl",
    mobile: "max-w-sm",
  }[viewportMode];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>Readymade Navbars Suite</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              4 Production Layouts
            </span>
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Full-width SaaS, floating island pill, minimalist portfolio, and
            workspace dashboard headers.
          </p>
        </div>

        {/* Viewport Simulation Buttons */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <button
            onClick={() => setViewportMode("desktop")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewportMode === "desktop"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-white"
            }`}
            title="Desktop Width"
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewportMode("tablet")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewportMode === "tablet"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-white"
            }`}
            title="Tablet Width"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewportMode("mobile")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewportMode === "mobile"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-white"
            }`}
            title="Mobile Width"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Navbar Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "saas", label: "1. SaaS Full-Width Header" },
          { id: "floating", label: "2. Floating Island Pill" },
          { id: "portfolio", label: "3. Portfolio & Studio" },
          { id: "dashboard", label: "4. Workspace Dashboard" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedNavbar(item.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              selectedNavbar === item.id
                ? "bg-white text-black font-semibold shadow-xs"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Preview Container simulating active browser viewport */}
      <div className="p-6 sm:p-10 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 min-h-[220px] flex items-center justify-center overflow-x-auto shadow-inner">
        <div className={`w-full ${viewportWidth} transition-all duration-300`}>
          {selectedNavbar === "saas" && <SaaSNavbar />}
          {selectedNavbar === "floating" && <FloatingIslandNavbar />}
          {selectedNavbar === "portfolio" && <PortfolioNavbar />}
          {selectedNavbar === "dashboard" && <DashboardNavbar />}
        </div>
      </div>
    </div>
  );
};

export default NavbarSuiteDemo;
