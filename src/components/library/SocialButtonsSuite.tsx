import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

export type SocialPlatform =
  | "github"
  | "google"
  | "x"
  | "discord"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "figma"
  | "slack"
  | "apple";

export type ButtonShape = "horizontal" | "square" | "circle" | "pill";
export type StyleVariant = "brand" | "dark" | "outline" | "glass";
export type ButtonSize = "sm" | "default" | "lg";

export interface SocialButtonProps {
  platform: SocialPlatform;
  shape?: ButtonShape;
  variant?: StyleVariant;
  size?: ButtonSize;
  label?: string;
  count?: string;
  onClick?: () => void;
  className?: string;
}

// ============================================================================
// Authentic Brand Icons & Palette Definitions
// ============================================================================
const PLATFORMS: Record<
  SocialPlatform,
  {
    name: string;
    brandBg: string;
    brandText: string;
    hoverGlow: string;
    defaultLabel: string;
    counter: string;
    renderIcon: (className?: string) => React.ReactNode;
  }
> = {
  github: {
    name: "GitHub",
    brandBg: "bg-[#24292e] hover:bg-[#1b1f23]",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]",
    defaultLabel: "Star on GitHub",
    counter: "24.8k",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} fill-current`} viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  google: {
    name: "Google",
    brandBg: "bg-white hover:bg-zinc-100",
    brandText: "text-zinc-900 font-semibold",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(66,133,244,0.3)]",
    defaultLabel: "Continue with Google",
    counter: "OAuth",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} shrink-0`} viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
    ),
  },
  x: {
    name: "X (Twitter)",
    brandBg: "bg-black hover:bg-zinc-900 border border-zinc-800",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
    defaultLabel: "Follow on X",
    counter: "82.4k",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} fill-current`} viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  discord: {
    name: "Discord",
    brandBg: "bg-[#5865F2] hover:bg-[#4752c4]",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(88,101,242,0.4)]",
    defaultLabel: "Join Discord",
    counter: "14.2k",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} fill-current`} viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    brandBg: "bg-[#0A66C2] hover:bg-[#084e96]",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]",
    defaultLabel: "Connect on LinkedIn",
    counter: "19.5k",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} fill-current`} viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  youtube: {
    name: "YouTube",
    brandBg: "bg-[#FF0000] hover:bg-[#cc0000]",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(255,0,0,0.4)]",
    defaultLabel: "Subscribe on YouTube",
    counter: "54k",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} fill-current`} viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  instagram: {
    name: "Instagram",
    brandBg:
      "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(220,39,67,0.4)]",
    defaultLabel: "Follow on Instagram",
    counter: "38.6k",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} fill-current`} viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  figma: {
    name: "Figma",
    brandBg: "bg-[#1e1e1e] hover:bg-[#2c2c2c] border border-zinc-800",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(242,78,30,0.3)]",
    defaultLabel: "Duplicate in Figma",
    counter: "UI Kit",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls}`} viewBox="0 0 38 57" fill="none">
        <path
          d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
          fill="#1ABCFE"
        />
        <path
          d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
          fill="#0ACF83"
        />
        <path
          d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
          fill="#FF7262"
        />
        <path
          d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
          fill="#F24E1E"
        />
        <path
          d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
          fill="#A259FF"
        />
      </svg>
    ),
  },
  slack: {
    name: "Slack",
    brandBg: "bg-[#4A154B] hover:bg-[#3b113c]",
    brandText: "text-white",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(74,21,75,0.4)]",
    defaultLabel: "Join Community Slack",
    counter: "8.4k",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls}`} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 2 2v-5H7v3z"
          fill="#E01E5A"
        />
        <path
          d="M9 6a2 2 0 1 1-2-2v2h2zm0 1a2 2 0 1 1 2 2H6V7h3z"
          fill="#36C5F0"
        />
        <path
          d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 1 1-2-2v5h2V9z"
          fill="#2EB67D"
        />
        <path
          d="M15 18a2 2 0 1 1 2 2v-2h-2zm0-1a2 2 0 1 1-2-2h5v2h-3z"
          fill="#ECB22E"
        />
      </svg>
    ),
  },
  apple: {
    name: "Apple",
    brandBg: "bg-white hover:bg-zinc-100",
    brandText: "text-zinc-950 font-semibold",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    defaultLabel: "Sign in with Apple",
    counter: "OAuth",
    renderIcon: (cls = "w-4 h-4") => (
      <svg className={`${cls} fill-current`} viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.07.62-2.73 1.39-.58.67-1.09 1.74-.96 2.77 1.04.08 2.12-.53 2.77-1.31" />
      </svg>
    ),
  },
};

// ============================================================================
// Core SocialButton Component
// ============================================================================
export const SocialButton: React.FC<SocialButtonProps> = ({
  platform,
  shape = "horizontal",
  variant = "brand",
  size = "default",
  label,
  count,
  onClick,
  className = "",
}) => {
  const p = PLATFORMS[platform];
  const displayLabel = label || p.defaultLabel;
  const displayCount = count !== undefined ? count : p.counter;

  // Shape Styles
  const shapeStyles = {
    horizontal: "px-4 py-2.5 rounded-xl gap-2.5 w-auto",
    pill: "px-4 py-2.5 rounded-full gap-2.5 w-auto",
    square: "rounded-xl p-0 aspect-square shrink-0",
    circle: "rounded-full p-0 aspect-square shrink-0",
  }[shape];

  // Size Dimensions
  const sizeStyles = {
    horizontal: {
      sm: "text-xs h-8 px-3",
      default: "text-xs sm:text-sm h-10 px-4",
      lg: "text-sm sm:text-base h-12 px-5",
    },
    pill: {
      sm: "text-xs h-8 px-3.5",
      default: "text-xs sm:text-sm h-10 px-4.5",
      lg: "text-sm sm:text-base h-12 px-5.5",
    },
    square: {
      sm: "w-8 h-8",
      default: "w-10 h-10",
      lg: "w-12 h-12",
    },
    circle: {
      sm: "w-8 h-8",
      default: "w-10 h-10",
      lg: "w-12 h-12",
    },
  }[shape][size];

  // Icon Sizing
  const iconSize = {
    sm: "w-3.5 h-3.5",
    default: "w-4.5 h-4.5",
    lg: "w-5 h-5",
  }[size];

  // Variant Styling
  let variantClass = "";
  if (variant === "brand") {
    variantClass = `${p.brandBg} ${p.brandText} ${p.hoverGlow}`;
  } else if (variant === "dark") {
    variantClass =
      "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 shadow-sm";
  } else if (variant === "outline") {
    variantClass =
      "bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700/80 hover:border-zinc-500";
  } else if (variant === "glass") {
    variantClass =
      "bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 hover:border-white/20";
  }

  const isIconOnly = shape === "square" || shape === "circle";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 ease-out cursor-pointer active:scale-95 select-none ${shapeStyles} ${sizeStyles} ${variantClass} ${className}`}
      title={displayLabel}
      aria-label={displayLabel}
    >
      {p.renderIcon(iconSize)}

      {!isIconOnly && (
        <span className="font-semibold whitespace-nowrap">{displayLabel}</span>
      )}

      {!isIconOnly && displayCount && (
        <span
          className={`ml-auto text-[11px] font-mono px-2 py-0.5 rounded-full ${
            variant === "brand" && platform === "google"
              ? "bg-zinc-200 text-zinc-800"
              : "bg-black/25 text-white/90 border border-white/10"
          }`}
        >
          {displayCount}
        </span>
      )}
    </button>
  );
};

