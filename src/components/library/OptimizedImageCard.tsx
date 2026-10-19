import React, { useState } from "react";
import {
  Maximize2,
  Heart,
  Copy,
  Check,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export interface OptimizedImageCardProps {
  src?: string;
  alt?: string;
  title?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  tags?: string[];
}

export const OptimizedImageCard: React.FC<OptimizedImageCardProps> = ({
  src = "/images/workspace.jpg",
  alt = "Modern Developer Workspace",
  title = "Minimalist Ultrawide Developer Setup",
  authorName = "Elena Rostova",
  authorRole = "Staff UI Architect",
  authorAvatar = "/images/avatar-1.jpg",
  aspectRatio: initialAspect = "16/9",
  tags = ["Engineering", "Design System", "4K HDR"],
}) => {
  const [aspect, setAspect] = useState<"16/9" | "4/3" | "1/1">(initialAspect);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(342);
  const [isLoaded, setIsLoaded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
  }[aspect];

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard?.writeText(window.location.origin + src);
    setTimeout(() => setCopied(false), 1600);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Aspect Ratio & State Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs">
        <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl">
          <span className="text-[11px] font-mono text-zinc-400 px-2">
            Aspect:
          </span>
          {(["16/9", "4/3", "1/1"] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspect(ratio)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                aspect === ratio
                  ? "bg-zinc-800 text-white shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setIsLoaded(false);
            setTimeout(() => setIsLoaded(true), 800);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
          <span>Simulate Blur-up Load</span>
        </button>
      </div>

      {/* Main Card Container */}
      <div className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-2xl transition-all duration-300 hover:border-zinc-700/80">
        {/* Image Frame */}
        <div
          className={`relative w-full ${aspectClass} overflow-hidden bg-zinc-950`}
        >
          {/* Skeleton Shimmer when loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse z-10 flex items-center justify-center">
              <span className="text-xs font-mono text-zinc-500">
                Loading image...
              </span>
            </div>
          )}

          {/* Real Image with smooth scale hover */}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
            }`}
          />

          {/* Top Badges & Actions Overlay */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-emerald-400 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Featured
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                4K HDR
              </span>
            </div>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white/90 hover:text-white hover:bg-black/80 transition-all cursor-pointer"
                title="Expand Lightbox"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Gradient Scrim with Tags & Metadata */}
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end pointer-events-none">
            <div className="flex flex-wrap items-center gap-1.5 mb-2 pointer-events-auto">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-[11px] text-zinc-200 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Footer Meta & Interaction Bar */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Author Block */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-700"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-900" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-zinc-200">
                <span>{authorName}</span>
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              </div>
              <p className="text-[11px] text-zinc-500">{authorRole}</p>
            </div>
          </div>

          {/* Social Reactions & Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                isLiked
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  : "bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
                } transition-transform`}
              />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700/60 bg-zinc-800/60 text-zinc-300 hover:text-white text-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">{title}</h4>
                <p className="text-xs text-zinc-400">
                  Captured by {authorName}
                </p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-zinc-800 text-xs text-zinc-200 hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImageCard;
