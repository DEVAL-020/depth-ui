import React, { useState } from "react";
import {
  Loader2,
  Trash2,
  Check,
  Copy,
  ChevronDown,
  Heart,
  Bookmark,
  Share2,
  Zap,
} from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "gradient"
    | "link";
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer select-none";

  const variants = {
    default:
      "bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_1px_3px_rgba(255,255,255,0.1),0_0_12px_rgba(255,255,255,0.15)] font-semibold",
    secondary:
      "bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white border border-zinc-800/90 shadow-sm",
    outline:
      "bg-transparent text-zinc-300 hover:text-white border border-zinc-700/80 hover:border-zinc-500 hover:bg-zinc-900/60",
    ghost:
      "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60",
    destructive:
      "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 hover:text-red-300",
    gradient:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white hover:opacity-95 shadow-[0_0_20px_rgba(139,92,246,0.35)]",
    link: "text-violet-400 underline-offset-4 hover:underline p-0 h-auto font-normal",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
    default: "text-xs sm:text-sm px-4 py-2 gap-2 h-9 sm:h-10",
    lg: "text-sm sm:text-base px-5 py-2.5 gap-2.5 h-11 sm:h-12",
    icon: "h-9 w-9 p-0 rounded-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

export const ButtonSuiteDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(128);
  const [bookmarked, setBookmarked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("Deploy to Production");

  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText("npm i @depth-ui/react");
    setTimeout(() => setCopied(false), 1800);
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-7 p-6 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-2xl">
      {/* 1. Core Action Variants */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
            1. Core Variants
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Tailwind v4 tokens
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="default">Primary Solid</Button>
          <Button variant="gradient" leftIcon={<Zap className="w-3.5 h-3.5" />}>
            Gradient Accent
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button
            variant="destructive"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* 2. Interactive States & Micro-actions */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
          2. Interactive States & Loading
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            isLoading={loading}
            onClick={triggerLoading}
            className="min-w-[140px]"
          >
            {loading ? "Processing..." : "Click to Load"}
          </Button>

          <Button
            variant="outline"
            onClick={handleCopy}
            className="gap-2 text-zinc-300 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in" />
                <span className="text-emerald-400 font-medium">
                  Copied Command!
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Install Snippet</span>
              </>
            )}
          </Button>

          {/* Split Dropdown Button */}
          <div className="relative inline-flex items-center rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
            <button
              onClick={() => alert(`Triggered: ${selectedAction}`)}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {selectedAction}
            </button>
            <div className="w-[1px] h-5 bg-zinc-700" />
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-2 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="More actions"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-1.5 right-0 w-48 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl py-1 z-30">
                {[
                  "Deploy to Production",
                  "Deploy to Staging",
                  "Create Pull Request",
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      setSelectedAction(action);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Social Sign-In Buttons */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
            3. Social Authentication
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Real Brand Vectors
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Google */}
          <button
            onClick={() => alert("Google login triggered")}
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm font-medium text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>Google</span>
          </button>

          {/* GitHub */}
          <button
            onClick={() => alert("GitHub login triggered")}
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm font-medium text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => alert("Apple login triggered")}
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm font-medium text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.07.62-2.73 1.39-.58.67-1.09 1.74-.96 2.77 1.04.08 2.12-.53 2.77-1.31" />
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>

      {/* 4. Action Icon Row with Counts */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
          4. Social Actions & Reactions
        </span>
        <div className="flex items-center gap-2">
          {/* Heart / Like */}
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              liked
                ? "bg-rose-500/10 border-rose-500/40 text-rose-400"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform ${
                liked ? "fill-rose-500 scale-110 text-rose-500" : ""
              }`}
            />
            <span>{likesCount}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
              bookmarked
                ? "bg-violet-500/10 border-violet-500/40 text-violet-400"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
            title="Bookmark"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${bookmarked ? "fill-violet-400" : ""}`}
            />
          </button>

          {/* Share */}
          <button
            onClick={() => alert("Link copied to clipboard")}
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonSuiteDemo;