// ============================================================================
// Interactive Demo Showcase
// ============================================================================
export const SocialButtonsSuiteDemo: React.FC = () => {
  const [activeShape, setActiveShape] = useState<ButtonShape>("horizontal");
  const [activeVariant, setActiveVariant] = useState<StyleVariant>("brand");
  const [activeSize, setActiveSize] = useState<ButtonSize>("default");
  const [copiedLink, setCopiedLink] = useState(false);
  const [alertFeedback, setAlertFeedback] = useState<string | null>(null);

  const triggerFeedback = (name: string) => {
    setAlertFeedback(`Clicked: ${name}`);
    setTimeout(() => setAlertFeedback(null), 1800);
  };

  const handleCopyShareLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText(window.location.origin);
    setTimeout(() => setCopiedLink(false), 1600);
  };

  const primaryPlatforms: SocialPlatform[] = [
    "github",
    "google",
    "x",
    "discord",
    "linkedin",
    "youtube",
    "instagram",
    "figma",
    "slack",
    "apple",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-7 p-6 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-2xl">
      {/* Controls Bar: Shape, Variant, Size */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>Social Buttons Suite</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
              10 Platforms
            </span>
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Responsive shapes, authentic vectors, brand gradients, and icon
            counters.
          </p>
        </div>

        {alertFeedback && (
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 animate-in fade-in">
            {alertFeedback}
          </span>
        )}
      </div>

      {/* Switchers: Shape & Style Preset */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Shape Switcher */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Shape
          </label>
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            {(["horizontal", "pill", "square", "circle"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setActiveShape(s)}
                className={`flex-1 py-1 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                  activeShape === s
                    ? "bg-zinc-800 text-white shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Style Variant Switcher */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Style Theme
          </label>
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            {(["brand", "dark", "outline", "glass"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                className={`flex-1 py-1 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                  activeVariant === v
                    ? "bg-zinc-800 text-white shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Size Switcher */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Size Scale
          </label>
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            {(["sm", "default", "lg"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setActiveSize(sz)}
                className={`flex-1 py-1 rounded-lg text-xs font-medium uppercase transition-colors cursor-pointer ${
                  activeSize === sz
                    ? "bg-zinc-800 text-white shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Render */}
      <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/90 shadow-inner">
        {activeShape === "horizontal" || activeShape === "pill" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {primaryPlatforms.map((p) => (
              <SocialButton
                key={p}
                platform={p}
                shape={activeShape}
                variant={activeVariant}
                size={activeSize}
                onClick={() => triggerFeedback(PLATFORMS[p].name)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 py-4">
            {primaryPlatforms.map((p) => (
              <SocialButton
                key={p}
                platform={p}
                shape={activeShape}
                variant={activeVariant}
                size={activeSize}
                onClick={() => triggerFeedback(PLATFORMS[p].name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Real-World Pattern: Sticky Floating Share Bar */}
      <div className="pt-4 border-t border-zinc-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Live Website Pattern: Floating Social Share Dock
            </span>
            <p className="text-xs text-zinc-500 mt-0.5">
              Ideal for blog articles, SaaS landing pages, portfolios, and
              product launches.
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
            Dock Mode
          </span>
        </div>

        {/* Floating Dock Strip */}
        <div className="flex flex-wrap items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white pl-2">
              Share Project:
            </span>
            <SocialButton
              platform="x"
              shape="circle"
              variant="dark"
              size="sm"
              onClick={() => triggerFeedback("Share to X")}
            />
            <SocialButton
              platform="linkedin"
              shape="circle"
              variant="dark"
              size="sm"
              onClick={() => triggerFeedback("Share to LinkedIn")}
            />
            <SocialButton
              platform="github"
              shape="circle"
              variant="dark"
              size="sm"
              onClick={() => triggerFeedback("View on GitHub")}
            />
            <SocialButton
              platform="discord"
              shape="circle"
              variant="dark"
              size="sm"
              onClick={() => triggerFeedback("Discord Community")}
            />
          </div>

          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialButtonsSuiteDemo;
